import { nanoid } from 'nanoid'

export const packageNamePlaceholder = '<package>'

export const customCommandSuggestions = [
  `npm i -D ${packageNamePlaceholder}`,
  `pnpm i ${packageNamePlaceholder}`,
  `yarn add ${packageNamePlaceholder}`,
]

export function generateDefaultCustomCommands () {
  return [
    ...customCommandSuggestions,
    `${packageNamePlaceholder} `,
  ]
}

export function generateCustomCommand (template: string, packageName: string) {
  return template.replaceAll(packageNamePlaceholder, packageName)
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
  type: 'packageManager' | 'packageNamePlaceholder' | 'text'
  value: string
}

export function parseCustomCommand (command: string) {
  const chunks: CustomCommandChunk[] = []
  let currentText = ''

  const regex = new RegExp(`(${packageNamePlaceholder}|\\s+)`)

  command.split(regex).forEach(part => {
    if (part === packageNamePlaceholder) {
      if (currentText) {
        chunks.push({ id: nanoid(), type: 'text', value: currentText })
        currentText = ''
      }
      chunks.push({ id: nanoid(), type: 'packageNamePlaceholder', value: part })
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
      chunks.push({ id: nanoid(), type: 'packageManager', value: part })
    } else {
      currentText += part
    }
  })

  if (currentText) {
    chunks.push({ id: nanoid(), type: 'text', value: currentText })
  }

  return chunks
}
