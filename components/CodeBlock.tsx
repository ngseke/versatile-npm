'use client'

import { Fragment, ReactNode, useState } from 'react'
import { CodeVariable } from './CodeVariable'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export function CodeBlock({ chunks }: { chunks: string[] }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const textToCopy = chunks.join('')
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="relative">
      <code className="block rounded-full bg-zinc-900 px-4 py-2">
        {chunks.map((chunk, index) => {
          const map: Record<string, ReactNode> = {
            '<package>': <CodeVariable color="red" tag="span">{'<package>'}</CodeVariable>,
            '<version>': <CodeVariable color="blue" tag="span">{'<version>'}</CodeVariable>,
          }

          if (map[chunk]) return <Fragment key={index}>{map[chunk]}</Fragment>
          return <span key={index}>{chunk}</span>
        })}
      </code>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {copied
          ? <IconCheck size={20} className="text-green-500" />
          : <IconCopy size={20} className="text-zinc-500" />}
      </button>
    </div>
  )
}
