'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DigitalOrbitSphere from '@/components/ui/DigitalOrbitSphere';

/* ─── ABOUT COUNTER (re-rolls on every scroll into view) ─── */
function AboutCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
    let start = 0;
    const step = value / 80;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref}>
      <span className="text-2xl font-bold gradient-text">{count}{suffix}</span>
      <span className="text-muted text-xs block">{label}</span>
    </div>
  );
}

const skills = [
  { name: 'Digital Marketing', level: 95 },
  { name: 'Brand Design', level: 90 },
  { name: 'Web Design', level: 87 },
  { name: 'Meta & Google Ads', level: 92 },
  { name: 'SEO', level: 88 },
  { name: 'UI/UX', level: 85 },
  { name: 'Social Media', level: 93 },
];

const tools = ['Figma', 'Photoshop', 'Illustrator', 'Canva Pro', 'Meta Ads', 'Google Ads', 'YouTube Ads', 'Google Analytics', 'SEMrush', 'Andromeda AI', 'Midjourney'];

const timeline = [
  { year: 'Foundation', title: 'RahulDesigns Founded' },
  { year: 'Growth', title: 'First 10 Clients' },
  { year: 'Scale', title: '25+ Projects Delivered' },
  { year: 'Today', title: 'Premium Growth Studio' },
];
/* ─── NEON IMAGE WITH MOUSE TILT ─── */
function NeonImageCard() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);
  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, perspective: 800 }}
      className="card-3d image-placeholder rounded-2xl mx-auto relative overflow-hidden max-w-4xl w-full flex justify-center cursor-default"
    >
      {/* Soft glow that follows cursor */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent-purple/20 blur-[100px] pointer-events-none z-0"
        style={{ left: glowX, top: glowY, translateX: '-50%', translateY: '-50%' }}
      />
      <Image 
        src="/images/rahul-neon-profile.png" 
        alt="Rahul Designs Profile" 
        width={1200}
        height={1200}
        className="w-full h-auto object-contain opacity-90 mx-auto relative z-10" 
      />
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 mx-auto">
          <AnimatedSection animation="scaleUp">
            <div className="text-center">
              <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">About</span>
              <h1 className="section-heading text-4xl md:text-6xl font-bold font-[var(--font-heading)] text-white">
                The Mind Behind <span className="gradient-text">Rahul Designs</span>
              </h1>
            </div>
          </AnimatedSection>

          {/* Two-column: Image + Bio */}
          <div className="section-content-grid flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 w-full max-w-6xl mx-auto">
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
                  <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">Founder &amp; Creative Director</span>
                  <h2 className="section-heading text-3xl md:text-4xl font-bold font-[var(--font-heading)] text-white">Rahul Iniyan</h2>
                  <p className="section-subtext text-muted text-base leading-relaxed">
                    I&apos;m a designer and marketing strategist who believes that great design isn&apos;t just about looking good &mdash; it&apos;s about <strong className="text-white">driving real results</strong>. Every pixel I place, every campaign I craft, is engineered to convert attention into action.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    My passion lies at the intersection of <strong className="text-accent-cyan">creative design</strong> and <strong className="text-accent-blue">data-driven marketing</strong>. I obsess over the details because I know that&apos;s where the magic happens &mdash; the subtle gradient that keeps eyes on the page, the headline that makes someone stop scrolling.
                  </p>
                </div>

                {/* Highlight cards */}
                <div className="grid grid-cols-2 gap-6 mt-4">
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
                <div className="flex items-center gap-6 mt-4 pt-6 border-t border-white/5">
                  <AboutCounter value={25} suffix="+" label="Projects" />
                  <div className="w-px h-8 bg-white/10" />
                  <AboutCounter value={10} suffix="+" label="Industries" />
                  <div className="w-px h-8 bg-white/10" />
                  <AboutCounter value={98} suffix="%" label="Satisfaction" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 mx-auto">
          <AnimatedSection animation="fadeDown" className="text-center">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">Expertise</span>
            <h2 className="section-heading text-3xl font-bold font-[var(--font-heading)] text-white">Skills</h2>
          </AnimatedSection>

          <div className="section-content-grid flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 w-full mx-auto">
            {/* Left: Shorter Progress Bars */}
            <AnimatedSection animation="fadeRight" className="w-full md:w-auto flex justify-center order-2 md:order-1">
              <div className="space-y-6 w-full max-w-[450px] md:w-[450px]">
                {skills.map((s, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-white font-medium">{s.name}</span>
                      <span className="text-accent-blue font-semibold">{s.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: false }}
                        transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right: 3D Animated Object */}
            <AnimatedSection animation="fadeLeft" className="w-full md:w-auto flex justify-center order-1 md:order-2 mb-10 md:mb-0">
              <div className="w-full max-w-[380px] md:w-[380px] aspect-square relative">
                <DigitalOrbitSphere />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6 text-center">
          <AnimatedSection animation="scaleUp">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan">Journey</span>
            <h2 className="section-heading text-3xl font-bold font-[var(--font-heading)] text-white">Timeline</h2>
          </AnimatedSection>
          <div className="section-content-grid flex flex-wrap justify-center gap-6">
            {timeline.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="scaleUp">
                <motion.div whileHover={{ y: -4, scale: 1.05 }} className="gradient-card p-4 w-40 sm:w-48 h-28 sm:h-32 flex flex-col justify-center items-center text-center cursor-default">
                  <div className="relative z-10 w-full">
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
      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 text-center mx-auto">
          <AnimatedSection animation="fadeDown">
            <span className="section-label text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">Stack</span>
            <h2 className="section-heading text-3xl font-bold font-[var(--font-heading)] text-white">Tools We Use</h2>
          </AnimatedSection>
          <AnimatedSection animation="scaleUp" className="section-content-grid">
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

      {/* Workspace - Mouse-reactive neon image */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] px-6 text-center mx-auto">
          <AnimatedSection animation="scaleUp" className="w-full flex justify-center">
            <NeonImageCard />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
