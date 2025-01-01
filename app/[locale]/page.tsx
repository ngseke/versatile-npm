import { CodeVariable } from '@/components/CodeVariable'
import { DownloadLink } from '@/components/DownloadLink'
import { ExampleList } from '@/components/ExampleList'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { routing } from '@/i18n/routing'
import { changelogLink, chromeWebStoreLink, latestReleaseLink } from '@/lib/link'
import { IconDownload } from '@tabler/icons-react'
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
              <IconDownload size={32} stroke={2.5} />
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
                <CodeVariable color="red">
                  {'<package>'}
                </CodeVariable>
                <span className="mx-3 after:content-['—']" />
                {t('features.variablePackageDescription')}
              </li>
              <li>
                <CodeVariable color="blue">
                  {'<version>'}
                </CodeVariable>
                <span className="mx-3 after:content-['—']" />
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
              <span className="text-nowrap font-mono text-5xl font-black text-brand after:inline-flex after:rotate-90 after:content-['->'] md:after:rotate-0" />
              <Image
                src="/result.png"
                width={714}
                height={680}
                alt="Result"
                className="h-auto w-80 rounded-lg"
              />
            </div>

            <h3 className="text-lg font-medium opacity-70">
              {t('features.customizeExamplesSubtitle')}
            </h3>

            <p className="mb-2">
              {t('features.customizeExamplesParagraph')}
            </p>

            <ExampleList />
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
      <Footer />
    </main>
  )
}
