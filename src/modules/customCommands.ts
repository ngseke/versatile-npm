export const packageNamePlaceholder = '<package>'

export function generateDefaultCustomCommands () {
  return [
    `npm i -D ${packageNamePlaceholder}`,
    `pnpm i ${packageNamePlaceholder}`,
    `yarn add ${packageNamePlaceholder}`,
    `${packageNamePlaceholder} `,
  ]
}

export function parseCustomCommand (template: string, packageName: string) {
  return template.replaceAll(packageNamePlaceholder, packageName)
}

export const packageManagers = new Set([
  'npm',
  'pnpm',
  'yarn',
  'ni',
  'cnpm',
])
