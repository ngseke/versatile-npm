import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/cn'
import { ngsekeLink, pageLink } from '@/lib/link'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={cn(jetBrainsMono.variable, inter.variable, 'antialiased')}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
