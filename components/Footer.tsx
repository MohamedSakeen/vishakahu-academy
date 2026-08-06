'use client';

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white-off/10 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-crimson flex flex-col items-center justify-center text-xs font-jp font-bold text-paper border-2 border-gold mb-4">
                 空手
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-xl tracking-widest text-paper uppercase">
                  Vishakahu
                </h2>
                <span className="text-[10px] tracking-[0.25em] text-white-off/60 uppercase">
                  Academy
                </span>
              </div>
            </div>
            
            <p className="text-white-off/50 text-sm font-sans max-w-sm mb-6 leading-relaxed">
              Isshinryu Karate Dojo — Combining tradition, discipline, and practical self-defense into a complete martial arts system.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-gold mb-6 border-b border-white-off/10 pb-4 inline-block">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Classes', 'Journey', 'Philosophy', 'Sensei', 'Masters'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white-off/60 hover:text-crimson transition-colors font-sans text-sm uppercase tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-gold mb-6 border-b border-white-off/10 pb-4 inline-block">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-white-off/60">
              <li>Kyoshi Vishnuwarthan</li>
              <li><a href="tel:+919629368936" className="hover:text-gold transition-colors">+91 96293 68936</a></li>
              <li><a href="mailto:Vishnu.judo@gmail.com" className="hover:text-gold transition-colors">Vishnu.judo@gmail.com</a></li>
              <li className="mt-4 pt-4 border-t border-white-off/10 font-serif tracking-widest text-crimson">Tirunelveli & Chennai, India</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white-off/10 flex flex-col md:flex-row items-center justify-between text-xs text-white-off/40 tracking-widest uppercase gap-4">
          <p>© {new Date().getFullYear()} Vishakahu Academy. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-crimson" />
            Designed in the Spirit of Budo
          </div>
        </div>
      </div>
    </footer>
  );
}
