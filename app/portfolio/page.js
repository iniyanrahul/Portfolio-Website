'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const categories = ['All', 'Branding', 'Paid Ads', 'Social Media', 'Lead Gen', 'UI Design'];

const projects = [
  { title: 'E-Commerce Brand Launch', category: 'Branding', metric: '340% ROAS', problem: 'New D2C brand needed complete identity.', result: '15K+ social followers in 3 months.', image: '/images/portfolio/ecommerce-brand-clean.png' },
  { title: 'SaaS Lead Gen Campaign', category: 'Paid Ads', metric: '2.8x Conversions', problem: 'B2B SaaS struggling with demo requests.', result: '45% reduction in CAC.', image: '/images/portfolio/saas-lead-gen-clean.png' },
  { title: 'Restaurant Chain Rebrand', category: 'Branding', metric: '180% Engagement', problem: 'Legacy brand losing relevance.', result: '35% foot traffic growth.', image: '/images/portfolio/restaurant-rebrand-clean.png' },
  { title: 'Fitness Studio Growth', category: 'Social Media', metric: '50K+ Reach', problem: 'Needed digital presence.', result: '120 new memberships in 60 days.', image: '/images/portfolio/fitness-social-clean.png' },
  { title: 'Real Estate Lead Funnels', category: 'Lead Gen', metric: '120+ Leads/Mo', problem: 'Needed consistent buyer leads.', result: 'Under Rs.200 per lead.', image: '/images/portfolio/real-estate-funnels-clean.png' },
  { title: 'EdTech Landing Pages', category: 'UI Design', metric: '4.2% CVR', problem: 'High traffic, poor conversions.', result: '280% conversion improvement.', image: '/images/portfolio/edtech-ui-clean.png' },
  { title: 'Fashion Brand Ads', category: 'Paid Ads', metric: '5.2x ROAS', problem: 'Scale online sales for festive season.', result: '200% revenue increase.', image: '/images/portfolio/fashion-ads-clean.png' },
  { title: 'Healthcare Social Presence', category: 'Social Media', metric: '300% Growth', problem: 'Build trust and awareness online.', result: '45% increase in bookings.', image: '/images/portfolio/social-media.png' },
  { title: 'Consulting Firm Identity', category: 'Branding', metric: '3 Enterprise Clients', problem: 'Needed premium positioning.', result: 'Secured clients within first month.', image: '/images/portfolio/brand-identity.png' },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">Portfolio</span>
            <h1 className="section-heading text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white">
              Work That <span className="gradient-text">Delivers</span>
            </h1>
          </AnimatedSection>
        </div>

        {/* Filter */}
        <div className="section-content-grid w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 flex flex-wrap justify-center gap-6 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === c ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white' : 'border border-white/8 text-muted hover:text-white'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                  <div className="card-3d gradient-card overflow-hidden group cursor-default">
                    <div className="image-placeholder aspect-[4/3] relative">
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                        <p className="text-white/70 text-xs mb-1">{p.problem}</p>
                        <p className="text-white text-sm font-medium">{p.result}</p>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <span className="text-xs text-accent-blue uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-white font-semibold mt-1">{p.title}</h3>
                      <span className="text-xs text-accent-purple font-medium mt-1 block">{p.metric}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
