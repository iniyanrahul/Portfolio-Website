'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BrandSolarSystem from '@/components/ui/BrandSolarSystem';
/* ─── COUNTER ─── */
function Counter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 120;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] gradient-text">{count}{suffix}</div>
      <div className="text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

/* ─── HERO CAROUSEL ─── */
const carouselSlides = [
  { label: 'Brand Identity', sub: 'Premium branding systems', img: '/images/portfolio/brand-identity.png' },
  { label: 'Ad Campaigns', sub: 'High-converting paid ads', img: '/images/portfolio/ad-campaigns.png' },
  { label: 'Web Design', sub: 'Modern digital experiences', img: '/images/portfolio/web-design.png' },
  { label: 'Social Media', sub: 'Engagement-driven content', img: '/images/portfolio/social-media.png' },
  { label: 'Lead Generation', sub: 'Strategic growth funnels', img: '/images/portfolio/lead-generation.png' },
];

function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const next = useCallback(() => setCur(p => (p + 1) % carouselSlides.length), []);
  useEffect(() => { const t = setInterval(next, 3500); return () => clearInterval(t); }, [next]);

  return (
    <div className="relative w-[95vw] lg:w-[90vw] max-w-[1800px] left-1/2 -translate-x-1/2 mt-12 mb-16 px-4 md:px-0">
      <div className="relative aspect-[4/5] sm:aspect-[16/8] md:aspect-[21/9] rounded-xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={cur}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0">
            <img
              src={carouselSlides[cur].img}
              alt={carouselSlides[cur].label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center pb-6">
              <div className="text-center">
                <div className="text-white text-sm font-semibold">{carouselSlides[cur].label}</div>
                <div className="text-white/50 text-xs">{carouselSlides[cur].sub}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {carouselSlides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? 'w-6 bg-gradient-to-r from-accent-blue to-accent-purple' : 'w-1.5 bg-white/15 hover:bg-white/30'}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ─── */
const services = [
  { icon: '🎯', title: 'Lead Generation', color: 'from-blue-500/20 to-cyan-500/10', border: 'hover:border-blue-500/20' },
  { icon: '📣', title: 'Paid Advertising', color: 'from-purple-500/20 to-pink-500/10', border: 'hover:border-purple-500/20' },
  { icon: '💎', title: 'Brand Identity', color: 'from-cyan-500/20 to-blue-500/10', border: 'hover:border-cyan-500/20' },
  { icon: '🌐', title: 'Website Design', color: 'from-indigo-500/20 to-purple-500/10', border: 'hover:border-indigo-500/20' },
  { icon: '📱', title: 'Social Media', color: 'from-pink-500/20 to-orange-500/10', border: 'hover:border-pink-500/20' },
  { icon: '🔍', title: 'SEO & Content', color: 'from-emerald-500/20 to-cyan-500/10', border: 'hover:border-emerald-500/20' },
  { icon: '🎨', title: 'Ad Creatives', color: 'from-orange-500/20 to-yellow-500/10', border: 'hover:border-orange-500/20' },
  { icon: '🖥️', title: 'Landing Pages', color: 'from-violet-500/20 to-blue-500/10', border: 'hover:border-violet-500/20' },
];

/* ─── PORTFOLIO ─── */
const featuredWork = [
  { title: 'E-Commerce Brand Launch', category: 'Branding', metric: '340% ROAS', image: '/images/portfolio/ecommerce-brand-clean.png' },
  { title: 'SaaS Lead Gen Campaign', category: 'Paid Ads', metric: '2.8x Conversions', image: '/images/portfolio/saas-lead-gen-clean.png' },
  { title: 'Restaurant Chain Rebrand', category: 'Brand Identity', metric: '180% Engagement', image: '/images/portfolio/restaurant-rebrand-clean.png' },
  { title: 'Fitness Studio Growth', category: 'Social Media', metric: '50K+ Reach', image: '/images/portfolio/fitness-social-clean.png' },
  { title: 'Real Estate Funnels', category: 'Lead Gen', metric: '120+ Leads/Mo', image: '/images/portfolio/real-estate-funnels-clean.png' },
  { title: 'EdTech Landing Pages', category: 'UI Design', metric: '4.2% CVR', image: '/images/portfolio/edtech-ui-clean.png' },
];

/* ─── PROCESS ─── */
const processSteps = [
  { num: '01', title: 'Discovery', icon: '🔭' },
  { num: '02', title: 'Strategy', icon: '🧠' },
  { num: '03', title: 'Execute', icon: '⚡' },
  { num: '04', title: 'Optimize', icon: '📊' },
  { num: '05', title: 'Growth', icon: '🚀' },
];

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: 'Arjun Mehta', role: 'CEO, TechVista', text: 'RahulDesigns transformed our online presence completely.', tag: 'Marketing' },
  { name: 'Priya Sharma', role: 'Founder, StyleCraft', text: 'The brand identity perfectly captures our vision.', tag: 'Branding' },
  { name: 'Vikram Patel', role: 'Director, GrowthEdge', text: 'Lead generation improved by 300% in two months.', tag: 'Lead Gen' },
];

export default function HomePage() {
  const [currentTest, setCurrentTest] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTest(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-36">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 sm:px-6 md:px-8 w-[95vw] lg:w-[90vw] max-w-[2000px]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/8 bg-white/5 text-xs text-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for Projects
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-[var(--font-heading)] leading-[1.05] mb-4 md:mb-6">
            <span className="gradient-text">Rahul Designs</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9, duration: 0.6 }}
            className="text-base sm:text-lg md:text-2xl text-muted font-light tracking-wide max-w-2xl mx-auto">
            Strategy. Design. Growth.
          </motion.p>

          {/* Image Carousel */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 0.7 }}>
            <HeroCarousel />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 text-xs sm:text-sm text-muted-dark">
            {['High-Converting Websites', 'Brand Systems', 'Paid Campaigns', 'Creative Strategy'].map((item, i) => (
              <motion.span key={i} whileHover={{ color: '#ffffff', y: -2 }} className="cursor-default transition-all duration-300">
                {item}
              </motion.span>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}
            className="mt-16 flex justify-center">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-20 h-20 border border-accent-blue/8 rounded-2xl animate-float rotate-12" />
          <div className="absolute top-[30%] right-[12%] w-16 h-16 border border-accent-purple/8 rounded-full animate-float-reverse" />
          <div className="absolute bottom-[25%] left-[20%] w-12 h-12 border border-accent-cyan/8 rotate-45 animate-float" />
          <div className="absolute bottom-[30%] right-[18%] w-24 h-24 border border-accent-purple/5 rounded-3xl animate-spin-slow" />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-32 relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 md:px-0 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue mb-4 block">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white mb-4">Our Services</h2>
            <p className="text-muted text-sm mb-16">Services start from &#8377;5000 onwards</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.06} animation={i % 2 === 0 ? 'fadeUp' : 'scaleUp'}>
                <motion.div whileHover={{ scale: 1.05, y: -4 }} className={`gradient-card p-6 md:p-8 cursor-default text-center ${s.border} transition-all duration-500`}>
                  <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${s.color} opacity-60`} />
                  <div className="relative z-10">
                    <span className="text-3xl block mb-3">{s.icon}</span>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5} animation="fadeUp" className="mt-8">
            <Link href="/services" className="text-sm text-accent-blue hover:text-accent-blue-light transition-colors">
              View all services &rarr;
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ BRAND SOLAR SYSTEM ═══ */}
      <section className="py-24 relative w-full flex flex-col items-center">
        <BrandSolarSystem />
      </section>

      {/* ═══ FEATURED WORK ═══ */}
      <section className="py-32 relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 md:px-0 text-center">
          <AnimatedSection animation="fadeDown">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple mb-4 block">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white mb-16">Featured Work</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredWork.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.08} animation={['fadeUp', 'scaleUp', 'fadeLeft', 'fadeRight', 'rotate', 'fadeUp'][i]}>
                <Link href="/portfolio" className="group block">
                  <div className="card-3d gradient-card overflow-hidden text-center">
                    <div className="image-placeholder aspect-[4/3] relative">
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                      />
                    </div>
                    <div className="p-5 text-center">
                      <span className="text-xs text-accent-blue uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-white font-semibold mt-1 group-hover:text-accent-blue-light transition-colors">{p.title}</h3>
                      <span className="text-xs text-accent-purple font-medium mt-1 block">{p.metric}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="mt-10">
            <Link href="/portfolio" className="text-sm text-accent-purple hover:text-accent-purple-light transition-colors">View all projects &rarr;</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-32 relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 md:px-0 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan mb-4 block">How We Work</span>
            <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white mb-16">Our Process</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 md:gap-10 max-w-sm sm:max-w-none mx-auto justify-center">
            {processSteps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.12} animation="fadeUp">
                <motion.div whileHover={{ y: -8, scale: 1.05 }} className="text-center cursor-default">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-xs text-accent-blue font-mono mb-1">{s.num}</div>
                  <div className="text-white text-sm font-semibold">{s.title}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 md:px-0 text-center">
          <AnimatedSection animation="fadeDown">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-pink mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] text-white mb-12">Client Feedback</h2>
          </AnimatedSection>

          <div className="relative min-h-[200px]">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: i === currentTest ? 1 : 0 }} transition={{ duration: 0.5 }} className={`absolute inset-0 ${i === currentTest ? 'z-10' : 'z-0'}`}>
                <div className="glass p-10 glow-purple text-center">
                  <p className="text-white text-lg mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-muted text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentTest(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTest ? 'bg-accent-purple w-6' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 md:px-0 text-center">
          <AnimatedSection animation="scaleUp">
            <h2 className="text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white leading-tight mb-8">
              Ready to <span className="gradient-text">grow</span>?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-10 py-4 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-white font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 hover:scale-105">
                Get in Touch
              </Link>
              <a href="https://wa.me/918778314030?text=Hi%20Rahul" target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all duration-300">
                WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
