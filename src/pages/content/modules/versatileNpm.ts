import { getNpmPackageName } from './npmPage'
import { parseCustomCommand } from '../../../modules/customCommands'
import { renderCustomCommand } from './customCommand'
import { showNotification } from './notification'
import { renderCustomCommandSection } from './customCommandSection'

export function renderVersatileNpm (customCommandTemplates: string[]) {
  const $section = renderCustomCommandSection()
  const packageName = getNpmPackageName() ?? ''

  customCommandTemplates
    .map((template) => parseCustomCommand(template, packageName))
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
