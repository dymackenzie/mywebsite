import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8fafb',
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
  authors: [{ name: 'Mackenzie Dy' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
