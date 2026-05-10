'use client';
import Link from 'next/link';
import { RDLogo } from './Navbar';

export default function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20 mt-32 md:mt-40">
      {/* Top glowing edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-accent-blue/10 blur-3xl pointer-events-none" />

      <div className="max-w-[2000px] w-[95vw] lg:w-[90vw] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {/* Brand */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                <RDLogo size={40} />
              </div>
              <span className="text-2xl font-bold font-[var(--font-heading)] text-white tracking-wide">Rahul Designs</span>
            </Link>
            <p className="text-muted text-sm max-w-xs leading-relaxed">Premium creative growth studio bridging strategic digital marketing with world-class design.</p>
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white mb-2">Navigate</h4>
            {['Home', 'About', 'Portfolio', 'Services', 'Contact'].map(n => (
              <Link key={n} href={n === 'Home' ? '/' : `/${n.toLowerCase()}`} className="text-muted hover:text-accent-blue transition-colors text-base relative group">
                {n}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent-blue group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white mb-2">Connect</h4>
            <a href="https://wa.me/918778314030" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green-400 transition-colors text-base flex items-center gap-2">
              WhatsApp
            </a>
            <a href="https://www.instagram.com/dark__introvert?igsh=b3Y5OHltNTd2MWEz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-pink-400 transition-colors text-base flex items-center gap-2">
              Instagram
            </a>
            <a href="mailto:iniyanrahul07@gmail.com" className="text-muted hover:text-accent-blue transition-colors text-base flex items-center gap-2">
              Email
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-muted-dark text-sm">&copy; {new Date().getFullYear()} Rahul Designs. All rights reserved.</p>
          <p className="text-muted-dark text-xs">Designed with <span className="text-red-500">♥</span> by Rahul Iniyan</p>
        </div>
      </div>
    </footer>
  );
}
