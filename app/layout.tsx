import type {Metadata} from 'next';
import { Cinzel, Noto_Serif_JP, Noto_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vishakahu.com';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Vishakahu Academy | Isshinryu Karate Dojo',
    template: '%s | Vishakahu Academy',
  },
  description: 'Vishakahu Academy — Premier Isshinryu Karate Dojo led by Kyoshi Vishnuwarthan. Combining traditional discipline, physical fitness, and practical self-defense.',
  keywords: [
    'Vishakahu Academy',
    'Isshinryu Karate',
    'Karate Dojo',
    'Kyoshi Vishnuwarthan',
    'Self Defense',
    'Martial Arts',
    'Tirunelveli Karate',
    'Chennai Karate',
    'Kids Karate',
  ],
  authors: [{ name: 'Vishakahu Academy' }],
  creator: 'Vishakahu Academy',
  publisher: 'Vishakahu Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: defaultUrl,
    title: 'Vishakahu Academy | Isshinryu Karate Dojo',
    description: 'Premier Isshinryu Karate Dojo — Traditional discipline, physical fitness, and practical self-defense.',
    siteName: 'Vishakahu Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishakahu Academy | Isshinryu Karate Dojo',
    description: 'Premier Isshinryu Karate Dojo led by Kyoshi Vishnuwarthan.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  'name': 'Vishakahu Academy',
  'alternateName': 'Vishakahu Isshinryu Karate Dojo',
  'description': 'Premier Isshinryu Karate Dojo led by Kyoshi Vishnuwarthan. Combining traditional discipline, physical fitness, weapon training (Kobudo), and practical self-defense.',
  'url': defaultUrl,
  'telephone': '+91-98400-00000',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Tirunelveli',
    'addressRegion': 'Tamil Nadu',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 8.7139,
    'longitude': 77.7567
  },
  'priceRange': '$$',
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '06:00',
      'closes': '20:00'
    }
  ]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cinzel.variable} ${notoSerifJP.variable} ${notoSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-ink text-paper font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
