'use client';
import { motion } from 'framer-motion';

const variants = {
  fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  fadeDown: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  fadeLeft: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scaleUp: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  rotate: { hidden: { opacity: 0, rotate: -5, scale: 0.95 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
};

export default function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeUp' }) {
  const v = variants[animation] || variants.fadeUp;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={v}
      className={className}
    >
      {children}
    </motion.div>
  );
}
