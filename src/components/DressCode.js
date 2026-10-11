'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shirt } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

export default function DressCode() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
      boxShadow: shouldReduceMotion
        ? '0 0 20px rgba(255, 255, 255, 0.5)'
        : [
            '0 0 20px rgba(255, 255, 255, 0.5)',
            '0 0 40px rgba(255, 255, 255, 0.8)',
            '0 0 20px rgba(255, 255, 255, 0.5)',
          ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col items-center"
        >
          {/* Section Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14"
          >
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-white/50" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-center text-white/90">
              DRESS CODE
            </h2>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-white/50" />
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-lg backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full">
              {/* Decorative Hanger/Icon */}
              <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 text-white/70">
                <Shirt size={28} strokeWidth={1.5} className="sm:w-8 sm:h-8" />
              </div>

              {/* Color Swatch / Visual representation */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-6 sm:mb-8 relative border-4 border-white/20"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-80 blur-md"></div>
                <span className="relative z-10 text-black/20 font-bold text-xs sm:text-sm tracking-widest">
                  WHITE
                </span>
              </motion.div>

              {/* Text */}
              <h3 className="text-3xl sm:text-4xl font-black tracking-widest text-white mb-3 sm:mb-4 drop-shadow-md text-center">
                WHITE
              </h3>

              <p className="text-center text-base sm:text-lg text-white/70 max-w-xs leading-relaxed">
                Please wear white attire to match our party theme
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}