import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/cn'

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Versatile Npm',
  description: 'Versatile Npm',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(jetBrainsMono.variable, 'antialiased')}>
        {children}
      </body>
    </html>
  )
}
