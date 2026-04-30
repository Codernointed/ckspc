import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/lib/LenisProvider';

export const metadata: Metadata = {
  title: 'CKSPC - Christ Kingdom Salvation Pentecostal Church',
  description:
    'Welcome to Christ Kingdom Salvation Pentecostal Church. A non-profit Pentecostal church headquartered in Accra, Ghana, bringing all people to the saving knowledge of our Lord Jesus Christ.',
  keywords: 'CKSPC, Christ Kingdom, Salvation, Pentecostal Church, Accra, Ghana, Madina, church',
  openGraph: {
    title: 'Christ Kingdom Salvation Pentecostal Church',
    description: 'Bringing all people everywhere to the saving knowledge of our Lord Jesus Christ.',
    type: 'website',
  },
};

export default function RootLayout({
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
