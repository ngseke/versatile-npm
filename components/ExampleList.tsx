import Image from 'next/image'
import { CodeBlock } from './CodeBlock'

type Example = {
  chunks: string[]
  output: string
  image?: {
    src: string
    width: number
    height: number
    alt: string
  }
  text?: string
}

const npmImage = { src: '/logo/npm.svg', width: 540, height: 210, alt: 'npm' }
const yarnImage = { src: '/logo/yarn.svg', width: 335, height: 150, alt: 'Yarn' }
const pnpmImage = { src: '/logo/pnpm.svg', width: 225, height: 160, alt: 'PNPM' }
const bunImage = { src: '/logo/bun.svg', width: 80, height: 70, alt: 'Bun' }

const examples: Example[] = [
  {
    chunks: ['npm i -D ', '<package>'],
    output: 'npm i -D lodash',
    text: 'Install as a dev dependency',
    image: npmImage,
  },
  {
    chunks: ['yarn add ', '<package>'],
    output: 'yarn add lodash',
    text: 'Use Yarn',
    image: yarnImage,
  },
  {
    chunks: ['pnpm i ', '<package>'],
    output: 'pnpm i lodash',
    text: 'Use PNPM',
    image: pnpmImage,
  },
  {
    chunks: ['bun install ', '<package>'],
    output: 'bun install lodash',
    text: 'Use Bun',
    image: bunImage,
  },
  {
    chunks: ['npm install ', '<package>', '@', '<version>'],
    output: 'npm install lodash@4.17.21',
    text: 'Install a specific version',
  },
  {
    chunks: ['npm i -D @types/', '<package>'],
    output: 'npm i -D @types/lodash',
    text: 'Install type definitions',
  },
  {
    chunks: ['npm uninstall ', '<package>'],
    output: 'npm uninstall lodash',
    text: 'Remove a package',
  },
  {
    chunks: ['I love ', '<package>'],
    output: 'I love lodash',
    text: 'Show your love for a package 🫶',
  },
]

export function ExampleList() {
  return (
    <ul className="flex flex-col gap-6">
      {examples.map((item, index) => (
        <li key={index} className="relative flex flex-col items-start gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center gap-2 lg:w-40">
            {item.image && (
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt}
                className="mx-auto h-10 w-auto"
              />
            )}
            {
              'text' in item && (
                <p className="text-center text-sm font-medium">
                  {item.text}
                </p>
              )
            }
          </div>
          <div className="w-full flex-1">
            <div className="grid grid-cols-[auto,1fr] items-center gap-2">
              <span className="rounded-md border border-zinc-900 p-1 text-center text-xs text-zinc-500">
                Template
              </span>
              <div>
                <CodeBlock chunks={item.chunks} />
              </div>
              <span className="rounded-md border border-zinc-900 p-1 text-center text-xs text-zinc-500">
                Output
              </span>
              <code>
                {item.output}
              </code>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
