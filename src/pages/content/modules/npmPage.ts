import { $, $x } from './dom'

export function selectNpmCommandOriginalComponent () {
  const $element = $('p.flex-auto.truncate.db.ma0:has(code)')?.parentElement
  if (!$element) throw new Error('Failed to select npm command original component')

  return $element
}

export function selectMetaOgTitle () {
  return $('meta[property="og:title"]')
}

export function getNpmPackageName () {
  const name = selectMetaOgTitle()?.getAttribute('content')
  return name ?? null
}

export function selectNpmPackageVersion () {
  const [$element] = $x(`
    //*[h3[contains(text(), "Version")]]
    //div[contains(@class, 'flex')]
    //p
  `)
  return $element
}

export function getNpmPackageVersion () {
  const $element = selectNpmPackageVersion()
  return $element?.innerText
}

export function selectSidebarH3 () {
  return $('h3.f5.mt2.pt2.mb0')
}
