import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center p-6 text-center">
      <div className="text-[120px] font-jp opacity-10 text-gold select-none pointer-events-none mb-2">
        無
      </div>

      <span className="text-gold font-serif text-xs tracking-[0.3em] uppercase mb-3">
        404 — Page Not Found
      </span>

      <h1 className="text-4xl md:text-5xl font-serif text-paper uppercase tracking-widest mb-6">
        Path Not Found
      </h1>

      <p className="text-white-off/60 max-w-md font-sans text-sm mb-10 leading-relaxed">
        The path you seek does not exist on the tatami. Return to the main academy page to continue your journey.
      </p>

      <Link
        href="/"
        className="inline-block relative px-8 py-4 font-serif text-gold text-xs tracking-[0.2em] uppercase transition-all duration-300 group border border-gold/30 hover:border-gold"
      >
        Return to Dojo
      </Link>
    </div>
  );
}
