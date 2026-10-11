'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { birthdayConfig } from '@/lib/birthday-config';

export default function ShareInvitation() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: birthdayConfig.share.title,
          text: birthdayConfig.share.text,
          url: currentUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentUrl]);

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(
        `${birthdayConfig.share.text}\n\n${currentUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg tracking-wider">
            SHARE THIS INVITATION
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Main Share Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] transition-all"
            >
              <Share2 className="w-6 h-6" />
              Share Link
            </motion.button>

            {/* WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-[#25D366] rounded-full text-white font-bold text-lg shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </motion.button>

            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white font-bold text-lg transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-6 h-6 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  Copy Link
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
