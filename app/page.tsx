import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20">
      <div className="flex flex-col items-center gap-8">
        <div className="relative after:absolute after:inset-0 after:-z-10 after:scale-125 after:rounded-full after:bg-[conic-gradient(from_180deg_at_50%_50%,#f44336_0deg,#fe5196)] after:opacity-50 after:blur-3xl">
          <Image
            src="/icon.png"
            width={200}
            height={200}
            alt="Versatile Npm"
            className="relative"
          />
        </div>

        <h1 className="text-center font-mono text-5xl font-bold">
          Versatile
          <span className="text-brand"> Npm</span>
        </h1>
      </div>
    </main>
  )
}
