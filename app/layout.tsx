import type { Metadata, Viewport } from 'next'
import { Libre_Franklin } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import Fwog from '@/components/ui/fwog'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8fafb',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mackenziedy.com/'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Mackenzie Dy',
    template: '%s | Mackenzie Dy'
  },
  description: 'The headspace of Mackenzie Dy. Come look inside my brain and see what I am up to.',
  keywords: ['Mackenzie Dy', 'portfolio', 'blog', 'projects'],
  authors: [{ name: 'Mackenzie Dy' }],
  openGraph: {
    title: 'Mackenzie Dy',
    description: 'The headspace of Mackenzie Dy. Come look inside my brain and see what I am up to.',
    url: 'https://mackenziedy.com',
    siteName: 'Mackenzie Dy',
    images: [
      {
        url: 'https://mackenziedy.com/profile.jpg',
        width: 1066,
        height: 1600,
        alt: 'Mackenzie Dy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mackenzie Dy',
    description: 'The headspace of Mackenzie Dy.',
    images: ['https://mackenziedy.com/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/fwog_scaled_48x48.png',
  },
};

const libre = Libre_Franklin({
  variable: '--font-libre',
  subsets: ['latin'],
  weight: ['300'],
})

const libreMono = Libre_Franklin({
  variable: '--font-libre-mono',
  subsets: ['latin'],
  weight: ['700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const PERSON_JSON = `{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mackenzie Dy",
    "url": "https://mackenziedy.com",
    "description": "The headspace of Mackenzie Dy. Come look inside my brain and see what I am up to.",
    "image": "https://mackenziedy.com/profile.jpg",
    "sameAs": [
      "https://github.com/dymackenzie"
    ]
  }`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="keywords" content="Mackenzie Dy, portfolio, blog, projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mackenziedy" />
        <meta property="og:site_name" content="Mackenzie Dy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mackenziedy.com/og.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: PERSON_JSON }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${libre.variable} ${libreMono.variable} bg-zinc-50 tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          storageKey="theme"
          defaultTheme="light"
          forcedTheme="light"
        >
          <Fwog />
          <div className="relative z-10 flex min-h-screen w-full flex-col font-[family-name:var(--font-libre)]">
            <div className="relative mx-auto w-full max-w-screen-md flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
