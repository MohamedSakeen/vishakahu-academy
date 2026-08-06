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

export const metadata: Metadata = {
  title: 'Vishakahu Academy',
  description: 'Vishakahu Academy - The Path of Discipline. Isshinryu Karate Dojo.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cinzel.variable} ${notoSerifJP.variable} ${notoSans.variable}`}>
      <body suppressHydrationWarning className="bg-ink text-paper font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
