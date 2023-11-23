import { getNpmPackageName } from './npmPage'
import { generateCustomCommand } from '../../../modules/customCommands'
import { renderCustomCommand } from './customCommand'
import { showNotification } from './notification'
import { renderCustomCommandSection } from './customCommandSection'
import { $$ } from './dom'

const DATASET_KEY = 'versatilenpm'

export function selectAllRenderedVersatileNpm () {
  return $$(`[data-${DATASET_KEY}]`)
}

export function renderVersatileNpm (customCommandTemplates: string[]) {
  const $section = renderCustomCommandSection()
  $section.dataset[DATASET_KEY] = ''

  const packageName = getNpmPackageName() ?? ''

  customCommandTemplates
    .map((template) => generateCustomCommand(template, packageName))
    .forEach((command) => {
      const $customCommand = renderCustomCommand(command, {
        onClickCopy () {
          navigator.clipboard.writeText(command)
          showNotification()
        },
      })
      $section.append($customCommand)
    })

  return $section
}
