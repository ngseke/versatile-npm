export function htmlToElement (html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild as HTMLElement
}

export function $ (selector: string) {
  const element = document.querySelector(selector)
  if (!element) throw new Error(`Failed to select \`${selector}\``)

  return element
}

export function $$ (selector: string) {
  const elements = document.querySelectorAll(selector)

  return [...elements]
}
