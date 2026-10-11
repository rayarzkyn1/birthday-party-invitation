'use client';

import { birthdayConfig } from '@/lib/birthday-config';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

export default function EventDetails() {
  const prefersReducedMotion = useReducedMotion();
  
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="event-details" className="relative py-20 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 tracking-wider">
              EVENT DETAILS
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
            {/* Date & Time */}
            <motion.div variants={itemVariants} className="relative group rounded-2xl p-1 bg-gradient-to-br from-purple-500/30 to-pink-500/30 hover:from-purple-500/50 hover:to-pink-500/50 transition-colors duration-300">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-6 h-full border border-white/5 flex flex-col gap-6 transition-all duration-300 group-hover:bg-slate-900/60">
                
                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-shadow">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-1">Date</h3>
                    <p className="text-xl font-bold text-white tracking-wide">{birthdayConfig.event.dateDisplay}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow">
                    <Clock className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-1">Time</h3>
                    <p className="text-xl font-bold text-white tracking-wide">{birthdayConfig.event.timeDisplay}</p>
                  </div>
                </div>
                
              </div>
            </motion.div>

            {/* Venue & Location */}
            <motion.div variants={itemVariants} className="relative group rounded-2xl p-1 bg-gradient-to-br from-pink-500/30 to-purple-500/30 hover:from-pink-500/50 hover:to-purple-500/50 transition-colors duration-300">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-6 h-full border border-white/5 flex flex-col gap-6 transition-all duration-300 group-hover:bg-slate-900/60">
                
                {/* Venue */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-1">Venue</h3>
                    <p className="text-xl font-bold text-white tracking-wide">{birthdayConfig.venue.name}</p>
                    <p className="text-sm text-white/60 mt-1">{birthdayConfig.venue.location}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-shadow">
                    <Navigation className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-1">Address</h3>
                    <p className="text-base text-gray-300 leading-relaxed">{birthdayConfig.venue.address}</p>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>

          {/* Maps Button */}
          <motion.div variants={itemVariants} className="mt-4">
            <a
              href={birthdayConfig.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r from-[#8B5CF6] to-[#FF4FA3] shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(255,79,163,0.6)]"
            >
              <MapPin className="w-5 h-5" />
              Open in Google Maps
            </a>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
