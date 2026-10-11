'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScreen from '@/components/OpeningScreen';
import HeroSection from '@/components/HeroSection';
import Countdown from '@/components/Countdown';
import EventDetails from '@/components/EventDetails';
import DressCode from '@/components/DressCode';
import Gallery from '@/components/Gallery';
import RsvpSection from '@/components/RsvpSection';
import FinalSection from '@/components/FinalSection';
import MusicPlayer from '@/components/MusicPlayer';
import SectionDivider from '@/components/SectionDivider';
import { birthdayConfig } from '@/lib/birthday-config';
import GiftSection from '@/components/GiftSection';

export default function BirthdayInvitation({ guestName = 'Special Guest' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShouldPlayMusic(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="opening"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <OpeningScreen guestName={guestName} onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          {/* Decorative background gradient orbs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-electric-purple/10 blur-[120px]" />
            <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-hot-pink/10 blur-[120px]" />
            <div className="absolute top-[70%] left-[20%] w-[300px] h-[300px] rounded-full bg-neon-cyan/8 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <HeroSection guestName={guestName} />

            <SectionDivider variant="sparkles" />

            {/* Invitation Card Section */}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="invitation-card text-center"
                >
                  <p className="text-soft-white/60 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
                    Birthday Invitation
                  </p>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-soft-white mb-4 sm:mb-6 font-[family-name:var(--font-display)]">
                    Dear,{' '}
                    <span className="neon-text-gradient">{guestName}</span>
                  </h3>

                  <p className="text-soft-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                    You are invited to{' '}
                    <span className="text-electric-purple font-semibold">
                      {birthdayConfig.person.nickname}&apos;s
                    </span>{' '}
                    {birthdayConfig.event.name}.
                  </p>

                  <p className="text-soft-white/60 text-xs sm:text-sm mt-4 sm:mt-6 max-w-md mx-auto">
                    We would be honored by your presence at this special
                    celebration. 🎂
                  </p>
                </motion.div>
              </div>
            </section>

            <SectionDivider variant="balloons" />

            {/* Remaining Sections */}
            <Countdown />

            <SectionDivider variant="stars" />

            <EventDetails />

            <SectionDivider variant="confetti" />

            <DressCode />

            <SectionDivider variant="cake" />

            
            <Gallery />

            <SectionDivider variant="sparkles" />

            <GiftSection /> 

            <RsvpSection />

            <FinalSection />
          </div>

          {/* Music Player */}
          <MusicPlayer shouldPlay={shouldPlayMusic} />
        </motion.main>
      )}
    </>
  );
}