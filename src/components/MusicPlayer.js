'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'

export default function MusicPlayer({ shouldPlay = false, onPlayStateChange }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const musicSrc = birthdayConfig.music.src

  useEffect(() => {
    const audio = new Audio(musicSrc)
    audio.loop = true
    audioRef.current = audio

    const handleCanPlayThrough = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = () => {
      console.warn('Audio failed to load:', musicSrc)
      setHasError(true)
      setIsLoaded(false)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [musicSrc])

  const togglePlay = useCallback(() => {
    if (hasError || !isLoaded) return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      onPlayStateChange?.(false)
    } else {
      audioRef.current?.play().then(() => {
        setIsPlaying(true)
        onPlayStateChange?.(true)
      }).catch(err => {
        console.error('Playback failed:', err)
        setHasError(true)
      })
    }
  }, [isPlaying, hasError, isLoaded, onPlayStateChange])

  useEffect(() => {
    if (shouldPlay && isLoaded && !isPlaying && !hasError) {
      togglePlay()
    }
  }, [shouldPlay, isLoaded, isPlaying, hasError, togglePlay])

  const toggleMute = (e) => {
    e.stopPropagation()
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const barVariants = {
    playing: {
      height: ["4px", "16px", "4px"],
      transition: {
        repeat: Infinity,
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    paused: {
      height: "4px",
      transition: { duration: 0.2 }
    }
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Secondary Controls (Mute/Unmute) */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: showControls ? 1 : 0, 
          y: showControls ? 0 : 10,
          scale: showControls ? 1 : 0.8 
        }}
        className="pointer-events-auto"
      >
        <button
          onClick={toggleMute}
          disabled={hasError}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg disabled:opacity-50 motion-reduce:transition-none"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </motion.div>

      {/* Main Play/Pause Button */}
      <motion.button
        whileHover={!hasError ? { scale: 1.1 } : {}}
        whileTap={!hasError ? { scale: 0.95 } : {}}
        onClick={togglePlay}
        disabled={hasError}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] border-2 border-white/30 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed group transition-shadow hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] motion-reduce:transition-none motion-reduce:transform-none"
      >
        {/* Error Indicator */}
        {hasError && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900" title="Audio failed to load" />
        )}

        {!hasError && !isLoaded && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin motion-reduce:animate-none" />
        )}

        {isLoaded && !hasError && (
          isPlaying ? (
            <div className="flex items-end gap-1 h-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={barVariants}
                  initial="paused"
                  animate="playing"
                  style={{
                    backgroundColor: '#0ff',
                    width: '3px',
                    borderRadius: '2px',
                    boxShadow: '0 0 5px #0ff'
                  }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          ) : (
            <Play fill="currentColor" className="text-white ml-1" size={24} />
          )
        )}
      </motion.button>
    </div>
  )
}
