import { loadCustomCommands, loadIsEnabled } from '../../modules/storage'
import { getNpmPackageName, selectNpmCommandOriginalComponent } from './modules/npmPage'
import { getRenderedVersatileNpmPackageName, renderVersatileNpm, selectAllRenderedVersatileNpm } from './modules/versatileNpm'

function checkShouldRender () {
  const hasOriginalComponent = Boolean(selectNpmCommandOriginalComponent())
  const isRendered = getRenderedVersatileNpmPackageName() === getNpmPackageName()

  const shouldRender = hasOriginalComponent && !isRendered

  return shouldRender
}

function destroyRenderedElements () {
  selectAllRenderedVersatileNpm()
    .forEach($element => { $element.remove() })
}

async function tryRender ({ force }: { force?: boolean } = {}) {
  const commands = await loadCustomCommands()
  const isEnabled = await loadIsEnabled()

  if (!(checkShouldRender() || force)) return false

  destroyRenderedElements()
  if (!isEnabled) return

  const $versatileNpm = renderVersatileNpm(commands)
  const $originalComponent = selectNpmCommandOriginalComponent()
  $originalComponent.after($versatileNpm)
}

function startObserverAndListener () {
  // 1. try to render when loaded
  tryRender()

  // 2. try to render when DOM changes
  new MutationObserver(async () => await tryRender())
    .observe(document.documentElement, { childList: true, subtree: true })

  // 3. try to render when options change
  chrome.storage.onChanged.addListener(
    async () => await tryRender({ force: true })
  )
}

startObserverAndListener()
