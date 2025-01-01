import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { locales } from './locales'

export const routing = defineRouting({
  locales: locales.map(locale => locale.code),
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname }
  = createNavigation(routing)
