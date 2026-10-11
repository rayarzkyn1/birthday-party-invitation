import { Suspense } from 'react';
import InvitationPage from '@/components/InvitationPage';

export const metadata = {
  title: "Wiyana's 24th Birthday Celebration 🎂 | Night Party",
  description:
    "You're invited to Wiyana Ananda Octaviani's 24th Birthday Night Party! Join us for an unforgettable celebration at Tembak Langit, Paskal 23, Bandung.",
  keywords: [
    'birthday invitation',
    'Wiyana',
    'birthday party',
    '24th birthday',
    'night party',
    'Bandung',
    'Paskal 23',
  ],
  openGraph: {
    title: "Wiyana's 24th Birthday Celebration 🎂",
    description:
      "You're invited to an unforgettable Night Party! Join us at Tembak Langit, Paskal 23, Bandung.",
    type: 'website',
  },
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-deep-purple flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-electric-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-soft-white/60 text-sm tracking-widest">
              Loading invitation...
            </p>
          </div>
        </div>
      }
    >
      <InvitationPage />
    </Suspense>
  );
}
