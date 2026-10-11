'use client';

import { useState, useEffect } from 'react';
import { birthdayConfig } from '@/lib/birthday-config';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPassed, setIsPassed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // The target date is 2026-10-19 21:00:00 (Asia/Jakarta)
    const eventDate = birthdayConfig.event.date;
    const targetDate = new Date(eventDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsPassed(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Prevent hydration mismatch by returning empty space until mounted on client
  if (!isClient) {
    return <div className="min-h-[300px] w-full" />;
  }

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14 text-center sm:text-left"
        >
          <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#38E8FF] shrink-0" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#FFF9F5] uppercase tracking-wider flex items-center gap-2 flex-wrap justify-center">
            Countdown to the Party
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#38E8FF] shrink-0" />
          </h2>
        </motion.div>

        {isPassed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-8 bg-white/10 backdrop-blur-md border border-[#38E8FF]/40 rounded-2xl text-center shadow-[0_4px_30px_rgba(56,232,255,0.1)] max-w-xl"
          >
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#38E8FF] drop-shadow-[0_0_8px_rgba(56,232,255,0.8)]">
              🎉 The party has started! 🎉
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full max-w-3xl"
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
              >
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#38E8FF] drop-shadow-[0_0_12px_rgba(56,232,255,0.6)] tabular-nums mb-2">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-[#FFF9F5] uppercase tracking-widest">
                  {unit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}