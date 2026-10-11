'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ shouldPlay = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Coba play saat shouldPlay berubah jadi true
  useEffect(() => {
    if (!shouldPlay || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.5; // Volume awal 50%

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Sembunyikan hint setelah 4 detik pertama
          setTimeout(() => setShowHint(false), 4000);
        })
        .catch((err) => {
          // Browser block autoplay — user perlu klik manual
          console.warn('Autoplay blocked:', err);
          setIsPlaying(false);
        });
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowHint(false);
      }).catch((err) => {
        console.warn('Play failed:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleError = () => {
    setHasError(true);
    console.error('Audio file gagal dimuat. Cek path: /music/niki_every_summertime.mp3');
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/music/niki_every_summertime.mp3"
        loop
        preload="auto"
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating music button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
        {/* Hint bubble */}
        <AnimatePresence>
          {showHint && shouldPlay && !hasError && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              <Music className="w-3 h-3" />
              <span>Music playing 🎵</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume/mute button (muncul hanya saat playing) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Play/pause button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Rotating ring saat playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(236,72,153,0.5)',
                '0 0 0 12px rgba(236,72,153,0)',
                '0 0 0 0 rgba(236,72,153,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Music className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Error message */}
        {hasError && (
          <div className="text-xs text-red-400 bg-red-900/40 border border-red-500/40 px-3 py-2 rounded-lg max-w-[200px]">
            ⚠️ Musik gagal dimuat. Cek file di{' '}
            <code className="text-red-200">public/music/</code>
          </div>
        )}
      </div>
    </>
  );
}