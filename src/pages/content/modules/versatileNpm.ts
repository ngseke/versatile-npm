import { getNpmPackageName } from './npmPage'
import { generateCustomCommand } from '../../../modules/customCommands'
import { renderCustomCommand } from './customCommand'
import { showNotification } from './notification'
import { renderCustomCommandSection } from './customCommandSection'

export function renderVersatileNpm (customCommandTemplates: string[]) {
  const $section = renderCustomCommandSection()
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
