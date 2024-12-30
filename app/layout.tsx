import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/cn'
import { ngsekeLink, pageLink } from '@/lib/link'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin'],
})

const title = 'Versatile Npm'
const description = 'The most powerful extension for customizing install commands on npm.'

export const metadata: Metadata = {
  title,
  description,
  authors: { name: 'Sean Huang', url: ngsekeLink },
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    siteName: title,
    title: title,
    description,
    images: '/icon.png',
  },
  metadataBase: new URL(pageLink),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(jetBrainsMono.variable, inter.variable, 'antialiased')}>
        {children}
      </body>
    </html>
  )
}
