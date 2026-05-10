'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const services = [
  { icon: '🎯', title: 'AI Lead Generation', desc: 'Strategic funnels that convert visitors into qualified leads.', gradient: 'from-blue-600/25 via-blue-500/10 to-cyan-500/5' },
  { icon: '📣', title: 'Paid Advertising', desc: 'Data-driven campaigns across Meta, Google & Andromeda.', gradient: 'from-purple-600/25 via-purple-500/10 to-pink-500/5' },
  { icon: '💎', title: 'Logo & Campaign Design', desc: 'Complete brand systems that position you as premium.', gradient: 'from-cyan-600/25 via-cyan-500/10 to-blue-500/5' },
  { icon: '🌐', title: 'Website Design', desc: 'High-converting websites built for growth.', gradient: 'from-indigo-600/25 via-indigo-500/10 to-purple-500/5' },
  { icon: '📱', title: 'Social Media Marketing', desc: 'Platform strategies that build engaged communities.', gradient: 'from-pink-600/25 via-pink-500/10 to-orange-500/5' },
  { icon: '🔍', title: 'SEO & Content', desc: 'Organic visibility that builds lasting authority.', gradient: 'from-emerald-600/25 via-emerald-500/10 to-cyan-500/5' },
  { icon: '🎨', title: 'Ad Creatives', desc: 'Scroll-stopping visuals that drive clicks.', gradient: 'from-orange-600/25 via-orange-500/10 to-yellow-500/5' },
  { icon: '🖥️', title: 'Conversion Landing Page', desc: 'Conversion-focused pages that turn traffic into revenue.', gradient: 'from-violet-600/25 via-violet-500/10 to-blue-500/5' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">Services</span>
            <h1 className="section-heading text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white">
              What We <span className="gradient-text">Build</span>
            </h1>
            <p className="section-subtext text-muted text-lg">Premium services for ambitious businesses</p>
            <p className="section-subtext text-accent-blue text-sm font-medium">Services start from &#8377;5000 onwards</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6">
          <div className="section-content-grid grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.06} animation={i % 3 === 0 ? 'fadeLeft' : i % 3 === 1 ? 'scaleUp' : 'fadeRight'}>
                <motion.div whileHover={{ scale: 1.03, y: -4 }} className="card-3d gradient-card p-8 cursor-default group">
                  <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${s.gradient} opacity-70`} />
                  <div className="relative z-10 text-center">
                    <span className="text-4xl block mb-4">{s.icon}</span>
                    <h2 className="text-xl font-bold font-[var(--font-heading)] text-white mb-2">{s.title}</h2>
                    <p className="text-muted text-sm">{s.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <h2 className="section-heading text-3xl md:text-4xl font-bold font-[var(--font-heading)] text-white">
              Need something custom?
            </h2>
            <div className="section-content-grid flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/918778314030?text=Hi%20Rahul%2C%20I%27d%20like%20to%20discuss%20services" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:scale-105 transition-all">
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:scale-105 transition-all">
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
