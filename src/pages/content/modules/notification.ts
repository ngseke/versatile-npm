import { htmlToElement } from './dom'
import style from './notification.module.sass'
import { selectNotificationContainer } from './npmPage'

export function showNotification () {
  let newNotification: Element | null =
    htmlToElement(`
      <div class="ee9e731a pa3 ph5-ns tl z-999 w-100 flex flex-row justify-between d76ab310 ${style.notification}">
        <div style="display: flex;">
          <p class="ma0" role="alert" aria-atomic="true">✔ Copied to clipboard!</p>
        </div>
      </div>
    `)

  const container = selectNotificationContainer()
  container?.append(newNotification)

  setTimeout(() => {
    newNotification?.remove()
    newNotification = null
  }, 1000)
}
