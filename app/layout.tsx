import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono, Fredoka } from 'next/font/google'
import { TopNav } from '@/components/skybox/top-nav'
import { AmbientBackground } from '@/components/skybox/ambient-background'
import './globals.css'

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-fredoka' })

export const metadata: Metadata = {
  title: 'SKYBOX — Fault-Tolerant Distributed Object Storage',
  description:
    'SKYBOX stores, replicates, verifies, repairs, and rebalances data across unreliable storage nodes. A mechanical control system for distributed storage.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b090c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable} ${fredoka.variable} bg-background`}>
      <body className="min-h-dvh antialiased">
        <AmbientBackground />
        <TopNav />
        <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 md:px-6">{children}</main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
