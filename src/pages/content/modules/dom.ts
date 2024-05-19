export function htmlToElement (html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild as HTMLElement
}

export function $ (selector: string) {
  const element = document.querySelector(selector)

  return element as HTMLElement | null
}

export function $$ (selector: string) {
  const elements = document.querySelectorAll(selector)

  return [...elements] as HTMLElement[]
}

export function $x (xpath: string) {
  const snapshot = document.evaluate(
    xpath, document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  )
  return [...Array(snapshot.snapshotLength)]
    .map((_, i) => snapshot.snapshotItem(i) as HTMLElement)
}
