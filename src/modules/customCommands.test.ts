import {
  generateCustomCommand,
  parseCustomCommand,
  packageNamePlaceholder as name,
  packageVersionPlaceholder as version,
} from './customCommands'

test('generateCustomCommand', () => {
  expect(generateCustomCommand('', 'abc123'))
    .toBe('')
  expect(generateCustomCommand(name, 'abc123'))
    .toBe('abc123')
  expect(generateCustomCommand('pure string<>', 'abc'))
    .toBe('pure string<>')
  expect(generateCustomCommand(`npm i -D ${name}@${version}`, 'abc123', '1.2.3'))
    .toBe('npm i -D abc123@1.2.3')
  expect(generateCustomCommand(`yarn add -D ${name} ${name} ${version}${version}`, 'abc', '10.12.13'))
    .toBe('yarn add -D abc abc 10.12.1310.12.13')
  expect(generateCustomCommand(`ni ${name}${name}${name}`, 'abc'))
    .toBe('ni abcabcabc')
  expect(generateCustomCommand(`ni before${name}@latest`, 'abc'))
    .toBe('ni beforeabc@latest')
})

test('parseCustomCommand', () => {
  expect(parseCustomCommand('')).toMatchObject([])
  expect(parseCustomCommand(name))
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
  expect(parseCustomCommand(`ni ${name}${version}${name}${version}${name}`))
    .toMatchObject([
      { type: 'packageManager', value: 'ni' },
      { type: 'text', value: ' ' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'packageVersionPlaceholder', value: '<version>' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'packageVersionPlaceholder', value: '<version>' },
      { type: 'packageNamePlaceholder', value: '<package>' },
    ])
  expect(parseCustomCommand(`nvm use 18 && npm cnpm i -D npm before${name}@latest@${version}`))
    .toMatchObject([
      { type: 'text', value: 'nvm use 18 && ' },
      { type: 'packageManager', value: 'npm' },
      { type: 'text', value: ' ' },
      { type: 'packageManager', value: 'cnpm' },
      { type: 'text', value: ' i -D ' },
      { type: 'packageManager', value: 'npm' },
      { type: 'text', value: ' before' },
      { type: 'packageNamePlaceholder', value: '<package>' },
      { type: 'text', value: '@latest@' },
      { type: 'packageVersionPlaceholder', value: '<version>' },
    ])
})
