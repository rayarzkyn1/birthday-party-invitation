'use client';

import { motion } from 'framer-motion';
import { PartyPopper, Cake, Stars } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';
import { useEffect, useState } from 'react';

export default function HeroSection({ guestName = "FRIEND" }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a0ca3] via-[#240046] to-[#10002b]">
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
              opacity: [0.1, 0.7, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4 flex flex-col items-center">
          <Stars className="w-10 h-10 text-yellow-300 mb-2 animate-pulse" />
          <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] tracking-widest uppercase">
            HEY, {guestName}!
          </h2>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-purple-200 mb-6 font-light tracking-wide">
          You are invited to
        </motion.p>

        <motion.div variants={itemVariants} className="relative mb-8 w-full flex justify-center items-center">
          <motion.div 
            variants={floatVariants} 
            animate="animate" 
            className="absolute -left-6 md:-left-16 -top-12 md:-top-16 text-pink-400"
          >
            <PartyPopper size={56} className="md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(244,114,182,1)]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] via-[#FF007F] to-[#00FFFF] drop-shadow-[0_0_25px_rgba(255,0,127,0.7)] text-center leading-tight py-4">
            WIYANA&apos;S <br /> 24TH BIRTHDAY
          </h1>
          
          <motion.div 
            variants={floatVariants} 
            animate="animate" 
            className="absolute -right-6 md:-right-16 -bottom-10 text-cyan-400"
            style={{ animationDelay: '1.5s' }}
          >
            <Cake size={56} className="md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(0,255,255,1)]" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 tracking-[0.5em] uppercase mt-6">
            NIGHT PARTY
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
