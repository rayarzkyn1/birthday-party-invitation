'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

export default function OpeningScreen({ onOpen, guestName = "Guest" }) {
  const [particles, setParticles] = useState([]);

  // Generate random particles hanya di client-side untuk menghindari hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5
    }));
    setParticles(generatedParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#170D2B] overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400 opacity-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.4)'
          }}
          animate={{
            y: ['0%', '-50%', '0%'],
            x: ['0%', '20%', '0%'],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Decorative Floating Elements */}
      <motion.div 
        className="absolute top-24 left-1/4 text-pink-500 opacity-60"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star size={24} fill="currentColor" />
      </motion.div>
      <motion.div 
        className="absolute bottom-32 right-1/4 text-purple-400 opacity-60"
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, -180] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={32} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <motion.p 
          variants={itemVariants}
          className="text-purple-300 tracking-[0.25em] text-sm md:text-base font-light mb-4 uppercase"
        >
          You're Invited To
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-2 leading-tight py-2"
          style={{ 
            textShadow: '0 0 25px rgba(236,72,153,0.5), 0 0 50px rgba(168,85,247,0.4)',
            filter: 'drop-shadow(0px 0px 10px rgba(236,72,153,0.3))'
          }}
        >
          WIYANA'S 24TH BIRTHDAY
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-widest"
          style={{
            textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3)'
          }}
        >
          NIGHT PARTY
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="mb-14 bg-white/5 backdrop-blur-md border border-purple-500/30 px-10 py-5 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)]"
        >
          <p className="text-purple-200 font-medium italic text-xl">
            Dear, <span className="text-pink-400 font-bold not-italic ml-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">{guestName}</span>
          </p>
        </motion.div>
        
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="relative group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-bold text-white text-lg md:text-xl tracking-wider overflow-hidden transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)]"
        >
          <motion.div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          />
          <motion.span 
            className="relative z-10 flex items-center gap-3"
            animate={{ textShadow: ['0 0 5px rgba(255,255,255,0.5)', '0 0 15px rgba(255,255,255,0.8)', '0 0 5px rgba(255,255,255,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Open Invitation <Sparkles size={22} className="text-pink-200" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}