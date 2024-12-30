import Image from 'next/image'

export function Header() {
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
        The most powerful extension for customizing install commands on
        {' '}
        <a
          href="https://www.npmjs.com/"
          target="_blank"
          className="underline hover:text-brand"
        >
          npm
        </a>
        .
      </p>
    </header>
  )
}
