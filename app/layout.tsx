import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f4ee',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mackenziedy.com/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Mackenzie Dy',
    template: '%s | Mackenzie Dy',
  },
  description:
    'The headspace of Mackenzie Dy. Come look inside my brain and see what I am up to.',
  keywords: ['Mackenzie Dy', 'portfolio', 'blog', 'projects'],
  authors: [{ name: 'Mackenzie Dy', url: 'https://mackenziedy.com' }],
  twitter: {
    card: 'summary_large_image',
    creator: '@mackenziedy',
  },
  openGraph: {
    type: 'website',
    url: 'https://mackenziedy.com',
    title: 'Mackenzie Dy',
    description:
      'The headspace of Mackenzie Dy. Come look inside my brain and see what I am up to.',
    images: [{ url: '/fwog_scaled_1200x1200.png' }],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/fwog_scaled_48x48.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning className="bg-parchment text-ink min-h-screen flex flex-col">
        <ThemeProvider attribute="class" forcedTheme="light">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
