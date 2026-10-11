'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Send,
  User,
  Users,
  MessageCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '', // ← string kosong (bukan number)
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [rsvpList, setRsvpList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [guestsError, setGuestsError] = useState('');

  // Fetch RSVP list on mount
  const fetchRsvpList = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setRsvpList(data || []);
    } catch (err) {
      console.error('Error fetching RSVP:', err);
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchRsvpList();

    // Realtime subscription — auto update saat ada RSVP baru
    const channel = supabase
      .channel('rsvp-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'rsvp' },
        (payload) => {
          setRsvpList((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRsvpList]);

  // Handle input guests — hanya terima digit
  const handleGuestsChange = (e) => {
    const raw = e.target.value;

    // Hanya terima angka (termasuk kosong)
    if (raw === '') {
      setFormData({ ...formData, guests: '' });
      setGuestsError('');
      return;
    }

    // Hanya digit
    if (!/^\d+$/.test(raw)) return;

    // Batasi max 10
    const num = parseInt(raw, 10);
    if (num > 10) {
      setFormData({ ...formData, guests: '10' });
      setGuestsError('');
      return;
    }

    // Hapus leading zero (01 → 1)
    const cleaned = num.toString();
    setFormData({ ...formData, guests: cleaned });
    setGuestsError('');
  };

  // Handle blur — validasi
  const handleGuestsBlur = () => {
    if (formData.attending !== 'yes') return;

    if (formData.guests === '' || formData.guests === '0') {
      setGuestsError('Jumlah orang wajib diisi (min. 1)');
    } else {
      setGuestsError('');
    }
  };

  // Apakah form valid untuk submit?
  const isFormValid =
    formData.name.trim() !== '' &&
    (formData.attending !== 'yes' ||
      (formData.guests !== '' && parseInt(formData.guests, 10) >= 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Kalau attending yes & guests kosong → tampilkan error
    if (formData.attending === 'yes' && formData.guests === '') {
      setGuestsError('Jumlah orang wajib diisi (min. 1)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from('rsvp').insert([
        {
          name: formData.name.trim(),
          attending: formData.attending,
          guests:
            formData.attending === 'yes' ? parseInt(formData.guests, 10) : 0,
          message: formData.message.trim() || null,
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', attending: 'yes', guests: '', message: '' });
      setGuestsError('');

      // Refresh list
      fetchRsvpList();

      // Clear success message after 5s
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const attendingOptions = [
    { value: 'yes', label: 'Hadir', icon: CheckCircle2, color: 'green' },
    { value: 'maybe', label: 'Mungkin', icon: HelpCircle, color: 'yellow' },
    { value: 'no', label: 'Tidak Hadir', icon: XCircle, color: 'red' },
  ];

  const totalGuests = rsvpList
    .filter((r) => r.attending === 'yes')
    .reduce((sum, r) => sum + (r.guests || 1), 0);

  return (
    <section
      id="rsvp"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink fill-hot-pink" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <h2 className="section-title mb-0">RSVP & UCAPAN</h2>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink fill-hot-pink" />
          </div>
          <div className="section-divider" />
          <p className="text-soft-white/60 mt-4 text-xs sm:text-sm">
            Confirm Your Attendance & Leave a Message for Me 💌
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 mb-10 sm:mb-12"
        >
          {/* Name Input */}
          <div className="mb-5 sm:mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-soft-white/80 mb-2">
              <User className="w-4 h-4" />
              Nama Kamu <span className="text-hot-pink">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Masukkan nama kamu"
              required
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-soft-white placeholder:text-soft-white/30 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/30 transition-all"
            />
          </div>

          {/* Attending Radio */}
          <div className="mb-5 sm:mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-soft-white/80 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              Konfirmasi Kehadiran <span className="text-hot-pink">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {attendingOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = formData.attending === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        attending: opt.value,
                        guests: opt.value === 'yes' ? formData.guests : '',
                      });
                      setGuestsError('');
                    }}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-electric-purple/30 to-hot-pink/30 border-electric-purple/60 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        isActive ? 'text-white' : 'text-soft-white/60'
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isActive ? 'text-white' : 'text-soft-white/60'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guests (only if attending === 'yes') */}
          <AnimatePresence>
            {formData.attending === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-5 sm:mb-6 overflow-hidden"
              >
                <label className="flex items-center gap-2 text-sm font-medium text-soft-white/80 mb-2">
                  <Users className="w-4 h-4" />
                  Jumlah Orang (termasuk kamu){' '}
                  <span className="text-hot-pink">*</span>
                </label>

                <input
                  type="text" // ← text bukan number biar bisa kosong di mobile
                  inputMode="numeric" // ← keyboard angka di mobile
                  pattern="[0-9]*"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleGuestsChange}
                  onBlur={handleGuestsBlur}
                  placeholder="Isi jumlah kehadiran"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-soft-white placeholder:text-soft-white/30 focus:outline-none focus:ring-2 transition-all ${
                    guestsError
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-white/15 focus:border-electric-purple focus:ring-electric-purple/30'
                  }`}
                />

                {/* Error message */}
                <AnimatePresence>
                  {guestsError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5 text-xs text-red-400 mt-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {guestsError}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Helper text */}
                
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-soft-white/80 mb-2">
              <MessageCircle className="w-4 h-4" />
              Ucapan & Doa
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Share Your Best Wishes and Prayers for Me..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-soft-white placeholder:text-soft-white/30 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/30 transition-all resize-none"
            />
            <p className="text-xs text-soft-white/40 mt-1 text-right">
              {formData.message.length}/500
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-electric-purple to-hot-pink text-white font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Konfirmasi
              </>
            )}
          </button>

          {/* Status Message */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-sm text-center flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Terima kasih! Konfirmasi kamu sudah tersimpan 💚
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm text-center"
              >
                ❌ Gagal mengirim. Coba lagi ya!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 mb-10 sm:mb-12"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-black text-hot-pink mb-1">
              {rsvpList.filter((r) => r.attending === 'yes').length}
            </p>
            <p className="text-xs sm:text-sm text-soft-white/60 uppercase tracking-wider">
              Konfirmasi Hadir
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-black text-electric-purple mb-1">
              {totalGuests}
            </p>
            <p className="text-xs sm:text-sm text-soft-white/60 uppercase tracking-wider">
              Total Tamu
            </p>
          </div>
        </motion.div>

        {/* Messages List */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-soft-white mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-hot-pink" />
            Ucapan & Doa ({rsvpList.filter((r) => r.message).length})
          </h3>

          {isLoadingList ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-electric-purple animate-spin" />
            </div>
          ) : rsvpList.filter((r) => r.message).length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <MessageCircle className="w-12 h-12 text-soft-white/20 mx-auto mb-3" />
              <p className="text-soft-white/50 text-sm">
                No messages yet. Be the first to leave one! 💌
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {rsvpList
                  .filter((r) => r.message)
                  .map((rsvp) => (
                    <motion.div
                      key={rsvp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-purple to-hot-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                          {rsvp.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-soft-white truncate">
                            {rsvp.name}
                          </p>
                          <p className="text-xs text-soft-white/40">
                            {new Date(rsvp.created_at).toLocaleDateString(
                              'id-ID',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-soft-white/80 leading-relaxed whitespace-pre-wrap break-words">
                        {rsvp.message}
                      </p>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}