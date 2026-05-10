'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BrandSolarSystem from '@/components/ui/BrandSolarSystem';
/* ─── COUNTER (re-rolls on every scroll into view) ─── */
function Counter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
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
  { label: 'Growth Secrets', sub: 'Why Some Brands Grow Fast', img: '/images/portfolio/carousel-1.png' },
  { label: 'Fast-Growing', sub: 'The Winning Formula', img: '/images/portfolio/carousel-2.png' },
  { label: 'Stuck Brands', sub: 'Common Mistakes', img: '/images/portfolio/carousel-3.png' },
  { label: 'Strategy', sub: 'Growth Is Not Luck', img: '/images/portfolio/carousel-4.png' },
  { label: 'Scale Up', sub: 'Ready to scale your brand?', img: '/images/portfolio/carousel-5.png' },
];

function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const next = useCallback(() => setCur(p => (p + 1) % carouselSlides.length), []);
  useEffect(() => { const t = setInterval(next, 3500); return () => clearInterval(t); }, [next]);

  return (
    <div className="mt-6 mb-6 mx-auto w-full">
      <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={cur}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0">
            <img
              src={carouselSlides[cur].img}
              alt={carouselSlides[cur].label}
              className="w-full h-full object-cover object-top bg-[#0a0a0f]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center pb-4 md:pb-6">
              <div className="text-center">
                <div className="text-white text-xs sm:text-sm font-semibold">{carouselSlides[cur].label}</div>
                <div className="text-white/50 text-xs">{carouselSlides[cur].sub}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-3">
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
  { icon: '🎯', title: 'AI Lead Generation', color: 'from-blue-500/20 to-cyan-500/10', border: 'hover:border-blue-500/20' },
  { icon: '📣', title: 'Paid Advertising', color: 'from-purple-500/20 to-pink-500/10', border: 'hover:border-purple-500/20' },
  { icon: '💎', title: 'Logo & Campaign Design', color: 'from-cyan-500/20 to-blue-500/10', border: 'hover:border-cyan-500/20' },
  { icon: '🌐', title: 'Website Design', color: 'from-indigo-500/20 to-purple-500/10', border: 'hover:border-indigo-500/20' },
  { icon: '📱', title: 'Social Media', color: 'from-pink-500/20 to-orange-500/10', border: 'hover:border-pink-500/20' },
  { icon: '🔍', title: 'SEO & Content', color: 'from-emerald-500/20 to-cyan-500/10', border: 'hover:border-emerald-500/20' },
  { icon: '🎨', title: 'Ad Creatives', color: 'from-orange-500/20 to-yellow-500/10', border: 'hover:border-orange-500/20' },
  { icon: '🖥️', title: 'Conversion Landing Page', color: 'from-violet-500/20 to-blue-500/10', border: 'hover:border-violet-500/20' },
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
  { name: 'Sneha Reddy', role: 'CMO, UrbanNest', text: 'The ROI on our ad campaigns exceeded every expectation.', tag: 'Ads' },
  { name: 'Karthik Nair', role: 'Founder, FreshBrew', text: 'Our social media engagement tripled after the rebrand.', tag: 'Social' },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full"
        >
          <div className="text-center w-full px-4 sm:px-8 md:px-12 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/5 text-xs text-muted mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for Projects
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-[var(--font-heading)] leading-[1.05] mb-3">
            <span className="gradient-text">Rahul Designs</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-lg md:text-2xl text-muted font-light tracking-wide">
            Strategy. Design. Growth.
          </motion.p>

          {/* Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.8 }} 
            className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center"
          >
            <HeroCarousel />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 text-xs sm:text-sm text-muted-dark px-4 max-w-xs sm:max-w-none mx-auto">
            {['High-Converting Websites', 'Brand Systems', 'Paid Campaigns', 'Creative Strategy'].map((item, i) => (
              <span key={i} className="cursor-default text-muted-dark">
                {item}
              </span>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-10 mb-6 flex justify-center">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </div>
        </motion.div>

        {/* Decorative floating elements — hidden on mobile to avoid overflow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
          <div className="absolute top-[20%] left-[10%] w-20 h-20 border border-accent-blue/8 rounded-2xl animate-float rotate-12" />
          <div className="absolute top-[30%] right-[12%] w-16 h-16 border border-accent-purple/8 rounded-full animate-float-reverse" />
          <div className="absolute bottom-[25%] left-[20%] w-12 h-12 border border-accent-cyan/8 rotate-45 animate-float" />
          <div className="absolute bottom-[30%] right-[18%] w-24 h-24 border border-accent-purple/5 rounded-3xl animate-spin-slow" />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">What We Do</span>
            <h2 className="section-heading text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white">Our Services</h2>
            <p className="section-subtext text-muted text-sm">Services start from &#8377;5000 onwards</p>
          </AnimatedSection>

          <div className="section-content-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.06} animation={i % 2 === 0 ? 'fadeUp' : 'scaleUp'} viewportMargin="100px">
                <motion.div whileHover={{ scale: 1.05, y: -4 }} className={`gradient-card p-4 sm:p-6 md:p-8 cursor-default text-center ${s.border} transition-all duration-500`}>
                  <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${s.color} opacity-60`} />
                  <div className="relative z-10">
                    <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">{s.icon}</span>
                    <h3 className="text-white font-semibold text-xs sm:text-sm">{s.title}</h3>
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
      <section className="relative w-full flex flex-col items-center">
        <BrandSolarSystem />
      </section>

      {/* ═══ FEATURED WORK ═══ */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="fadeDown">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">Portfolio</span>
            <h2 className="section-heading text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white">Featured Work</h2>
          </AnimatedSection>

          <div className="section-content-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredWork.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.08} animation={['fadeUp', 'scaleUp', 'fadeLeft', 'fadeRight', 'rotate', 'fadeUp'][i]} viewportMargin="100px">
                <Link href="/portfolio" className="group block">
                  <div className="card-3d gradient-card overflow-hidden text-center">
                    <div className="image-placeholder aspect-[4/3] relative">
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        fill 
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                      />
                    </div>
                    <div className="p-4 sm:p-5 text-center">
                      <span className="text-xs text-accent-blue uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-white font-semibold mt-1 text-sm group-hover:text-accent-blue-light transition-colors">{p.title}</h3>
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
      <section className="process-section relative w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan">How We Work</span>
            <h2 className="section-heading text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-white">Our Process</h2>
          </AnimatedSection>

          <div className="process-steps-row section-content-grid flex flex-wrap justify-center gap-6 sm:gap-10 mx-auto">
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
      <section className="testimonials-section relative w-full flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="fadeDown">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-pink">Testimonials</span>
            <h2 className="section-heading text-3xl md:text-4xl font-bold font-[var(--font-heading)] text-white">Client Feedback</h2>
          </AnimatedSection>
        </div>

        {/* Marquee Container */}
        <div className="section-content-grid w-full overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee-left">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] mx-2 sm:mx-3">
                <div className="glass p-5 sm:p-8 glow-purple text-center h-full">
                  <p className="testimonial-quote text-white text-sm sm:text-base italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-name text-white font-semibold text-sm">{t.name}</div>
                  <div className="testimonial-title text-muted text-xs">{t.role}</div>
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full border border-accent-purple/20 bg-accent-purple/5 text-xs text-accent-purple">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section relative w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <h2 className="section-heading text-3xl sm:text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white leading-tight">
              Ready to <span className="gradient-text">grow</span>?
            </h2>
            <div className="cta-buttons-row section-content-grid flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/contact" className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-white font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 hover:scale-105">
                Get in Touch
              </Link>
              <a href="https://wa.me/918778314030?text=Hi%20Rahul" target="_blank" rel="noopener noreferrer" className="px-8 sm:px-10 py-3 sm:py-4 rounded-full border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all duration-300">
                WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
