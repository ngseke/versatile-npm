import { selectSidebarH3 as selectSidebarH3Title } from './npmPage'
import style from './customCommandSection.module.sass'

export function renderCustomCommandSection () {
  const $section = document.createElement('div')

  const $title = selectSidebarH3Title().cloneNode() as Element
  $title.textContent = 'Versatile Npm'
  $title.classList.add(style.title)

  $section.append($title)

  return $section
}
