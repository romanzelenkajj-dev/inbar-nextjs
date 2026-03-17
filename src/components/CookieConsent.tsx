'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up border-t border-dark-border bg-dark-lighter shadow-2xl"
    >
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <p className="font-sans text-xs leading-snug text-gray-300 sm:text-sm sm:leading-relaxed">
            Cookies na zlepšenie zážitku.{' '}
            <Link href="/ochrana-sukromia" className="text-gold underline underline-offset-2 hover:text-gold-light">
              Súkromie
            </Link>{' '}
            &{' '}
            <Link href="/cookies" className="text-gold underline underline-offset-2 hover:text-gold-light">
              cookies
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2 sm:gap-3">
            <button
              onClick={handleReject}
              className="rounded-md border border-gray-500 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:border-gray-300 hover:text-white"
            >
              Nie
            </button>
            <button
              onClick={handleAccept}
              className="rounded-md bg-gold px-3 py-1.5 text-xs sm:text-sm font-semibold text-dark transition-colors hover:bg-gold-light"
            >
              Prijať
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
