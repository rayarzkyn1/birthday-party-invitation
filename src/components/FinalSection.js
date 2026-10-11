'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  PartyPopper,
  Sparkles,
  Cake,
  Gift,
  Crown,
  Star,
} from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';
import { useEffect, useState } from 'react';

// Balloon SVG custom
function Balloon({ className, size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a6 7 0 0 0-6 7c0 4 3 7 6 7s6-3 6-7a6 7 0 0 0-6-7Z" />
      <path d="M12 16v2" />
      <path d="M10 20c0 1 .9 2 2 2s2-1 2-2" />
    </svg>
  );
}

export default function FinalSection() {
  const { fullName, nickname, age } = birthdayConfig.person;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches); // eslint-disable-line react-hooks/set-state-in-effect -- initial sync of external media query state

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Generate confetti on client only to avoid hydration mismatch
  useEffect(() => {
    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      color: [
        'bg-pink-500',
        'bg-purple-500',
        'bg-yellow-400',
        'bg-blue-400',
        'bg-teal-400',
      ][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setConfetti(items); // eslint-disable-line react-hooks/set-state-in-effect -- one-time init of random client-only data to avoid hydration mismatch
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* ====== FINAL CELEBRATION SECTION ====== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-950 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 text-white">
        {/* Subtle Divider at Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-[calc(145%+1.3px)] h-[50px] -ml-[22%] sm:-ml-0 sm:w-full"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-purple-950"
            ></path>
          </svg>
        </div>

        {/* Background Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-[5%] w-[300px] h-[300px] rounded-full bg-pink-500/15 blur-[100px]" />
          <div className="absolute bottom-1/4 right-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/15 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[140px]" />
        </div>

        {/* Floating Confetti — hanya render setelah mounted */}
        {!prefersReducedMotion &&
          confetti.map((c) => (
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
                ease: 'linear',
              }}
            />
          ))}

        {/* Floating Birthday Icons */}
        {!prefersReducedMotion && (
          <>
            {/* Balloons kiri atas */}
            <motion.div
              className="absolute top-32 left-[6%] text-pink-400 opacity-50 hidden sm:block"
              animate={{ y: [0, -18, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Balloon size={36} />
            </motion.div>
            <motion.div
              className="absolute top-48 left-[14%] text-purple-400 opacity-40 hidden md:block"
              animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Balloon size={28} />
            </motion.div>

            {/* Balloons kanan atas */}
            <motion.div
              className="absolute top-36 right-[6%] text-purple-400 opacity-50 hidden sm:block"
              animate={{ y: [0, -22, 0], rotate: [6, -6, 6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Balloon size={32} />
            </motion.div>
            <motion.div
              className="absolute top-52 right-[14%] text-cyan-300 opacity-40 hidden md:block"
              animate={{ y: [0, -12, 0], rotate: [-8, 8, -8] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <Balloon size={26} />
            </motion.div>

            {/* Cake kiri bawah */}
            <motion.div
              className="absolute bottom-32 left-[8%] text-pink-400 opacity-50 hidden sm:block"
              animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Cake size={34} />
            </motion.div>

            {/* Gift kanan bawah */}
            <motion.div
              className="absolute bottom-40 right-[8%] text-purple-400 opacity-50 hidden sm:block"
              animate={{ y: [0, -12, 0], rotate: [3, -3, 3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Gift size={34} />
            </motion.div>

            {/* Crown kanan tengah */}
            <motion.div
              className="absolute top-1/2 right-[5%] text-yellow-300 opacity-40 hidden lg:block"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Crown size={30} />
            </motion.div>

            {/* Party Popper kiri tengah */}
            <motion.div
              className="absolute top-1/2 left-[5%] text-yellow-300 opacity-40 hidden lg:block"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <PartyPopper size={30} />
            </motion.div>

            {/* Hearts */}
            <motion.div
              className="absolute top-1/3 left-[22%] text-pink-500 opacity-30 hidden md:block"
              animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={18} fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-[22%] text-purple-400 opacity-30 hidden md:block"
              animate={{ y: [0, -12, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.div>

            {/* Stars */}
            <motion.div
              className="absolute top-1/4 right-[25%] text-yellow-300 opacity-50 hidden md:block"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={18} fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 left-[25%] text-pink-300 opacity-40 hidden md:block"
              animate={{ scale: [1, 1.4, 1], rotate: [0, -180, -360] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 0.8 }}
            >
              <Star size={16} fill="currentColor" />
            </motion.div>

            {/* Sparkles kecil di beberapa titik */}
            <motion.div
              className="absolute top-2/3 left-[3%] text-cyan-300 opacity-40 hidden sm:block"
              animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 180] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={20} />
            </motion.div>
            <motion.div
              className="absolute top-1/4 right-[3%] text-pink-300 opacity-40 hidden sm:block"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, -180] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Sparkles size={22} />
            </motion.div>
          </>
        )}

        <motion.div
          className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center flex flex-col items-center justify-center min-h-[50vh]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Top decorative icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 sm:gap-4 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-300" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Cake className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <Gift className="w-7 h-7 sm:w-9 sm:h-9 text-purple-300" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            >
              <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-300" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight [text-shadow:0_0_20px_rgba(236,72,153,0.8),0_0_40px_rgba(236,72,153,0.4)] text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 px-2"
          >
            SEE YOU AT THE PARTY!
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl font-medium mb-8 text-purple-200 px-4"
          >
            Let&apos;s celebrate together 🎉
          </motion.p>

          {/* Signature dengan ornamen */}
          <motion.div
            variants={itemVariants}
            className="relative inline-flex items-center gap-3 sm:gap-5 mt-6 sm:mt-8 mb-12 sm:mb-16 px-4"
          >
            {/* Left ornament */}
            <div className="flex items-center gap-2">
              <Heart
                className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 fill-pink-400"
              />
              <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-pink-400/60" />
            </div>

            {/* Name */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-script text-pink-300 italic px-3 sm:px-6 py-3 sm:py-4 border-y-2 border-pink-500/30 inline-block whitespace-nowrap">
              {fullName}
            </span>

            {/* Right ornament */}
            <div className="flex items-center gap-2">
              <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-pink-400/60" />
              <Heart
                className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 fill-pink-400"
              />
            </div>
          </motion.div>

          {/* Quote / Made with love */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-4 max-w-2xl mx-auto"
          >
            {/* Small hearts decoration */}
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            </div>

            <p className="text-base sm:text-lg md:text-xl font-semibold text-center px-6 leading-relaxed">
              <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]">
                &ldquo;Counting down to celebrating with wonderful people! Bring
                your good energy and let&apos;s make sweet memories
                together.&rdquo;
              </span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-gradient-to-b from-indigo-950 to-black pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Horizontal Line */}
          <div className="h-0.5 w-full bg-black/70 mb-5 sm:mb-6" />

          {/* Footer Text */}
          <p className="text-center text-white/80 text-xs sm:text-sm tracking-wide">
            © {currentYear} Raya Rizkyana. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}