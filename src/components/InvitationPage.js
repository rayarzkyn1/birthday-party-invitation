'use client';

import { useSearchParams } from 'next/navigation';
import BirthdayInvitation from '@/components/BirthdayInvitation';
import { birthdayConfig } from '@/lib/birthday-config';

/**
 * InvitationPage - Client component that reads the `to` query parameter
 * and passes the guest name to BirthdayInvitation.
 *
 * Must be wrapped in <Suspense> when used in a server component page.
 */
export default function InvitationPage() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get('to');

  // Sanitize and decode guest name
  let guestName = birthdayConfig.defaultGuestName;

  if (rawName && rawName.trim().length > 0) {
    // Decode URI component, trim whitespace, limit length for safety
    try {
      const decoded = decodeURIComponent(rawName).trim();
      if (decoded.length > 0 && decoded.length <= 100) {
        guestName = decoded;
      }
    } catch {
      // If decoding fails, use the raw value (already decoded by URLSearchParams)
      const trimmed = rawName.trim();
      if (trimmed.length > 0 && trimmed.length <= 100) {
        guestName = trimmed;
      }
    }
  }

  return <BirthdayInvitation guestName={guestName} />;
}
