import './globals.css';

export const metadata = {
  title: "Wiyana's 24th Birthday Celebration 🎂 | Night Party",
  description:
    "You're invited to Wiyana Ananda Octaviani's 24th Birthday Night Party! Join us for an unforgettable celebration at Tembak Langit, Paskal 23, Bandung.",
  metadataBase: new URL('https://wiyana-birthday.netlify.app'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "🎂 Wiyana's 24th Birthday Night Party",
    description:
      "You're invited to an unforgettable Night Party! Join us at Tembak Langit, Paskal 23, Bandung.",
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: "🎂 Wiyana's 24th Birthday Night Party",
    description: "You're invited to an unforgettable celebration!",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#170D2B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-deep-purple text-soft-white antialiased">
        {children}
      </body>
    </html>
  );
}
