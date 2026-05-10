'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

function RDLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="url(#rdGrad)" />
      <text x="7" y="28" fontFamily="var(--font-heading), sans-serif" fontWeight="800" fontSize="20" fill="white" letterSpacing="-1">RD</text>
      <defs>
        <linearGradient id="rdGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#00E5FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { RDLogo };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ─── TOP NAVIGATION BAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-black/50 backdrop-blur-sm py-5'
        }`}
        style={{ transform: 'translateY(0)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <RDLogo size={36} />
            <span className="text-lg font-bold tracking-tight font-[var(--font-heading)] text-white group-hover:text-accent-blue-light transition-colors duration-300">
              Rahul Designs
            </span>
          </Link>

          {/* Desktop links — hidden below md (768px) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  pathname === link.href ? 'text-white' : 'text-muted hover:text-white'
                }`}>
                {link.name}
                {pathname === link.href && (
                  <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
              </Link>
            ))}
          </div>

          {/* Hamburger in header — also visible on mobile in the top bar */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ─── FLOATING MOBILE MENU BUTTON (center-bottom, always visible on mobile) ─── */}
      {!mobileOpen && (
        <div className="md:hidden fixed bottom-8 inset-x-0 z-[55] flex justify-center pointer-events-none">
          <button
            onClick={() => setMobileOpen(true)}
            className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan shadow-lg shadow-accent-purple/30 border border-white/10"
            aria-label="Open navigation menu"
          >
          {/* 3-line icon */}
          <div className="flex flex-col gap-[3px]">
            <span className="block w-4 h-[2px] bg-white rounded-full" />
            <span className="block w-3 h-[2px] bg-white/80 rounded-full" />
            <span className="block w-4 h-[2px] bg-white rounded-full" />
          </div>
          <span className="text-white text-sm font-semibold font-[var(--font-heading)] tracking-wide">Menu</span>
          </button>
        </div>
      )}

      {/* ─── MOBILE FULLSCREEN MENU OVERLAY ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-6"
          >
            {/* Close button — center bottom, same position as the open button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white"
              aria-label="Close menu"
            >
              <span className="text-lg">✕</span>
              <span className="text-sm font-semibold font-[var(--font-heading)] tracking-wide">Close</span>
            </button>

            {/* Page links */}
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-3xl font-bold font-[var(--font-heading)] ${
                    pathname === link.href
                      ? 'gradient-text'
                      : 'text-white hover:text-accent-blue-light transition-colors'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
