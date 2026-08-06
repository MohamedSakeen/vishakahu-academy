import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import ParticleCanvas from '@/components/ParticleCanvas';
import CustomCursor from '@/components/CustomCursor';
import Journey from '@/components/Journey';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Belt Journey | Vishakahu Academy',
  description: 'Explore the belt progression system at Vishakahu Academy. From White Belt to Shodan, understand the path of discipline and the meaning behind each rank.',
};

export default function JourneyPage() {
  return (
    <main className="relative min-h-screen pt-20">
      <CustomCursor />
      <ParticleCanvas />
      
      <Navigation />
      
      <Journey />
      
      <Footer />
    </main>
  );
}
