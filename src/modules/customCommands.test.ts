import { expect, test } from 'vitest'
import { generateCustomCommand, parseCustomCommand, packageNamePlaceholder as placeholder } from './customCommands'

test('generateCustomCommand', () => {
  expect(generateCustomCommand('', 'abc123'))
    .toBe('')
  expect(generateCustomCommand(placeholder, 'abc123'))
    .toBe('abc123')
  expect(generateCustomCommand('pure string<>', 'abc'))
    .toBe('pure string<>')
  expect(generateCustomCommand(`npm i -D ${placeholder}`, 'abc123'))
    .toBe('npm i -D abc123')
  expect(generateCustomCommand(`yarn add -D ${placeholder} ${placeholder}`, 'abc'))
    .toBe('yarn add -D abc abc')
  expect(generateCustomCommand(`ni ${placeholder}${placeholder}${placeholder}`, 'abc'))
    .toBe('ni abcabcabc')
  expect(generateCustomCommand(`ni before${placeholder}@latest`, 'abc'))
    .toBe('ni beforeabc@latest')
})

test('parseCustomCommand', () => {
  expect(parseCustomCommand('')).toMatchObject([])
  expect(parseCustomCommand(placeholder))
    .toMatchObject([
      { type: 'packageNamePlaceholder', value: '<package>' },
    ])
  expect(parseCustomCommand('pnpm'))
    .toMatchObject([
      { type: 'packageManager', value: 'pnpm' },
    ])
  expect(parseCustomCommand('yarnnpmpnpm'))
    .toMatchObject([
      { type: 'text', value: 'yarnnpmpnpm' },
    ])
  expect(parseCustomCommand('a   z'))
    .toMatchObject([
      { type: 'text', value: 'a   z' },
    ])
  expect(parseCustomCommand(' 123456789  '))
    .toMatchObject([
      { type: 'text', value: ' 123456789  ' },
    ])
  expect(parseCustomCommand(`ni ${placeholder}${placeholder}${placeholder}`))
    .toMatchObject([
      { type: 'packageManager', value: 'ni' },
      { type: 'text', value: ' ' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'packageNamePlaceholder', value: '<package>' },
    ])
  expect(parseCustomCommand(`nvm use 18 && npm cnpm i -D npm before${placeholder}@latest`))
    .toMatchObject([
      { type: 'text', value: 'nvm use 18 && ' },
      { type: 'packageManager', value: 'npm' },
      { type: 'text', value: ' ' },
      { type: 'packageManager', value: 'cnpm' },
      { type: 'text', value: ' i -D ' },
      { type: 'packageManager', value: 'npm' },
      { type: 'text', value: ' before' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'text', value: '@latest' },
    ])
})
