import { getNpmPackageName } from './npmPage'
import { generateCustomCommand } from '../../../modules/customCommands'
import { renderCustomCommand } from './customCommand'
import { renderCustomCommandSection } from './customCommandSection'
import { $, $$ } from './dom'

export const DATASET_KEY = 'versatilenpm'

export function selectRenderedVersatileNpm () {
  return $(`[data-${DATASET_KEY}]`)
}

export function getRenderedVersatileNpmPackageName () {
  return selectRenderedVersatileNpm()?.dataset[DATASET_KEY]
}

export function selectAllRenderedVersatileNpm () {
  return $$(`[data-${DATASET_KEY}]`)
}

export function renderVersatileNpm (customCommandTemplates: string[]) {
  const $section = renderCustomCommandSection()
  const packageName = getNpmPackageName() ?? ''

  $section.dataset[DATASET_KEY] = packageName

  customCommandTemplates
    .map((template) => generateCustomCommand(template, packageName))
    .forEach((command) => {
      const $customCommand = renderCustomCommand(command, {
        onClickCopy () {
          navigator.clipboard.writeText(command)
        },
      })
      $section.append($customCommand)
    })

  return $section
}
