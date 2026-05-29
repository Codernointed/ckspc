import type { Metadata } from 'next';
import '../globals.css';
import LenisProvider from '@/lib/LenisProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://ckspc.vercel.app'),
  title: {
    default: 'Christ Kingdom Salvation Pentecostal Church',
    template: '%s · CKSPC',
  },
  description:
    'Christ Kingdom Salvation Pentecostal Church (CKSPC) — a non-profit Pentecostal church headquartered in Accra, Ghana, bringing all people to the saving knowledge of our Lord Jesus Christ.',
  keywords: 'CKSPC, Christ Kingdom, Salvation, Pentecostal Church, Accra, Ghana, Madina, church',
  applicationName: 'CKSPC',
  authors: [{ name: 'Christ Kingdom Salvation Pentecostal Church' }],
  creator: 'Christ Kingdom Salvation Pentecostal Church',
  publisher: 'Christ Kingdom Salvation Pentecostal Church',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Christ Kingdom Salvation Pentecostal Church',
    description:
      'Welcome home. Plan your visit, explore our ministries, and connect with CKSPC in Madina, Accra.',
    type: 'website',
    url: '/',
    siteName: 'CKSPC',
    images: [
      {
        url: '/ckspc-photos/97b65d_fa0183fb8a1540678bd6cff25460d971.jpg',
        width: 512,
        height: 512,
        alt: 'CKSPC logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Christ Kingdom Salvation Pentecostal Church',
    description:
      'Welcome home. Plan your visit, explore our ministries, and connect with CKSPC in Madina, Accra.',
    images: ['/ckspc-photos/97b65d_fa0183fb8a1540678bd6cff25460d971.jpg'],
  },
  icons: {
    icon: [{ url: '/ckspc-photos/97b65d_fa0183fb8a1540678bd6cff25460d971.jpg' }],
    apple: [{ url: '/ckspc-photos/97b65d_fa0183fb8a1540678bd6cff25460d971.jpg' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
