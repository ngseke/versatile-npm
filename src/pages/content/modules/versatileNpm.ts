import { getNpmPackageName, getNpmPackageVersion } from './npmPage'
import { generateCustomCommand } from '../../../modules/customCommands'
import { renderCustomCommand } from './customCommand'
import { renderCustomCommandSection } from './customCommandSection'
import { $, $$ } from './dom'

export const DATASET_KEY = 'versatilenpm'

export function selectRenderedVersatileNpm () {
  return $(`[data-${DATASET_KEY}]`)
}

export function getRenderedVersatileNpm () {
  const raw = selectRenderedVersatileNpm()?.dataset[DATASET_KEY]
  const rendered = JSON.parse(raw ?? '{}') as {
    name: string | undefined
    version: string | undefined
  }
  return rendered
}

export function selectAllRenderedVersatileNpm () {
  return $$(`[data-${DATASET_KEY}]`)
}

export function renderVersatileNpm (templates: string[]) {
  const $section = renderCustomCommandSection()
  const name = getNpmPackageName() ?? ''
  const version = getNpmPackageVersion() ?? ''

  $section.dataset[DATASET_KEY] = JSON.stringify({ name, version })

  templates
    .map((template) => generateCustomCommand(template, name, version))
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
