import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'InBar&Restaurant – Bar, Restaurant & Lifestyle Magazine',
    template: '%s | InBar&Restaurant',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: SITE_NAME,
    title: 'InBar&Restaurant – Bar, Restaurant & Lifestyle Magazine',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: 'https://inbar.sk/app/uploads/2020/03/INBAR-LOGO-WEB.png',
        width: 600,
        height: 200,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: 'https://inbar.sk/app/uploads/2020/03/INBAR-LOGO-WEB.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
