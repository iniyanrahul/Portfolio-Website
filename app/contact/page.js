'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const contacts = [
  { 
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    ),
    label: 'WhatsApp', 
    value: '+91 87783 14030', 
    href: 'https://wa.me/918778314030?text=Hi%20Rahul%2C%20I%27m%20interested%20in%20working%20together',
    color: 'hover:bg-green-500/10 hover:border-green-500/30'
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.62 6.77 6.98 6.97 1.281.058 1.689.072 4.948.072 3.209 0 3.617-.014 4.898-.072 4.356-.2 6.777-2.62 6.977-6.97.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.62-6.77-6.98-6.97C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
    ),
    label: 'Instagram', 
    value: '@dark__introvert', 
    href: 'https://www.instagram.com/dark__introvert?igsh=b3Y5OHltNTd2MWEz',
    color: 'hover:bg-pink-500/10 hover:border-pink-500/30'
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
    ),
    label: 'Email', 
    value: 'iniyanrahul07@gmail.com', 
    href: 'mailto:iniyanrahul07@gmail.com',
    color: 'hover:bg-accent-blue/10 hover:border-accent-blue/30'
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Rahul, I'm ${form.name}.%0AService: ${form.service}%0A%0A${form.message}%0AEmail: ${form.email}`;
    window.open(`https://wa.me/918778314030?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-purple/10 blur-[120px] rounded-full" />
        
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection animation="scaleUp">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-6 block">Ready to Grow?</span>
              <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-heading)] text-white mb-6 leading-tight">
                Let&apos;s Build Your <span className="gradient-text">Legacy</span>
              </h1>
              <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                Whether you need a high-converting brand system or a data-driven marketing strategy, I&apos;m here to turn your vision into a digital powerhouse.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32">
        <div className="w-[95vw] lg:w-[90vw] max-w-[2000px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Visuals & Info */}
            <div className="lg:col-span-5 space-y-12">
              <AnimatedSection animation="fadeLeft" className="relative">
                <div className="card-3d rounded-3xl overflow-hidden shadow-2xl shadow-accent-blue/10 bg-black/40 border border-white/5">
                  <div className="relative aspect-[4/5] w-full">
                    <Image 
                      src="/images/contact-hero.png" 
                      alt="Contact Visual" 
                      fill 
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    {/* Floating Info Overlays */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-8 left-8 right-8 p-6 glass border-white/10 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">Response Time</div>
                          <div className="text-accent-cyan text-xs">Usually within 2-4 hours</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Interaction Points */}
              <div className="grid grid-cols-1 gap-4">
                {contacts.map((c, i) => (
                  <AnimatedSection key={c.label} delay={i * 0.1} animation="fadeLeft">
                    <motion.a 
                      href={c.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className={`flex items-center gap-5 p-5 rounded-2xl bg-white/3 border border-white/5 transition-all duration-300 group ${c.color}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted group-hover:text-white transition-colors">
                        {c.icon}
                      </div>
                      <div>
                        <div className="text-xs text-muted-dark uppercase tracking-wider font-semibold mb-0.5">{c.label}</div>
                        <div className="text-white text-base font-medium">{c.value}</div>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </motion.a>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <AnimatedSection delay={0.2} animation="fadeRight">
                <div className="relative group">
                  {/* Decorative corner glows */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-purple/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="glass p-6 md:p-14 relative z-10 border-white/5 bg-black/40">
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold font-[var(--font-heading)] text-white mb-2">Project Inquiry</h3>
                      <p className="text-muted text-sm">Fill out the form below and I&apos;ll get back to you shortly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-dark font-bold px-1">Full Name</label>
                          <div className={`relative transition-all duration-300 ${activeInput === 'name' ? 'scale-[1.02]' : ''}`}>
                            <input 
                              type="text" required 
                              value={form.name} 
                              onFocus={() => setActiveInput('name')}
                              onBlur={() => setActiveInput(null)}
                              onChange={e => setForm({...form, name: e.target.value})}
                              className="w-full bg-white/3 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all" 
                              placeholder="John Doe" 
                            />
                            {activeInput === 'name' && (
                              <motion.div layoutId="input-glow" className="absolute -inset-[1px] rounded-2xl border border-accent-blue/30 pointer-events-none" />
                            )}
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-dark font-bold px-1">Email Address</label>
                          <div className={`relative transition-all duration-300 ${activeInput === 'email' ? 'scale-[1.02]' : ''}`}>
                            <input 
                              type="email" required 
                              value={form.email} 
                              onFocus={() => setActiveInput('email')}
                              onBlur={() => setActiveInput(null)}
                              onChange={e => setForm({...form, email: e.target.value})}
                              className="w-full bg-white/3 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all" 
                              placeholder="john@example.com" 
                            />
                            {activeInput === 'email' && (
                              <motion.div layoutId="input-glow" className="absolute -inset-[1px] rounded-2xl border border-accent-blue/30 pointer-events-none" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-dark font-bold px-1">Service Required</label>
                        <div className="relative">
                          <select 
                            value={form.service} 
                            onFocus={() => setActiveInput('service')}
                            onBlur={() => setActiveInput(null)}
                            onChange={e => setForm({...form, service: e.target.value})}
                            className="w-full bg-white/3 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-black">Select a service</option>
                            <option value="Lead Generation" className="bg-black">Lead Generation</option>
                            <option value="Paid Ads" className="bg-black">Paid Advertising</option>
                            <option value="Brand Identity" className="bg-black">Brand Identity</option>
                            <option value="Website Design" className="bg-black">Website Design</option>
                            <option value="Social Media Strategy" className="bg-black">Social Media Strategy</option>
                            <option value="Full Digital Marketing" className="bg-black">Full Digital Marketing</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-dark font-bold px-1">Project Details</label>
                        <textarea 
                          rows={4} 
                          value={form.message} 
                          onFocus={() => setActiveInput('message')}
                          onBlur={() => setActiveInput(null)}
                          onChange={e => setForm({...form, message: e.target.value})}
                          className="w-full bg-white/3 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all resize-none" 
                          placeholder="Briefly describe your goals and timeline..." 
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <motion.button 
                          type="submit" 
                          whileHover={{ scale: 1.02, y: -2 }} 
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-5 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-white font-bold text-sm shadow-xl shadow-accent-blue/20 hover:shadow-accent-blue/40 transition-all flex items-center justify-center gap-3"
                        >
                          {sent ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Opening WhatsApp...</motion.span>
                          ) : (
                            <>
                              <span>Start the Conversation</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </>
                          )}
                        </motion.button>
                        <p className="text-center text-[10px] text-muted-dark mt-6 uppercase tracking-[0.2em] font-bold">
                          Encrypted &amp; Secure Direct Contact
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
