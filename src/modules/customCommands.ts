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

export function parseCustomCommand (command: string): CustomCommandChunk[] {
  const chunks = command.split(' ')
  return chunks.map((value) => {
    const getChunk = (type: CustomCommandChunk['type']) => (
      { id: nanoid(), type, value }
    )

    const isPackageManager = packageManagers.has(value)
    if (isPackageManager) return getChunk('packageManager')

    const isPackageNamePlaceholder = value === packageNamePlaceholder
    if (isPackageNamePlaceholder) return getChunk('packageNamePlaceholder')

    return getChunk('text')
  })
}
