'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ImageIcon, X } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

function GalleryPlaceholder({ index }) {
  const gradients = [
    'from-purple-600 to-pink-500',
    'from-pink-500 to-rose-400',
    'from-violet-600 to-indigo-500',
    'from-fuchsia-500 to-purple-600',
    'from-indigo-500 to-cyan-400',
    'from-rose-500 to-orange-400',
  ];

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradients[index % gradients.length]} flex flex-col items-center justify-center gap-3`}
    >
      <ImageIcon className="w-10 h-10 text-white/60" />
      <span className="text-white/70 text-sm font-medium tracking-wide">
        Photo {index + 1}
      </span>
    </div>
  );
}

function GalleryItem({ image, index, onImageClick }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Bento grid spans
  const spanClasses = [
    'col-span-1 row-span-1 aspect-square',
    'col-span-1 row-span-1 aspect-square',
    'col-span-1 sm:col-span-2 row-span-1 aspect-video',
    'col-span-1 row-span-1 aspect-square',
    'col-span-1 row-span-1 aspect-square',
    'col-span-2 sm:col-span-1 row-span-1 aspect-video sm:aspect-square',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${spanClasses[index] || 'col-span-1 row-span-1 aspect-square'} 
        relative rounded-2xl overflow-hidden cursor-pointer group`}
      onClick={() => !imgError && imgLoaded && onImageClick(index)}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] z-0">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-purple/30 to-hot-pink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {!imgError ? (
        <>
          {!imgLoaded && <GalleryPlaceholder index={index} />}
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 ${
              imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
            onError={() => setImgError(true)}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />
        </>
      ) : (
        <GalleryPlaceholder index={index} />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { gallery } = birthdayConfig;

  return (
    <section className="relative py-20 px-4 sm:px-8" id="gallery">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-6 h-6 text-hot-pink" />
            <h2 className="section-title mb-0">BIRTHDAY GALLERY</h2>
            <Camera className="w-6 h-6 text-hot-pink" />
          </div>
          <div className="section-divider" />
          <p className="text-soft-white/60 mt-4 text-sm">
            Moments worth celebrating ✨
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {gallery.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              onImageClick={setLightboxIndex}
            />
          ))}
        </div>

        {/* Instruction text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-soft-white/40 text-xs mt-6 italic"
        >
          Replace placeholder images in /public/images/ with actual photos
        </motion.p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-purple/90 backdrop-blur-lg"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-soft-white hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={gallery[lightboxIndex]?.src}
                alt={gallery[lightboxIndex]?.alt}
                className="w-full h-full object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
