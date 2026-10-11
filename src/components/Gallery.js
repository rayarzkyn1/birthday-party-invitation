'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ImageIcon,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

/**
 * Gradient placeholder shown while images load or on error.
 */
function GalleryPlaceholder({ index }) {
  const gradients = [
    'from-purple-600 to-pink-500',
    'from-pink-500 to-rose-400',
    'from-violet-600 to-indigo-500',
    'from-fuchsia-500 to-purple-600',
    'from-indigo-500 to-cyan-400',
    'from-rose-500 to-orange-400',
    'from-purple-500 to-cyan-400',
    'from-pink-600 to-violet-500',
  ];

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${
        gradients[index % gradients.length]
      } flex flex-col items-center justify-center gap-3`}
    >
      <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
      <span className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">
        Photo {index + 1}
      </span>
    </div>
  );
}

/**
 * Bento grid layout classes for 8 items.
 * - Mobile (2 cols): some items span full width
 * - sm (3 cols): adjusted spans
 * - lg (4 cols): hero image + tall image
 */
const bentoLayout = [
  'col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[320px] lg:min-h-[400px]',
  'col-span-1 row-span-1 aspect-square',
  'col-span-1 row-span-1 aspect-square',
  'col-span-1 row-span-1 lg:row-span-2 aspect-square lg:aspect-auto lg:min-h-[320px]',
  'col-span-1 row-span-1 aspect-square',
  'col-span-2 row-span-1 sm:col-span-2 aspect-[16/9] sm:aspect-video',
  'col-span-1 row-span-1 aspect-square',
  'col-span-1 row-span-1 aspect-square',
];

function GalleryItem({ image, index, onImageClick }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`${
        bentoLayout[index] || 'col-span-1 row-span-1 aspect-square'
      } relative rounded-2xl overflow-hidden cursor-pointer group`}
      onClick={() => !imgError && imgLoaded && onImageClick(index)}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl z-0">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#FF4FA3]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {!imgError ? (
        <>
          {!imgLoaded && <GalleryPlaceholder index={index} />}
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-all duration-400 group-hover:scale-[1.03] group-hover:brightness-110 ${
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

      {/* Hover overlay with gradient and zoom icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#170D2B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { gallery } = birthdayConfig;

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
    );
  }, [gallery.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % gallery.length : null
    );
  }, [gallery.length]);

  // Keyboard support: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  // Body scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
      id="gallery"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          {/* Icon row with camera + sparkles */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <h2 className="section-title mb-0">MY GALLERY</h2>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink" />
          </div>

          <div className="section-divider" />

          {/* Subtitle — lebih menarik & personal */}
          <p className="text-soft-white/60 mt-4 text-xs sm:text-sm">
            A collection of beautiful memories 📸
          </p>
        </motion.div>

        {/* Bento Grid - 2 cols mobile, 3 cols sm, 4 cols lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-auto">
          {gallery.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              onImageClick={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#170D2B]/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 z-20 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wider">
              {lightboxIndex + 1} / {gallery.length}
            </div>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightboxIndex]?.src}
                alt={gallery[lightboxIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}