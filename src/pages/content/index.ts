import { loadCustomCommands, loadIsEnabled } from '../../modules/storage'
import { selectNpmCommandOriginalComponent, selectWeeklyDownloadsSparkLine } from './modules/npmPage'
import { renderVersatileNpm, selectAllRenderedVersatileNpm } from './modules/versatileNpm'

function checkShouldRender () {
  try {
    const hasOriginalComponent = Boolean(selectNpmCommandOriginalComponent())
    const hasWeeklyDownloadsSparkLine = Boolean(selectWeeklyDownloadsSparkLine())
    const isRendered = Boolean(selectAllRenderedVersatileNpm().length)

    const shouldRender = [
      hasOriginalComponent,
      hasWeeklyDownloadsSparkLine,
      !isRendered,
    ].every(Boolean)

    if (!shouldRender) return false
  } catch (err) {
    return false
  }
  return true
}

function destroyRenderedElements () {
  selectAllRenderedVersatileNpm()
    .forEach($element => { $element.remove() })
}

async function tryRender (force = false) {
  const commands = await loadCustomCommands()
  const isEnabled = await loadIsEnabled()

  if (!(checkShouldRender() || force)) return false

  destroyRenderedElements()
  if (!isEnabled) return

  const $versatileNpm = renderVersatileNpm(commands)
  const $originalComponent = selectNpmCommandOriginalComponent()
  $originalComponent.after($versatileNpm)

  return true
}

function startObserverAndListener () {
  // 1. try to render when loaded
  tryRender()

  // 2. try to render when DOM changes
  new MutationObserver(async () => await tryRender())
    .observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

  // 3. try to render when options change
  chrome.storage.onChanged.addListener(async () => await tryRender(true))
}

startObserverAndListener()
