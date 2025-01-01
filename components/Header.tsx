import { locales } from '@/i18n/locales'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()

  return (
    <header className="flex min-h-[30rem] flex-col items-center justify-center gap-8  px-4 pt-16">
      <div className="relative after:absolute after:inset-0 after:scale-125 after:rounded-full after:bg-[conic-gradient(from_180deg_at_50%_50%,var(--brand)_0deg,#ff2626)] after:opacity-50 after:blur-3xl">
        <Image
          src="/icon.png"
          width={200}
          height={200}
          alt="Versatile Npm"
          className="relative z-10"
        />
      </div>

      <h1 className="z-10 text-center font-mono text-5xl font-bold">
        Versatile
        <span className="text-brand"> Npm</span>
      </h1>

      <p className="text-center font-medium opacity-70">
        {
          t.rich('description', {
            npm: () => (
              <a
                href="https://www.npmjs.com/"
                target="_blank"
                className="underline hover:text-brand"
              >
                npm
              </a>
            ) })
        }
      </p>

      <ul className="flex flex-wrap gap-2">
        {
          locales.map(({ code, name }) => (
            <li key={code}>
              <Link
                href="/"
                locale={code}
                className={cn(
                  'inline-block rounded-md border border-zinc-900 px-1.5',
                  {
                    'border-zinc-500': locale === code,
                    'hover:border-zinc-800': locale !== code,
                  },
                )}
              >
                {name}
              </Link>
            </li>
          ))
        }
      </ul>
    </header>
  )
}
