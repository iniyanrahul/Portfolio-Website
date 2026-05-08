'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DigitalOrbitSphere from '@/components/ui/DigitalOrbitSphere';

const skills = [
  { name: 'Digital Marketing', level: 95 },
  { name: 'Brand Design', level: 90 },
  { name: 'Meta & Google Ads', level: 92 },
  { name: 'SEO', level: 88 },
  { name: 'UI/UX', level: 85 },
  { name: 'Social Media', level: 93 },
];

const tools = ['Figma', 'Photoshop', 'Illustrator', 'Canva Pro', 'Meta Ads', 'Google Ads', 'Analytics', 'SEMrush', 'WordPress', 'Shopify'];

const timeline = [
  { year: 'Foundation', title: 'RahulDesigns Founded' },
  { year: 'Growth', title: 'First 20 Clients' },
  { year: 'Scale', title: '50+ Projects Delivered' },
  { year: 'Today', title: 'Premium Growth Studio' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 mx-auto">
          <AnimatedSection animation="scaleUp">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue mb-4 block">About</span>
              <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white">
                The Mind Behind <span className="gradient-text">Rahul Designs</span>
              </h1>
            </div>
          </AnimatedSection>

          {/* Two-column: Image + Bio */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 w-full max-w-6xl mx-auto">
            {/* Left: Founder portrait (Uncropped) */}
            <AnimatedSection animation="fadeLeft" delay={0.1} className="flex-1 flex md:justify-end justify-center w-full">
              <div className="w-full max-w-[380px] rounded-3xl overflow-hidden relative shadow-2xl shadow-accent-purple/20 bg-white/5">
                <Image 
                  src="/images/founder.png" 
                  alt="Rahul Iniyan" 
                  width={500}
                  height={800}
                  className="w-full h-auto object-contain block"
                />
              </div>
            </AnimatedSection>

            {/* Right: Bio & Info */}
            <AnimatedSection animation="fadeRight" delay={0.2} className="flex-1 flex md:justify-start justify-center w-full">
              <div className="flex flex-col justify-center max-w-[500px] w-full gap-6 text-left">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple mb-2 block">Founder &amp; Creative Director</span>
                  <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] text-white mb-4">Rahul Iniyan</h2>
                  <p className="text-muted text-base leading-relaxed mb-4">
                    I&apos;m a designer and marketing strategist who believes that great design isn&apos;t just about looking good &mdash; it&apos;s about <strong className="text-white">driving real results</strong>. Every pixel I place, every campaign I craft, is engineered to convert attention into action.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    My passion lies at the intersection of <strong className="text-accent-cyan">creative design</strong> and <strong className="text-accent-blue">data-driven marketing</strong>. I obsess over the details because I know that&apos;s where the magic happens &mdash; the subtle gradient that keeps eyes on the page, the headline that makes someone stop scrolling.
                  </p>
                </div>

                {/* Highlight cards */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} className="gradient-card p-4 text-center cursor-default">
                    <div className="relative z-10">
                      <span className="text-2xl block mb-1">🔥</span>
                      <span className="text-white text-sm font-semibold block">Passionate</span>
                      <span className="text-muted text-xs">About every project</span>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} className="gradient-card p-4 text-center cursor-default">
                    <div className="relative z-10">
                      <span className="text-2xl block mb-1">🎯</span>
                      <span className="text-white text-sm font-semibold block">Results-Driven</span>
                      <span className="text-muted text-xs">ROI focused approach</span>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} className="gradient-card p-4 text-center cursor-default">
                    <div className="relative z-10">
                      <span className="text-2xl block mb-1">⚡</span>
                      <span className="text-white text-sm font-semibold block">Fast Delivery</span>
                      <span className="text-muted text-xs">Quick turnarounds</span>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} className="gradient-card p-4 text-center cursor-default">
                    <div className="relative z-10">
                      <span className="text-2xl block mb-1">💡</span>
                      <span className="text-white text-sm font-semibold block">Innovative</span>
                      <span className="text-muted text-xs">Cutting-edge ideas</span>
                    </div>
                  </motion.div>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-6 mt-2 pt-4 border-t border-white/5">
                  <div>
                    <span className="text-2xl font-bold gradient-text">50+</span>
                    <span className="text-muted text-xs block">Projects</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="text-2xl font-bold gradient-text">15+</span>
                    <span className="text-muted text-xs block">Industries</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="text-2xl font-bold gradient-text">98%</span>
                    <span className="text-muted text-xs block">Satisfaction</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 mx-auto">
          <AnimatedSection animation="fadeDown" className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple mb-4 block">Expertise</span>
            <h2 className="text-3xl font-bold font-[var(--font-heading)] text-white">Skills</h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 w-full max-w-6xl mx-auto">
            {/* Left: Shorter Progress Bars */}
            <AnimatedSection animation="fadeRight" className="flex-1 flex md:justify-end justify-center w-full order-2 md:order-1">
              <div className="space-y-6 max-w-[450px] w-full">
                {skills.map((s, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-white font-medium">{s.name}</span>
                      <span className="text-accent-blue font-semibold">{s.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right: 3D Animated Object */}
            <AnimatedSection animation="fadeLeft" className="flex-1 flex md:justify-start justify-center w-full order-1 md:order-2 mb-10 md:mb-0">
              <div className="w-full max-w-[380px] aspect-square relative">
                <DigitalOrbitSphere />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6 text-center">
          <AnimatedSection animation="scaleUp" className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan mb-4 block">Journey</span>
            <h2 className="text-3xl font-bold font-[var(--font-heading)] text-white">Timeline</h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-6">
            {timeline.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="scaleUp">
                <motion.div whileHover={{ y: -4, scale: 1.05 }} className="gradient-card p-6 w-40 text-center cursor-default">
                  <div className="relative z-10">
                    <div className="text-xs text-accent-blue font-mono mb-2">{t.year}</div>
                    <div className="text-white text-sm font-semibold">{t.title}</div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 text-center mx-auto">
          <AnimatedSection animation="fadeDown" className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple mb-4 block">Stack</span>
            <h2 className="text-3xl font-bold font-[var(--font-heading)] text-white">Tools We Use</h2>
          </AnimatedSection>
          <AnimatedSection animation="scaleUp">
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map(t => (
                <motion.span key={t} whileHover={{ scale: 1.08, y: -2 }} className="px-4 py-2 rounded-full border border-white/8 bg-white/3 text-sm text-muted hover:text-white hover:border-accent-blue/30 transition-all cursor-default">
                  {t}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Workspace */}
      <section className="py-24 w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 text-center mx-auto mt-20">
          <AnimatedSection animation="scaleUp">
            <div className="card-3d image-placeholder rounded-2xl mx-auto relative overflow-hidden max-w-4xl w-full flex justify-center">
              <Image 
                src="/images/rahul-neon-profile.png" 
                alt="Rahul Designs Profile" 
                width={1200}
                height={1200}
                className="w-full h-auto object-contain opacity-90 mx-auto" 
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
