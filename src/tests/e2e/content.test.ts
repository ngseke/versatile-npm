import puppeteer, { type Browser, type ElementHandle, type Page } from 'puppeteer'
import { DATASET_KEY } from '../../pages/content/modules/versatileNpm'
import { generateCustomCommand, generateDefaultCustomCommands } from '../../modules/customCommands'
import { DEBOUNCED_SAVE_DELAY, EXTENSION_ID, TEST_IDS } from '../../modules/constants'

const extensionPath = 'dist'
const packageName = 'vue'
const optionsUrl = `chrome-extension://${EXTENSION_ID}/src/pages/options/index.html`
const versatileNpmSelector = `[data-${DATASET_KEY}]`

describe('Rendering on Npm package page', () => {
  let browser: Browser | undefined
  let npmPage: Page | undefined

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    })

    const context = browser.defaultBrowserContext()
    await context.overridePermissions(
      'https://www.npmjs.com',
      ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']
    )

    npmPage = await browser.newPage()
    await npmPage.setViewport({ width: 1400, height: 900 })
    await npmPage.goto(`https://www.npmjs.com/package/${packageName}`)
    await npmPage.waitForSelector(versatileNpmSelector)
  })

  afterEach(async () => {
    await browser?.close()
    browser = undefined
    npmPage = undefined
  })

  async function assertMatchCustomCommandElements (
    templates: string[],
    packageName: string,
  ) {
    if (!npmPage) throw new Error()

    const versatileNpm = await npmPage.$(versatileNpmSelector)
    const elements = (await versatileNpm?.$$('xpath/div[.//p/code]')) ?? []

    expect(elements?.length).toBe(templates.length)

    const expectedCommands = templates
      .map((template) => generateCustomCommand(template, packageName))

    for (let i = 0; i < elements.length; i++) {
      const item = elements[i]

      const expectedCommand = expectedCommands[i]
      const commandText = await item.$eval('code', (code) => code.textContent)
      expect(commandText).toBe(expectedCommand)

      const button = await item.$('button')
      await button?.click()

      const copiedText = await npmPage?.evaluate(async () =>
        await navigator.clipboard.readText()
      )

      expect(copiedText).toEqual(expectedCommand)
    }
  }

  async function removeAllAndAddCommands (templates: string[]) {
    if (!(browser && npmPage)) throw new Error()

    const optionsPage = await browser.newPage()
    await optionsPage.goto(optionsUrl)

    const customCommandsSection = (await optionsPage.$(
      `[data-testid="${TEST_IDS.customCommandsSection}"]`
    ))

    const removeButtons = await customCommandsSection?.$$(
      `button[data-testid="${TEST_IDS.removeButton}"]`
    ) ?? []

    for (const button of removeButtons) { await button.click() }

    async function add (command: string) {
      const addButton = await customCommandsSection?.$(
        `button[data-testid="${TEST_IDS.addButton}"]`
      )
      await addButton?.click()

      const lastInput = (await customCommandsSection?.$$(
        `[data-testid="${TEST_IDS.commandTextField}"] input`
      ))?.at(-1)

      // Click 3 times to highlight all text
      await lastInput?.click({ clickCount: 3 })
      await lastInput?.press('Backspace')
      await lastInput?.type(command, { delay: 5 })
    }

    for (const template of templates) {
      await add(template)
    }

    await waitDebouncedSave()
  }

  async function waitDebouncedSave () {
    await new Promise(resolve => setTimeout(resolve, DEBOUNCED_SAVE_DELAY))
  }

  test('npm should be alive', async () => {
    if (!npmPage) throw new Error()

    const originalCommandElement = await npmPage.waitForXPath(
      '//code[contains(., "npm i vue")]'
    )

    expect(originalCommandElement).toBeTruthy()
  })

  test('should render initial commands', async () => {
    if (!npmPage) throw new Error()

    const versatileNpm = await npmPage.$(versatileNpmSelector)
    expect(versatileNpm).toBeTruthy()

    const title = (await versatileNpm?.$('h3'))
    const titleText = await npmPage.evaluate(element => element?.innerText, title)
    expect(titleText).toBe('Versatile Npm')

    const templates = generateDefaultCustomCommands()
    await assertMatchCustomCommandElements(templates, packageName)
  })

  test('should hide Versatile Npm after it is disabled when the npm page is open', async () => {
    if (!(browser && npmPage)) throw new Error()

    expect(await npmPage.$(versatileNpmSelector)).toBeTruthy()

    const optionsPage = await browser.newPage()
    await optionsPage.goto(optionsUrl)

    const enableSwitch = (await optionsPage.$x(
      "//div[contains(text(), 'Enable Versatile Npm')]"
    ))[0] as ElementHandle<Element>
    await enableSwitch.click()

    await npmPage.bringToFront()

    expect(await npmPage.$(versatileNpmSelector)).toBeFalsy()
  })

  test('should apply removed and added commands when the npm page is open', async () => {
    if (!npmPage) throw new Error()

    const newTemplates = [
      '',
      '   ',
      'pnpm install pure text',
      'yarn <package><package><package>',
      '中文',
      'long long long npm command -d with <$ymb@l$> and 123456789 and 中文 that should not exceeds the MAX_WRITE_OPERATIONS_PER_MINUTE quota',
    ]
    await removeAllAndAddCommands(newTemplates)

    await npmPage.bringToFront()

    await assertMatchCustomCommandElements(newTemplates, packageName)
  })

  test('should open options page when clicking options icon button', async () => {
    if (!(browser && npmPage)) throw new Error()

    const versatileNpm = await npmPage.$(versatileNpmSelector)
    const optionsIconButton = await versatileNpm?.$(
      'button[title="Customize Your Install Commands"]'
    )

    await optionsIconButton?.click()

    await new Promise(resolve => setTimeout(resolve, 100))

    const lastPage = (await browser.pages()).at(-1)
    expect(lastPage?.url()).toBe(optionsUrl)
  })

  test('should render Versatile Npm correctly after navigating to another package', async () => {
    if (!npmPage) throw new Error()

    const templates = ['yarn add <package>']
    await removeAllAndAddCommands(templates)
    await npmPage.bringToFront()

    await assertMatchCustomCommandElements(templates, packageName)

    async function searchAndNavigateToPackage (packageName: string) {
      if (!npmPage) throw new Error()

      const searchInput = await npmPage.$('[aria-label="Search packages"]')
      await searchInput?.type(packageName, { delay: 5 })

      const searchResultItem = await npmPage.waitForSelector(
        `[aria-label="Search results"] [aria-label="${packageName}"]`
      )
      await searchResultItem?.click()
      await npmPage.waitForNavigation()
      await npmPage.waitForNetworkIdle()
    }

    const reactPackageName = 'react'
    await searchAndNavigateToPackage(reactPackageName)
    await assertMatchCustomCommandElements(templates, reactPackageName)

    const axiosPackageName = 'axios'
    await searchAndNavigateToPackage(axiosPackageName)
    await assertMatchCustomCommandElements(templates, axiosPackageName)

    await npmPage.goBack()
    await npmPage.waitForNavigation()
    await npmPage.waitForNetworkIdle()

    await assertMatchCustomCommandElements(templates, reactPackageName)

    await npmPage.goBack()
    await npmPage.waitForNavigation()
    await npmPage.waitForNetworkIdle()

    await assertMatchCustomCommandElements(templates, packageName)
  })
})
