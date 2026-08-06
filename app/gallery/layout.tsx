import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Vishakahu Academy',
  description: 'View the visual journey of Vishakahu Academy through our gallery of tournaments, grading ceremonies, seminars, and daily dojo training.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
