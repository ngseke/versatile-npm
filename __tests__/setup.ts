import ResizeObserver from 'resize-observer-polyfill'

window.ResizeObserver = ResizeObserver

vi.spyOn(console, 'warn')
vi.spyOn(console, 'error')
