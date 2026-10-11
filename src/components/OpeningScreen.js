'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Star,
  Cake,
  Gift,
  PartyPopper,
  Crown,
  Heart,
} from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

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

export default function OpeningScreen({ onOpen, guestName = 'Guest' }) {
  const [particles, setParticles] = useState([]);
  const [stage, setStage] = useState('closed'); // 'closed' | 'opening' | 'zooming'

  // Generate random particles hanya di client-side
  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles); // eslint-disable-line react-hooks/set-state-in-effect -- one-time init of random client-only data to avoid hydration mismatch
  }, []);

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');

    // Step 1: amplop terbuka (0.9s)
    // Step 2: surat keluar + zoom (0.6s)
    // Step 3: panggil onOpen
    setTimeout(() => {
      setStage('zooming');
    }, 900);

    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#170D2B] overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* ===== BACKGROUND PARTICLES ===== */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400 opacity-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.4)',
          }}
          animate={{
            y: ['0%', '-50%', '0%'],
            x: ['0%', '20%', '0%'],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* ===== BURST PARTICLES saat amplop dibuka ===== */}
      <AnimatePresence>
        {stage !== 'closed' && (
          <>
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const distance = 200 + Math.random() * 100;
              const colors = [
                '#FF4FA3',
                '#8B5CF6',
                '#38E8FF',
                '#FFE66D',
                '#ec4899',
              ];
              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 6 + Math.random() * 6,
                    height: 6 + Math.random() * 6,
                    background: colors[i % colors.length],
                    top: '50%',
                    left: '50%',
                    boxShadow: `0 0 15px 3px ${colors[i % colors.length]}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.02,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* ===== FLOATING BIRTHDAY DECORATIONS ===== */}
      {/* Balloons kiri atas */}
      <motion.div
        className="absolute top-16 left-[8%] text-pink-400 opacity-70"
        animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Balloon size={44} />
      </motion.div>
      <motion.div
        className="absolute top-32 left-[18%] text-purple-400 opacity-60"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Balloon size={32} />
      </motion.div>
      <motion.div
        className="absolute top-20 left-[28%] text-cyan-300 opacity-50 hidden sm:block"
        animate={{ y: [0, -25, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Balloon size={28} />
      </motion.div>

      {/* Balloons kanan atas */}
      <motion.div
        className="absolute top-20 right-[8%] text-purple-400 opacity-70"
        animate={{ y: [0, -22, 0], rotate: [6, -6, 6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Balloon size={40} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[18%] text-pink-500 opacity-60"
        animate={{ y: [0, -18, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <Balloon size={34} />
      </motion.div>
      <motion.div
        className="absolute top-24 right-[28%] text-yellow-300 opacity-50 hidden sm:block"
        animate={{ y: [0, -20, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <Balloon size={26} />
      </motion.div>

      {/* Cake kiri bawah */}
      <motion.div
        className="absolute bottom-24 left-[10%] text-pink-400 opacity-70"
        animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cake size={36} />
      </motion.div>

      {/* Gift kanan bawah */}
      <motion.div
        className="absolute bottom-32 right-[12%] text-purple-400 opacity-70"
        animate={{ y: [0, -12, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Gift size={36} />
      </motion.div>

      {/* Party popper */}
      <motion.div
        className="absolute top-1/2 left-[6%] text-yellow-300 opacity-60 hidden md:block"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PartyPopper size={40} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[6%] text-cyan-300 opacity-60 hidden md:block"
        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <PartyPopper size={38} />
      </motion.div>

      {/* Crown */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-yellow-300 opacity-80"
        animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Crown size={32} />
      </motion.div>

      {/* Stars & Sparkles */}
      <motion.div
        className="absolute top-24 left-1/3 text-pink-500 opacity-60"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Star size={20} fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/4 text-purple-400 opacity-60"
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, -180] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles size={28} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-1/4 text-pink-400 opacity-50"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      >
        <Sparkles size={22} />
      </motion.div>

      {/* Hearts */}
      <motion.div
        className="absolute top-1/2 right-[20%] text-pink-500 opacity-40 hidden lg:block"
        animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={20} fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-[22%] text-purple-500 opacity-40 hidden lg:block"
        animate={{ y: [0, -12, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        animate={
          stage === 'zooming'
            ? { scale: 2.5, opacity: 0, filter: 'blur(20px)' }
            : { scale: 1, opacity: 1 }
        }
        transition={{
          duration: 0.8,
          ease: [0.6, 0.01, 0.05, 0.95],
        }}
      >
        {/* Top decoration */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-pink-400/60" />
          <Cake size={20} className="text-pink-400" />
          <Sparkles size={16} className="text-yellow-300" />
          <Cake size={20} className="text-purple-400" />
          <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-purple-400/60" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-purple-300 tracking-[0.25em] text-xs sm:text-sm md:text-base font-light mb-4 uppercase"
        >
          You&apos;re Invited To
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-2 leading-tight py-2 px-2"
          style={{
            textShadow:
              '0 0 25px rgba(236,72,153,0.5), 0 0 50px rgba(168,85,247,0.4)',
            filter: 'drop-shadow(0px 0px 10px rgba(236,72,153,0.3))',
          }}
        >
          WIYANA&apos;S 24TH BIRTHDAY
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-10 sm:mb-12 tracking-widest"
          style={{
            textShadow:
              '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3)',
          }}
        >
          NIGHT PARTY
        </motion.h2>

        {/* Guest name card */}
        <motion.div
          variants={itemVariants}
          className="mb-12 sm:mb-14 bg-white/5 backdrop-blur-md border border-purple-500/30 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)] max-w-full"
        >
          <p className="text-purple-200 font-medium italic text-lg sm:text-xl break-words">
            Dear,{' '}
            <span className="text-pink-400 font-bold not-italic ml-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
              {guestName}
            </span>
          </p>
        </motion.div>

        {/* ===== ENVELOPE BUTTON ===== */}
        <motion.div
          variants={itemVariants}
          className="relative"
          style={{ perspective: '1000px' }}
        >
          <motion.button
            onClick={handleOpen}
            disabled={stage !== 'closed'}
            whileHover={stage === 'closed' ? { scale: 1.05, y: -4 } : {}}
            whileTap={stage === 'closed' ? { scale: 0.97 } : {}}
            className="relative cursor-pointer disabled:cursor-default"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Envelope body */}
            <div className="relative w-64 sm:w-80 md:w-96 h-40 sm:h-48 md:h-56 rounded-xl shadow-[0_0_40px_rgba(236,72,153,0.4)] overflow-visible">
              {/* Envelope back (badan amplop) */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 border-2 border-pink-400/40" />

              {/* Envelope inner pattern (subtle) */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl" />
              </div>

              {/* ===== SURAT (keluar saat opening) ===== */}
              <AnimatePresence>
                {stage !== 'closed' && (
                  <motion.div
                    className="absolute left-4 right-4 top-2 bottom-2 rounded-lg bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 shadow-2xl flex items-center justify-center"
                    initial={{ y: 0, opacity: 0, scale: 0.9 }}
                    animate={{
                      y: -80,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ y: -200, opacity: 0, scale: 1.2 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4,
                      ease: [0.6, 0.01, 0.05, 0.95],
                    }}
                  >
                    <div className="text-center px-4">
                      <Cake size={32} className="text-purple-700 mx-auto mb-2" />
                      <p className="text-purple-900 font-bold text-sm sm:text-base">
                        You&apos;re Invited! 🎉
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===== ENVELOPE FLAP (segitiga atas) ===== */}
              <motion.div
                className="absolute top-0 left-0 right-0 origin-top pointer-events-none"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: 20,
                }}
                animate={
                  stage === 'closed'
                    ? { rotateX: 0 }
                    : { rotateX: -180 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
              >
                <svg
                  viewBox="0 0 100 60"
                  className="w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                  style={{ display: 'block' }}
                >
                  <defs>
                    <linearGradient id="flapGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,0 100,0 50,55"
                    fill="url(#flapGradient)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>

              {/* ===== FRONT POCKET (menutupi bagian bawah surat) ===== */}
              <div className="absolute bottom-0 left-0 right-0 h-3/4 z-10 pointer-events-none">
                <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pocketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6d28d9" />
                      <stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,20 50,55 100,20 100,60 0,60"
                    fill="url(#pocketGradient)"
                    stroke="rgba(236,72,153,0.4)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* ===== TEKS "OPEN INVITATION" DI TENGAH AMPLOP ===== */}
              <AnimatePresence>
                {stage === 'closed' && (
                  <motion.div
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Small sparkles top */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={20} className="text-yellow-300 drop-shadow-[0_0_10px_rgba(255,230,109,0.8)]" />
                    </motion.div>

                    {/* Main text */}
                    <motion.div
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(236,72,153,0.5)',
                          '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(236,72,153,0.8)',
                          '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(236,72,153,0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-widest uppercase drop-shadow-lg">
                        Open
                      </span>
                      <br />
                      <span className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-widest uppercase drop-shadow-lg">
                        Invitation
                      </span>
                    </motion.div>

                    {/* Small hint */}
                    <motion.p
                      className="text-white/80 text-xs italic mt-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      tap to open
                    </motion.p>

                    {/* Sparkles bottom */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], rotate: [0, -180, -360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Star size={16} className="text-pink-300 fill-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glow pulse ring di luar amplop */}
            {stage === 'closed' && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(236,72,153,0.5)',
                    '0 0 0 16px rgba(236,72,153,0)',
                    '0 0 0 0 rgba(236,72,153,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xs sm:text-sm text-purple-300/60 italic flex items-center gap-2"
        >
          <Gift size={14} />
          A special invitation awaits you inside
        </motion.p>
      </motion.div>

      {/* ===== ZOOM-THROUGH OVERLAY saat zooming ===== */}
      <AnimatePresence>
        {stage === 'zooming' && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 1] }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}