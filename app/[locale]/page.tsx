import { DownloadLink } from '@/components/DownloadLink'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { routing } from '@/i18n/routing'
import { changelogLink, chromeWebStoreLink, latestReleaseLink, ngsekeLink } from '@/lib/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Index')

  return (
    <main className="flex flex-col gap-16">
      <Header />
      <div className="mx-auto flex w-full max-w-[50rem] flex-col items-start gap-10 px-4">
        <Section title={t('download.title')}>
          <div className="mb-4 flex flex-wrap gap-2">
            <DownloadLink href={chromeWebStoreLink}>
              <Image src="/chrome.svg" width={32} height={32} alt="Chrome" />
              {t('download.chromeWebStore')}
            </DownloadLink>
            <DownloadLink href={latestReleaseLink}>
              {t('download.manualDownload')}
            </DownloadLink>
          </div>

          <div className="flex gap-2">
            <a href={chromeWebStoreLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.shields.io/chrome-web-store/v/jahejogdoffpehfhkhbpjblnlhghjnje?label=Version"
                alt="Version"
              />
            </a>
            <a href={chromeWebStoreLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/chrome-web-store/users/jahejogdoffpehfhkhbpjblnlhghjnje?label=Users" alt="Users" />
            </a>
          </div>
        </Section>

        <Section title={t('features.title')}>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium opacity-70">
              {t('features.customizeCommandsSubtitle')}
            </h3>

            <p>
              {t('features.customizeCommandsParagraphCommands')}
            </p>

            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>
                <code className="inline-block bg-gradient-to-r from-[var(--brand)] to-[#fe5196] bg-clip-text font-bold text-transparent">
                  {'<package>'}
                </code>
                <span className="mx-3">—</span>
                {t('features.variablePackageDescription')}
              </li>
              <li>
                <code className="inline-block bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text font-bold text-transparent">
                  {'<version>'}
                </code>
                <span className="mx-3">—</span>
                {t('features.variableVersionDescription')}
              </li>
            </ul>

            <p>
              {t.rich('features.customizeCommandsParagraphResult', {
                npm: () => (
                  <a
                    href="https://www.npmjs.com/package/lodash"
                    target="_blank"
                    className="underline hover:text-brand"
                  >
                    npmjs.com
                  </a>
                ),
              })}
            </p>

            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
              <Image
                src="/popup.png"
                width={898}
                height={1120}
                alt="Popup"
                className="h-auto w-72 rounded-lg"
              />
              <span className="text-nowrap font-mono text-5xl font-black text-brand after:inline-flex after:rotate-90 after:content-['->'] md:after:rotate-0">
                <span className="inline-flex rotate-90 md:rotate-0"></span>
              </span>
              <Image
                src="/result.png"
                width={714}
                height={680}
                alt="Result"
                className="h-auto w-80 rounded-lg"
              />
            </div>
          </div>

        </Section>

        <Section title={t('changelog.title')}>
          <a
            href={changelogLink}
            className="underline hover:text-brand"
          >
            https://github.com/ngseke/versatile-npm/releases
          </a>
        </Section>
      </div>

      <footer className="flex flex-wrap bg-zinc-900 ">
        <div className="mx-auto w-full max-w-[50rem] px-4 py-8 font-mono text-sm opacity-70">
          Made by
          {' '}
          <a href={ngsekeLink} className="font-medium hover:underline">
            @ngseke
          </a>
        </div>
      </footer>
    </main>
  )
}
