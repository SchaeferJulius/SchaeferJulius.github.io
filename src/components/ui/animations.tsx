import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

export const FadeIn = ({ children, delay = 0, className = '', direction = 'up', viewport = { once: true, margin: "-10%" } }: any) => {
  const yOffset = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
  const xOffset = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{ 
        duration: 1.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.6, delay } // Faster blur reveal
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const WordReveal = ({ text, delay = 0, className = '' }: any) => {
  const words = text.split(' ');
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } }
      }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word: string, i: number) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] pb-2 -mb-2">
          <motion.span
            variants={{
              hidden: { y: '120%', opacity: 0, filter: 'blur(8px)' },
              visible: { 
                y: 0, 
                opacity: 1, 
                filter: 'blur(0px)', 
                transition: { 
                  duration: 1.8, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 0.6 } // Faster blur reveal for words
                } 
              }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export const AnimatedNumber = ({ value, delay = 0, className = '', prefix = '', suffix = '', decimals = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const spring = useSpring(0, { bounce: 0, duration: 4000 });
  const display = useTransform(spring, (current) => {
    return current.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
    }
  }, [isInView, spring, value, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}<motion.span>{display}</motion.span>{suffix}
    </span>
  );
};

export const AmbientBackground = () => {
  // Use a fixed seed for hydration matching if needed, but random is fine for client-side
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 15
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-black/10"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -200],
            x: [0, Math.random() * 60 - 30],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
