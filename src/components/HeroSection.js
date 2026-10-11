'use client';

import { motion } from 'framer-motion';
import { PartyPopper, Cake, Stars } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';
import { useMemo, useState, useEffect } from 'react';

export default function HeroSection({ guestName = 'FRIEND' }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- one-time mount guard for client-only random data
  }, []);

  // Generate particles only once after mount (client-side only for hydration safety)
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, [isMounted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a0ca3] via-[#240046] to-[#10002b] px-4 py-20 sm:py-24 md:py-32">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-40 shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="mb-4 sm:mb-6 flex flex-col items-center"
        >
          <Stars className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 mb-2 animate-pulse" />
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] tracking-widest uppercase text-center break-words px-2">
            HEY, {guestName}!
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-2xl text-purple-200 mb-8 sm:mb-10 md:mb-12 font-light tracking-wide"
        >
          You are invited to
        </motion.p>

        {/* Main Title with decorative icons */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 sm:mb-10 md:mb-12 w-full flex justify-center items-center"
        >
          {/* Left icon — hanya tampil di md+ biar tidak keluar layar mobile */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="hidden md:block absolute -left-16 -top-16 text-pink-400"
          >
            <PartyPopper
              size={56}
              className="md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(244,114,182,1)]"
            />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] via-[#FF007F] to-[#00FFFF] drop-shadow-[0_0_25px_rgba(255,0,127,0.7)] text-center leading-tight py-4 px-2">
            WIYANA&apos;S <br /> 24TH BIRTHDAY
          </h1>

          {/* Right icon — hanya tampil di md+ */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="hidden md:block absolute -right-16 -bottom-10 text-cyan-400"
            style={{ animationDelay: '1.5s' }}
          >
            <Cake
              size={56}
              className="md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(0,255,255,1)]"
            />
          </motion.div>
        </motion.div>

        {/* Event type */}
        <motion.div variants={itemVariants}>
          <p className="text-base sm:text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 tracking-[0.3em] sm:tracking-[0.5em] uppercase mt-4 sm:mt-6 text-center">
            NIGHT PARTY
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}