'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  CreditCard,
  MapPin,
  Copy,
  Check,
  Sparkles,
  Heart,
  Cake,
  Wallet,
} from 'lucide-react';

export default function GiftSection() {
  const [copied, setCopied] = useState(null);
  // copied bisa berisi: 'rekening' | 'alamat' | null

  const bankAccount = {
    bankName: 'BCA',
    accountNumber: '3761678076',
    accountName: 'Wiyana Ananda Octaviani',
  };

  const physicalAddress =
    'Jl. H. Darham Cikopo No.35, RW.15, Tenjolaya, Kec. Cicalengka, Kabupaten Bandung, Jawa Barat 40395';

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="gift"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <h2 className="section-title mb-0">BIRTHDAY GIFT</h2>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink" />
          </div>
          <div className="section-divider" />
          <p className="text-soft-white/60 mt-4 text-xs sm:text-sm">
            Your prayers and blessings mean so much to us 💜
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-electric-purple via-hot-pink to-neon-cyan shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <div className="relative bg-[#170D2B]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
            {/* Decorative background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-electric-purple/20 blur-[80px]" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-hot-pink/20 blur-[80px]" />
            </div>

            {/* Opening message */}
            <motion.div
              variants={itemVariants}
              className="relative text-center mb-8 sm:mb-10"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <Cake className="w-5 h-5 text-pink-400" />
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <Cake className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-soft-white/80 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                Thank you for all your prayers and blessings. For those who wish to give a gift,
                you may send it through:
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 sm:mb-10"
            />

            {/* ===== BANK ACCOUNT ===== */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-purple to-hot-pink flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-soft-white">
                  Transfer via Bank
                </h3>
              </div>

              {/* Account card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6">
                {/* Bank name + logo-ish */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-xs tracking-wider">
                        BCA
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-soft-white/50 uppercase tracking-wider">
                        Bank
                      </p>
                      <p className="font-bold text-soft-white">
                        {bankAccount.bankName}
                      </p>
                    </div>
                  </div>
                  <Wallet className="w-5 h-5 text-soft-white/30" />
                </div>

                {/* Account number */}
                <div className="mb-4">
                  <p className="text-xs text-soft-white/50 uppercase tracking-wider mb-1">
                    Nomor Rekening
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-wider tabular-nums">
                    {bankAccount.accountNumber}
                  </p>
                </div>

                {/* Account name */}
                <div className="mb-5">
                  <p className="text-xs text-soft-white/50 uppercase tracking-wider mb-1">
                    Atas Nama
                  </p>
                  <p className="text-sm sm:text-base font-medium text-soft-white">
                    {bankAccount.accountName}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() =>
                    handleCopy(bankAccount.accountNumber, 'rekening')
                  }
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-electric-purple to-hot-pink text-white font-semibold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all active:scale-95"
                >
                  {copied === 'rekening' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Nomor Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy No. Rekening
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* ===== PHYSICAL ADDRESS ===== */}
            <motion.div variants={itemVariants}>
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-hot-pink to-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-soft-white">
                  Kirim Kado Fisik
                </h3>
              </div>

              {/* Address card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6">
                {/* Address */}
                <div className="mb-5">
                  <p className="text-xs text-soft-white/50 uppercase tracking-wider mb-2">
                    Alamat Penerima
                  </p>
                  <p className="text-sm sm:text-base text-soft-white/90 leading-relaxed">
                    {physicalAddress}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(physicalAddress, 'alamat')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-hot-pink to-neon-cyan text-white font-semibold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(56,232,255,0.5)] transition-all active:scale-95"
                >
                  {copied === 'alamat' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Alamat Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Alamat
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Closing message */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 text-center"
            >
              <div className="inline-flex items-center gap-2 text-soft-white/60 text-xs sm:text-sm italic">
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                <span>
                  We truly hope you can join us in celebrating this special birthday.
                <p>Your presence would be the most precious gift of all.</p> 
                </span>
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}