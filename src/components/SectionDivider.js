'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reusable SectionDivider component for birthday invitation transitions.
 *
 * @param {Object} props
 * @param {'balloons' | 'confetti' | 'sparkles' | 'cake' | 'stars'} [props.variant='sparkles'] - Decorative style
 * @param {string} [props.className] - Additional CSS classes
 */
export default function SectionDivider({ variant = 'sparkles', className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`relative w-full py-8 sm:py-12 md:py-16 overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
        <div className="w-56 sm:w-80 h-16 sm:h-20 rounded-full bg-[#8B5CF6]/12 blur-2xl sm:blur-3xl transform -translate-x-10" />
        <div className="w-48 sm:w-72 h-14 sm:h-18 rounded-full bg-[#FF4FA3]/12 blur-2xl sm:blur-3xl" />
        <div className="w-56 sm:w-80 h-16 sm:h-20 rounded-full bg-[#38E8FF]/10 blur-2xl sm:blur-3xl transform translate-x-10" />
      </div>

      {/* Transparent Fading Gradient Layer (blends section backgrounds) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#170D2B]/40 to-transparent pointer-events-none" />

      {/* Central Gradient Line Divider */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center max-w-4xl mx-auto px-6">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/40 via-[#FF4FA3]/50 via-[#38E8FF]/40 to-transparent" />
      </div>

      {/* Decorative Content Container (~80-120px height band) */}
      <div className="relative max-w-4xl mx-auto h-20 sm:h-24 md:h-28 flex items-center justify-center px-4">
        {variant === 'balloons' && <BalloonsVariant shouldReduceMotion={shouldReduceMotion} />}
        {variant === 'confetti' && <ConfettiVariant shouldReduceMotion={shouldReduceMotion} />}
        {variant === 'cake' && <CakeVariant shouldReduceMotion={shouldReduceMotion} />}
        {variant === 'stars' && <StarsVariant shouldReduceMotion={shouldReduceMotion} />}
        {variant === 'sparkles' && <SparklesVariant shouldReduceMotion={shouldReduceMotion} />}
      </div>
    </div>
  );
}

// ==========================================
// VARIANT: BALLOONS (3-5 floating balloon SVGs)
// ==========================================
function BalloonsVariant({ shouldReduceMotion }) {
  const balloons = [
    {
      left: '12%',
      color: '#8B5CF6',
      size: 32,
      duration: 4.2,
      delay: 0,
      yRange: [-6, 6],
      rotateRange: [-4, 4],
    },
    {
      left: '30%',
      color: '#FF4FA3',
      size: 38,
      duration: 3.6,
      delay: 0.6,
      yRange: [-8, 8],
      rotateRange: [-5, 5],
    },
    {
      left: '50%',
      color: '#FFE66D',
      size: 42,
      duration: 4.8,
      delay: 0.2,
      yRange: [-7, 7],
      rotateRange: [-3, 3],
      isCenter: true,
    },
    {
      left: '70%',
      color: '#38E8FF',
      size: 36,
      duration: 3.8,
      delay: 0.8,
      yRange: [-8, 8],
      rotateRange: [4, -4],
    },
    {
      left: '88%',
      color: '#FF4FA3',
      size: 30,
      duration: 4.4,
      delay: 0.4,
      yRange: [-5, 5],
      rotateRange: [3, -3],
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center">
      {balloons.map((b, idx) => (
        <motion.div
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          style={{ left: b.left, top: '50%' }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [b.yRange[0], b.yRange[1], b.yRange[0]],
                  rotate: [b.rotateRange[0], b.rotateRange[1], b.rotateRange[0]],
                }
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        >
          <svg
            width={b.size}
            height={b.size * 1.45}
            viewBox="0 0 40 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id={`balloon-grad-${idx}`} cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FFF9F5" stopOpacity="0.45" />
                <stop offset="35%" stopColor={b.color} />
                <stop offset="100%" stopColor={b.color} stopOpacity="0.85" />
              </radialGradient>
            </defs>
            {/* Balloon Body */}
            <path
              d="M20 2C9 2 0 11 0 22C0 32 10 40 18 43L17 46H23L22 43C30 40 40 32 40 22C40 11 31 2 20 2Z"
              fill={`url(#balloon-grad-${idx})`}
            />
            {/* Gloss Highlight */}
            <ellipse
              cx="13"
              cy="15"
              rx="4"
              ry="8"
              transform="rotate(-25 13 15)"
              fill="#FFF9F5"
              fillOpacity="0.5"
            />
            {/* Balloon Knot */}
            <path d="M18 46L22 46L21 48L19 48Z" fill={b.color} />
            {/* Balloon String */}
            <path
              d="M20 48C18 52 23 54 20 58"
              stroke="#FFF9F5"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// VARIANT: CONFETTI (Scattered colorful dots & ribbons)
// ==========================================
function ConfettiVariant({ shouldReduceMotion }) {
  const pieces = [
    { left: '8%', top: '35%', color: '#8B5CF6', size: 6, shape: 'circle', rot: 20 },
    { left: '16%', top: '65%', color: '#FF4FA3', size: 9, shape: 'rect', rot: 45 },
    { left: '25%', top: '28%', color: '#38E8FF', size: 7, shape: 'diamond', rot: 15 },
    { left: '34%', top: '70%', color: '#FFE66D', size: 8, shape: 'rect', rot: 60 },
    { left: '42%', top: '38%', color: '#FFF9F5', size: 5, shape: 'circle', rot: 0 },
    { left: '50%', top: '60%', color: '#FF4FA3', size: 10, shape: 'ribbon', rot: -30 },
    { left: '58%', top: '25%', color: '#8B5CF6', size: 8, shape: 'diamond', rot: 25 },
    { left: '67%', top: '68%', color: '#38E8FF', size: 7, shape: 'rect', rot: -45 },
    { left: '76%', top: '32%', color: '#FFE66D', size: 6, shape: 'circle', rot: 10 },
    { left: '84%', top: '62%', color: '#FF4FA3', size: 9, shape: 'diamond', rot: -15 },
    { left: '92%', top: '40%', color: '#8B5CF6', size: 7, shape: 'rect', rot: 35 },
  ];

  return (
    <div className="relative w-full h-full flex items-center">
      {/* Center Confetti Blast Ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-[#FF4FA3]/30 bg-[#FF4FA3]/5 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFE66D] shadow-[0_0_8px_#FFE66D]" />
        </div>
      </div>

      {pieces.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: p.left, top: p.top }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [-4, 4, -4],
                  rotate: [p.rot, p.rot + 25, p.rot],
                  opacity: [0.65, 1, 0.65],
                }
          }
          transition={{
            duration: 3 + (idx % 4) * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (idx * 0.2) % 1.5,
          }}
        >
          {p.shape === 'circle' && (
            <div
              className="rounded-full shadow-[0_0_6px_currentColor]"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                color: p.color,
              }}
            />
          )}
          {p.shape === 'rect' && (
            <div
              className="rounded-[1.5px] shadow-[0_0_6px_currentColor]"
              style={{
                width: p.size * 1.5,
                height: p.size * 0.7,
                backgroundColor: p.color,
                color: p.color,
              }}
            />
          )}
          {p.shape === 'diamond' && (
            <div
              className="transform rotate-45 rounded-[1px] shadow-[0_0_6px_currentColor]"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                color: p.color,
              }}
            />
          )}
          {p.shape === 'ribbon' && (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path
                d="M1 4C4 1 10 7 13 4"
                stroke={p.color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// VARIANT: SPARKLES (Star/sparkle shapes with pulsing glow)
// ==========================================
function SparklesVariant({ shouldReduceMotion }) {
  const sparkles = [
    { left: '15%', top: '48%', size: 14, color: '#8B5CF6', delay: 0.3, dur: 3.2 },
    { left: '28%', top: '35%', size: 18, color: '#38E8FF', delay: 0.8, dur: 2.8 },
    { left: '38%', top: '60%', size: 12, color: '#FFE66D', delay: 0.1, dur: 3.4 },
    { left: '50%', top: '50%', size: 30, color: '#FF4FA3', delay: 0, dur: 3.0, isMain: true },
    { left: '62%', top: '38%', size: 13, color: '#FFE66D', delay: 0.5, dur: 3.1 },
    { left: '72%', top: '62%', size: 19, color: '#8B5CF6', delay: 0.9, dur: 2.9 },
    { left: '85%', top: '48%', size: 15, color: '#38E8FF', delay: 0.2, dur: 3.3 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {sparkles.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ left: s.left, top: s.top }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: s.isMain ? [1, 1.18, 1] : [0.85, 1.15, 0.85],
                  opacity: [0.55, 1, 0.55],
                  rotate: s.isMain ? [0, 90, 180] : [0, 45, 0],
                }
          }
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        >
          {/* Subtle Glow Ring behind the centerpiece */}
          {s.isMain && (
            <div className="absolute w-12 h-12 rounded-full bg-[#FF4FA3]/25 blur-md pointer-events-none" />
          )}

          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            fill="none"
            className="overflow-visible"
            style={{
              filter: `drop-shadow(0 0 6px ${s.color})`,
            }}
          >
            <path
              d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
              fill={s.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// VARIANT: CAKE (Mini cake centerpiece with surrounding sparkles)
// ==========================================
function CakeVariant({ shouldReduceMotion }) {
  const accentSparkles = [
    { left: '38%', top: '40%', size: 11, color: '#FFE66D', delay: 0.2, dur: 2.6 },
    { left: '42%', top: '65%', size: 9, color: '#38E8FF', delay: 0.7, dur: 3.1 },
    { left: '58%', top: '35%', size: 12, color: '#8B5CF6', delay: 0.4, dur: 2.8 },
    { left: '62%', top: '62%', size: 10, color: '#FF4FA3', delay: 0.9, dur: 3.3 },
    { left: '26%', top: '50%', size: 14, color: '#38E8FF', delay: 0.1, dur: 3.5 },
    { left: '74%', top: '50%', size: 14, color: '#FFE66D', delay: 0.6, dur: 3.2 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Surrounding Accent Sparkles */}
      {accentSparkles.map((sp, idx) => (
        <motion.div
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: sp.left, top: sp.top }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 0.95, 0.4],
                }
          }
          transition={{
            duration: sp.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: sp.delay,
          }}
        >
          <svg
            width={sp.size}
            height={sp.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: `drop-shadow(0 0 5px ${sp.color})` }}
          >
            <path
              d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
              fill={sp.color}
            />
          </svg>
        </motion.div>
      ))}

      {/* Center Cake Icon Badge */}
      <motion.div
        className="relative z-10 flex items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-[#170D2B]/85 border border-[#8B5CF6]/35 backdrop-blur-md shadow-[0_0_24px_rgba(139,92,246,0.35)]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [-3, 3, -3],
              }
        }
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Cake Stand / Plate */}
          <path
            d="M8 42H40C41.1 42 42 41.1 42 40C42 38.9 41.1 38 40 38H8C6.9 38 6 38.9 6 40C6 41.1 6.9 42 8 42Z"
            fill="#FFF9F5"
            fillOpacity="0.4"
          />

          {/* Bottom Cake Layer */}
          <rect x="9" y="27" width="30" height="11" rx="2" fill="#8B5CF6" />
          <path
            d="M9 30C12 32 15 28 18 30C21 32 24 28 27 30C30 32 33 28 36 30C37.5 31 38.5 30 39 30V27H9V30Z"
            fill="#FF4FA3"
          />

          {/* Top Cake Layer */}
          <rect x="14" y="18" width="20" height="9" rx="2" fill="#FF4FA3" />
          <path
            d="M14 20C16.5 22 18.5 19 21 21C23.5 23 25.5 19 28 21C30 22 32 20 34 20V18H14V20Z"
            fill="#FFF9F5"
            fillOpacity="0.8"
          />

          {/* Cake Candles (3 Candles) */}
          <rect x="18" y="11" width="2" height="7" rx="1" fill="#38E8FF" />
          <rect x="23" y="9" width="2" height="9" rx="1" fill="#FFE66D" />
          <rect x="28" y="11" width="2" height="7" rx="1" fill="#38E8FF" />

          {/* Candle Flames with flicker */}
          <motion.circle
            cx="19"
            cy="8"
            r="2"
            fill="#FFE66D"
            style={{ filter: 'drop-shadow(0 0 4px #FFE66D)' }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="24"
            cy="6"
            r="2.4"
            fill="#FFE66D"
            style={{ filter: 'drop-shadow(0 0 6px #FFE66D)' }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.35, 1],
                    opacity: [0.85, 1, 0.85],
                  }
            }
            transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.circle
            cx="29"
            cy="8"
            r="2"
            fill="#FFE66D"
            style={{ filter: 'drop-shadow(0 0 4px #FFE66D)' }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ==========================================
// VARIANT: STARS (Stars at different sizes with twinkle animation)
// ==========================================
function StarsVariant({ shouldReduceMotion }) {
  const stars = [
    { left: '10%', top: '40%', size: 14, color: '#FFE66D', delay: 0.2, dur: 2.8, type: '5point' },
    { left: '22%', top: '65%', size: 18, color: '#8B5CF6', delay: 0.7, dur: 3.4, type: '4point' },
    { left: '34%', top: '35%', size: 12, color: '#FFF9F5', delay: 0.1, dur: 2.6, type: '5point' },
    { left: '44%', top: '60%', size: 16, color: '#38E8FF', delay: 0.5, dur: 3.1, type: '4point' },
    { left: '50%', top: '50%', size: 28, color: '#FFE66D', delay: 0, dur: 3.6, type: '5point', isMain: true },
    { left: '56%', top: '38%', size: 16, color: '#FF4FA3', delay: 0.4, dur: 3.0, type: '4point' },
    { left: '66%', top: '65%', size: 13, color: '#38E8FF', delay: 0.8, dur: 2.7, type: '5point' },
    { left: '78%', top: '35%', size: 19, color: '#8B5CF6', delay: 0.3, dur: 3.3, type: '4point' },
    { left: '90%', top: '55%', size: 13, color: '#FFE66D', delay: 0.6, dur: 2.9, type: '5point' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {stars.map((st, idx) => (
        <motion.div
          key={idx}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ left: st.left, top: st.top }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: st.isMain ? [0.95, 1.15, 0.95] : [0.75, 1.15, 0.75],
                  opacity: [0.4, 1, 0.4],
                  rotate: st.isMain ? [0, 18, -18, 0] : [0, 10, -10, 0],
                }
          }
          transition={{
            duration: st.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: st.delay,
          }}
        >
          {st.isMain && (
            <div className="absolute w-12 h-12 rounded-full bg-[#FFE66D]/20 blur-md pointer-events-none" />
          )}

          {st.type === '5point' ? (
            <svg
              width={st.size}
              height={st.size}
              viewBox="0 0 24 24"
              fill="none"
              style={{ filter: `drop-shadow(0 0 5px ${st.color})` }}
            >
              <polygon
                points="12,1.5 15.2,8.1 22.5,9.2 17.2,14.4 18.5,21.6 12,18.2 5.5,21.6 6.8,14.4 1.5,9.2 8.8,8.1"
                fill={st.color}
              />
            </svg>
          ) : (
            <svg
              width={st.size}
              height={st.size}
              viewBox="0 0 24 24"
              fill="none"
              style={{ filter: `drop-shadow(0 0 5px ${st.color})` }}
            >
              <path
                d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                fill={st.color}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
