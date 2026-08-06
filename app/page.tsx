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

export const metadata: Metadata = {
  title: 'Home | Vishakahu Academy',
  description: 'Welcome to Vishakahu Academy. Explore our training programs, philosophy, and the master lineage of Isshinryu Karate.',
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
