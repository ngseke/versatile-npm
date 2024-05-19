import { packageNamePlaceholder, packageVersionPlaceholder } from './customCommands'

export interface Template {
  value: string
  label: string
}

export const templates: Template[] = [
  {
    value: `pnpm i ${packageNamePlaceholder}`,
    label: 'pnpm',
  },
  {
    value: `yarn add ${packageNamePlaceholder}`,
    label: 'yarn',
  },
  {
    value: `npm i -D ${packageNamePlaceholder}`,
    label: 'npm dev',
  },
  {
    value: `npm i ${packageNamePlaceholder}@latest`,
    label: 'npm latest',
  },
  {
    value: `npm i -D @types/${packageNamePlaceholder}`,
    label: 'npm types',
  },
  {
    value: `npm i ${packageNamePlaceholder}@${packageVersionPlaceholder}`,
    label: 'npm install with selected version',
  },
]

export function generateDefaultCustomCommands () {
  return [
    `pnpm i ${packageNamePlaceholder}`,
    `yarn add ${packageNamePlaceholder}`,
    `npm i -D ${packageNamePlaceholder}`,
    `npm i ${packageNamePlaceholder}@${packageVersionPlaceholder}`,
  ]
}
