import { nanoid } from 'nanoid'

export const packageNamePlaceholder = '<package>'

export interface CustomCommandSuggestion {
  value: string
  label: string
}

export const customCommandSuggestions: CustomCommandSuggestion[] = [
  { value: `pnpm i ${packageNamePlaceholder}`, label: 'pnpm' },
  { value: `yarn add ${packageNamePlaceholder}`, label: 'yarn' },
  { value: `npm i -D ${packageNamePlaceholder}`, label: 'npm dev' },
  { value: `npm i ${packageNamePlaceholder}@latest`, label: 'npm latest' },
  { value: `npm i -D @types/${packageNamePlaceholder}`, label: 'npm types' },
]

export function generateDefaultCustomCommands () {
  return [
    `pnpm i ${packageNamePlaceholder}`,
    `yarn add ${packageNamePlaceholder}`,
    `npm i -D ${packageNamePlaceholder}`,
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
