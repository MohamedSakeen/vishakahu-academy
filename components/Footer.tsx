'use client';

import { Instagram, Facebook, Youtube, Phone, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white-off/10 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* Brand Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex flex-col">
                <h2 className="font-serif text-xl tracking-widest text-paper uppercase">
                  Vishakahu
                </h2>
                <span className="text-[10px] tracking-[0.25em] text-white-off/60 uppercase">
                  Academy
                </span>
              </div>
            </div>

            <p className="text-white-off/50 text-sm font-sans mb-6 leading-relaxed">
              Isshinryu Karate Dojo — Combining tradition, discipline, and practical self-defense into a complete martial arts system.
            </p>

            {/* Quick Social Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/vishakahu_academy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61558976488887&ref=NONE_xav_ig_profile_page_web#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/@MartialArtsAcademy2023"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919629368936"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-gold mb-6 border-b border-white-off/10 pb-4 inline-block">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Classes', 'Journey', 'Philosophy', 'Sensei', 'Masters'].map(link => (
                <li key={link}>
                  <a href={`/#${link.toLowerCase()}`} className="text-white-off/60 hover:text-crimson transition-colors font-sans text-sm uppercase tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-gold mb-6 border-b border-white-off/10 pb-4 inline-block">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-white-off/60">
              <li className="text-paper font-serif font-semibold">Kyoshi Vishnu</li>
              <li>
                <a href="tel:+919629368936" className="hover:text-gold transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                  +91 96293 68936
                </a>
              </li>
              <li>
                <a href="mailto:vishnu.judovav@gmail.com" className="hover:text-gold transition-colors">
                  vishnu.judovav@gmail.com
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-white-off/10 font-serif tracking-widest text-crimson">Tirunelveli & Chennai, India</li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-gold mb-6 border-b border-white-off/10 pb-4 inline-block">Follow Us</h4>
            <ul className="space-y-4 font-sans text-sm text-white-off/60">
              <li>
                <a
                  href="https://www.instagram.com/vishakahu_academy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 group-hover:border-gold group-hover:text-gold transition-colors">
                    <Instagram className="w-4 h-4" />
                  </span>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61558976488887&ref=NONE_xav_ig_profile_page_web#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 group-hover:border-gold group-hover:text-gold transition-colors">
                    <Facebook className="w-4 h-4" />
                  </span>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@MartialArtsAcademy2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 group-hover:border-gold group-hover:text-gold transition-colors">
                    <Youtube className="w-4 h-4" />
                  </span>
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919629368936"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full border border-white-off/20 flex items-center justify-center text-white-off/70 group-hover:border-gold group-hover:text-gold transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  WhatsApp (96293 68936)
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white-off/10 flex flex-col md:flex-row items-center justify-between text-xs text-white-off/40 tracking-widest uppercase gap-4">
          <p>© {new Date().getFullYear()} Vishakahu Academy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
