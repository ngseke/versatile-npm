import { selectNpmCommandOriginalComponent } from './npmPage'
import style from './customCommand.module.sass'
import { packageManagers } from '../../../modules/customCommands'

function cloneOriginalComponent () {
  const originalComponent = selectNpmCommandOriginalComponent()
  return originalComponent.cloneNode(true) as HTMLElement
}

function renderEmphasis (text: string) {
  const $element = document.createElement('strong')
  $element.innerText = `${text}`
  $element.classList.add(style.emphasis)
  return $element
}

export function renderCustomCommand (
  command: string,
  events: { onClickCopy: () => void }
) {
  const $component = cloneOriginalComponent()
  const $code = $component.querySelector('code')
  if (!$code) throw new Error('Failed to select `code` in original component!')

  $code.innerText = ''

  const commandChunks = command.split(' ')
  commandChunks.forEach((commandChunk) => {
    const isPackageManager = packageManagers.has(commandChunk)
    $code.append(
      isPackageManager ? renderEmphasis(commandChunk) : commandChunk,
      ' '
    )
  })

  const $button = $component.querySelector('button')

  if (!$button) throw new Error('Failed to select `button` in original component!')
  $button.addEventListener('click', events.onClickCopy)

  $component.classList.add(style.command)

  return $component
}