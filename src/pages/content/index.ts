import { loadCustomCommands } from '../../modules/storage'
import { getNpmPackageName, selectNpmCommandOriginalComponent, selectSparkLine as selectWeeklyDownloadsSparkLine } from './modules/npmPage'
import { renderVersatileNpm } from './modules/versatileNpm'

const renderedElements: Element[] = []
let currentPackageName: null | string = null

function checkShouldRender () {
  try {
    const packageName = getNpmPackageName()
    const isPackageNameChanged = packageName && packageName !== currentPackageName
    const hasOriginalComponent = Boolean(selectNpmCommandOriginalComponent())
    const hasWeeklyDownloadsSparkLine = Boolean(selectWeeklyDownloadsSparkLine())

    const shouldRender = [
      isPackageNameChanged,
      hasOriginalComponent,
      hasWeeklyDownloadsSparkLine,
    ].every(Boolean)

    if (!shouldRender) return false
  } catch (err) {
    return false
  }
  return true
}

function destroyRenderedElements () {
  renderedElements.forEach($element => { $element.remove() })
  renderedElements.length = 0
}

async function render () {
  if (!checkShouldRender()) return false

  destroyRenderedElements()
  currentPackageName = getNpmPackageName()

  const list = await loadCustomCommands()

  const $versatileNpm = renderVersatileNpm(list)
  const $originalComponent = selectNpmCommandOriginalComponent()
  $originalComponent.after($versatileNpm)

  renderedElements.push($versatileNpm)
  const pagePackageName = getNpmPackageName()

  currentPackageName = pagePackageName

  return true
}

new MutationObserver(render)
  .observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

render()
