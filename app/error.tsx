'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center p-6 text-center">
      <span className="text-crimson font-serif text-xs tracking-[0.3em] uppercase mb-3">
        System Notice
      </span>

      <h1 className="text-3xl md:text-4xl font-serif text-paper uppercase tracking-widest mb-6">
        An Unexpected Error Occurred
      </h1>

      <p className="text-white-off/60 max-w-md font-sans text-sm mb-8 leading-relaxed">
        We encountered a momentary disturbance. Click below to reset and try again.
      </p>

      <button
        onClick={() => reset()}
        className="px-8 py-3.5 bg-crimson hover:bg-deep-red text-white font-serif text-xs tracking-[0.2em] uppercase transition-colors rounded-none"
      >
        Try Again
      </button>
    </div>
  );
}
