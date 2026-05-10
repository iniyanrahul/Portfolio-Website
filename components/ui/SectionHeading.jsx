'use client';
import AnimatedSection from './AnimatedSection';

export default function SectionHeading({ label, title, description, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  
  return (
    <AnimatedSection className={`max-w-3xl mb-16 ${alignClass}`}>
      {label && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-white leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-lg leading-relaxed">
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
