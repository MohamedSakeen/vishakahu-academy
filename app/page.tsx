import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import ParticleCanvas from '@/components/ParticleCanvas';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Classes from '@/components/Classes';
import LogoAnatomy from '@/components/LogoAnatomy';
import Philosophy from '@/components/Philosophy';
import Gallery from '@/components/Gallery';
import Sensei from '@/components/Sensei';
import Masters from '@/components/Masters';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vishakahu.com';
const canonicalOrigin = defaultUrl.replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Vishakahu Academy | Martial Arts & Karate Academy in Tirunelveli',
  description: 'Authentic Isshinryu Karate-do, Judo, and Taekwondo academy in Tirunelveli and Chennai branch. Rigorous training in traditional martial arts, self-defense, and international competition for students, athletes, and aspirants.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `${canonicalOrigin}/`,
    siteName: 'Vishakahu Academy',
    title: 'Vishakahu Academy | Martial Arts & Karate Academy in Tirunelveli',
    description: 'Authentic Isshinryu Karate, Judo, and Taekwondo training for students, athletes, and defense aspirants in Tirunelveli and Chennai.',
    images: [
      {
        url: '/masters/Vishnu_sensei.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kyoshi Vishnu - Vishakahu Academy Founder and Chief Instructor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishakahu Academy | Martial Arts & Karate Academy in Tirunelveli',
    description: 'Authentic Isshinryu Karate, Judo, and Taekwondo training for students, athletes, and defense aspirants in Tirunelveli and Chennai.',
    images: ['/masters/Vishnu_sensei.jpeg'],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Loader />
      <CustomCursor />
      <ParticleCanvas />
      
      <Navigation />
      
      <Hero />
      <Classes />
      <LogoAnatomy />
      <Masters />
      <Sensei />
      <Philosophy />
      <Gallery />
      <Contact />
      
      <Footer />
    </main>
  );
}
