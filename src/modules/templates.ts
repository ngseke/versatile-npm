import { packageNamePlaceholder, packageVersionPlaceholder } from './customCommands'

export interface Template {
  value: string
  label: string
}

export const templates: Template[] = [
  {
    value: `npm i ${packageNamePlaceholder}@${packageVersionPlaceholder}`,
    label: 'npm install with selected version',
  },
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
]

export function generateDefaultCustomCommands () {
  return [
    `npm i ${packageNamePlaceholder}@${packageVersionPlaceholder}`,
    `pnpm i ${packageNamePlaceholder}`,
    `yarn add ${packageNamePlaceholder}`,
    `npm i -D ${packageNamePlaceholder}`,
  ]
}
