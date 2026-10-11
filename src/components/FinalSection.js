'use client';

import { motion } from 'framer-motion';
import { Heart, PartyPopper, Sparkles } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';
import { useEffect, useState } from 'react';

export default function FinalSection() {
  const { fullName, nickname, age } = birthdayConfig.person;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Generate random confetti elements
  const confetti = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 15 + 5,
    color: ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-blue-400', 'bg-teal-400'][Math.floor(Math.random() * 5)],
    shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-950 py-24 text-white">
      {/* Subtle Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-[calc(145%+1.3px)] h-[50px] -ml-[22%] sm:-ml-0 sm:w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-950"></path>
        </svg>
      </div>

      {/* Floating Confetti */}
      {!prefersReducedMotion && confetti.map((c) => (
        <motion.div
          key={c.id}
          className={`absolute ${c.color} ${c.shape} opacity-40`}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "linear"
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center min-h-[50vh]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="flex gap-4 mb-6">
          <Sparkles className="w-10 h-10 text-yellow-300" />
          <PartyPopper className="w-10 h-10 text-pink-400" />
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight [text-shadow:0_0_20px_rgba(236,72,153,0.8),0_0_40px_rgba(236,72,153,0.4)] text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
        >
          SEE YOU AT THE PARTY!
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-medium mb-8 text-purple-200"
        >
          Let's celebrate together 🎉
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="relative inline-block mt-8 mb-16"
        >
          <span className="text-4xl md:text-5xl font-script text-pink-300 italic px-8 py-4 border-y-2 border-pink-500/30">
            {fullName}
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-purple-300/70"
        >
          <span>Made with</span>
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>for {nickname}&apos;s {age}th Birthday</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
