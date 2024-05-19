import { nanoid } from 'nanoid'

export const packageNamePlaceholder = '<package>'
export const packageVersionPlaceholder = '<version>'

export function generateCustomCommand (
  template: string,
  packageName: string,
  packageVersion: string = '',
) {
  return template
    .replaceAll(packageNamePlaceholder, packageName)
    .replaceAll(packageVersionPlaceholder, packageVersion)
}

export const packageManagers = new Set([
  'npm',
  'pnpm',
  'yarn',
  'ni',
  'cnpm',
  'bun',
])

export interface CustomCommandChunk {
  id: string
  type: 'manager' | 'name' | 'version' | 'text'
  value: string
}

export function parseCustomCommand (command: string) {
  const chunks: CustomCommandChunk[] = []
  let currentText = ''

  const regex = new RegExp(`(${packageNamePlaceholder}|${packageVersionPlaceholder}|\\s+)`)

  command.split(regex).forEach(part => {
    if (part === packageNamePlaceholder) {
      if (currentText) {
        chunks.push({ id: nanoid(), type: 'text', value: currentText })
        currentText = ''
      }
      chunks.push({ id: nanoid(), type: 'name', value: part })
      return
    }

    if (part === packageVersionPlaceholder) {
      if (currentText) {
        chunks.push({ id: nanoid(), type: 'text', value: currentText })
        currentText = ''
      }
      chunks.push({ id: nanoid(), type: 'version', value: part })
      return
    }

    if (/\s+/.test(part)) {
      currentText += part
      return
    }

    if (packageManagers.has(part.trim())) {
      if (currentText) {
        chunks.push({ id: nanoid(), type: 'text', value: currentText })
        currentText = ''
      }
      chunks.push({ id: nanoid(), type: 'manager', value: part })
    } else {
      currentText += part
    }
  })

  if (currentText) {
    chunks.push({ id: nanoid(), type: 'text', value: currentText })
  }

  return chunks
}
