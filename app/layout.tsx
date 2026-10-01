import type { Metadata } from 'next';
import { Cinzel, Noto_Serif_JP, Noto_Sans } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

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
const canonicalOrigin = defaultUrl.replace(/\/+$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: 'Best Karate Classes in Tirunelveli | Vishakahu Martial Arts Academy',
    template: '%s | Vishakahu Academy',
  },
  description: 'Join the best karate classes in Tirunelveli at Vishakahu Academy. Professional coaching in Isshinryu Karate, Judo & Taekwondo for kids and adults. Focus on discipline, self-defense, and physical fitness.',
  keywords: [
    'best karate classes in Tirunelveli',
    'Vishakahu Academy',
    'karate classes for kids in Tirunelveli',
    'Isshinryu Karate in Tirunelveli',
    'martial arts academy in Tirunelveli',
    'Judo classes in Tirunelveli',
    'Taekwondo classes in Tirunelveli',
    'professional karate coaching',
    'self-defense classes Tirunelveli',
    'karate classes in Palayamkottai',
    'Maharaja Nagar martial arts',
    'Perumalpuram karate classes',
    'Kyoshi Vishnu',
    'self defense classes',
    'kids karate classes',
    'black belt development',
    'martial arts for children',
  ],
  authors: [{ name: 'Vishakahu Academy' }],
  creator: 'Vishakahu Academy',
  publisher: 'Vishakahu Academy',
  alternates: {
    canonical: '/',
  },
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
    locale: 'en_IN',
    url: `${canonicalOrigin}/`,
    siteName: 'Vishakahu Academy',
    title: 'Best Karate Classes in Tirunelveli | Vishakahu Academy',
    description: 'Join the best karate classes in Tirunelveli. Professional Isshinryu Karate, Judo, and Taekwondo training focusing on discipline, self-defense, and fitness.',
    images: [
      {
        url: '/masters/Vishnu_sensei.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kyoshi Vishnu - Vishakahu Academy Chief Instructor and Martial Arts Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Karate Classes in Tirunelveli | Vishakahu Academy',
    description: 'Professional Isshinryu Karate, Judo, and Taekwondo training focusing on discipline, self-defense, and fitness in Tirunelveli.',
    images: ['/masters/Vishnu_sensei.jpeg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['SportsClub', 'EducationalOrganization'],
      '@id': `${canonicalOrigin}/#academy`,
      'name': 'Vishakahu Academy',
      'alternateName': ['Vishakahu Isshinryu Karate Dojo', 'VishakaHu Academy', 'Best Karate Classes in Tirunelveli'],
      'url': `${canonicalOrigin}/`,
      'image': `${canonicalOrigin}/masters/Vishnu_sensei.jpeg`,
      'description': 'Premier martial arts academy specializing in authentic Isshinryu Karate-do, Judo, and Taekwondo training. Known for the best karate classes in Tirunelveli focusing on discipline, physical fitness, and self-defense for children and adults.',
      'telephone': '+919629368936',
      'email': 'vishnu.judovav@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Tirunelveli',
        'addressRegion': 'Tamil Nadu',
        'addressCountry': 'IN'
      },
      'areaServed': [
        {
          '@type': 'City',
          'name': 'Tirunelveli'
        },
        {
          '@type': 'City',
          'name': 'Palayamkottai'
        },
        {
          '@type': 'City',
          'name': 'Maharaja Nagar'
        },
        {
          '@type': 'City',
          'name': 'Chennai'
        }
      ],
      'founder': {
        '@type': 'Person',
        'name': 'Kyoshi Vishnu',
        'jobTitle': 'Founder & Chief Instructor',
        'honorificPrefix': 'Kyoshi',
        'description': '7th Dan IIWKA, 1st Dan Taekwondo, 1st Dan Judo, 1st Dan Choi Kwang Do'
      },
      'knowsAbout': [
        'Isshinryu Karate-do',
        'Judo',
        'Taekwondo',
        'Choi Kwang Do',
        'Kobudo',
        'Self-Defense',
        'Martial Arts Competition Training'
      ],
      'sameAs': [
        'https://www.instagram.com/vishakahu_academy',
        'https://www.facebook.com/profile.php?id=61558976488887',
        'https://www.youtube.com/@MartialArtsAcademy2023',
        'https://wa.me/919629368936',
        'https://maps.app.goo.gl/XYGXqvEnGFqNpb918'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${canonicalOrigin}/#website`,
      'url': `${canonicalOrigin}/`,
      'name': 'Vishakahu Academy',
      'publisher': {
        '@id': `${canonicalOrigin}/#academy`
      },
      'inLanguage': 'en-IN'
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cinzel.variable} ${notoSerifJP.variable} ${notoSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-ink text-paper font-sans antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
