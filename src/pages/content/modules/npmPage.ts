import { $ } from './dom'

export function selectNpmCommandInnerCode () {
  return $('p.flex-auto.truncate.db.ma0 > code')
}
export function selectNpmCommandOriginalComponent () {
  const $element = selectNpmCommandInnerCode()?.parentElement?.parentElement
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

export function selectNotificationContainer () {
  return $('.list.ma0.pa0.tr.z-999 > .list.ma0.pa0.tr.z-999')
}

export function selectSidebarH3 () {
  return $('h3.f5.mt2.pt2.mb0')
}
