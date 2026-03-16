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
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm leading-relaxed text-gray-300 sm:text-base">
            Táto stránka používa cookies na zlepšenie vášho zážitku. Prečítajte si naše{' '}
            <Link href="/ochrana-sukromia" className="text-gold underline underline-offset-2 hover:text-gold-light">
              zásady ochrany súkromia
            </Link>{' '}
            a{' '}
            <Link href="/cookies" className="text-gold underline underline-offset-2 hover:text-gold-light">
              cookies
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={handleReject}
              className="rounded-md border border-gray-500 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-300 hover:text-white"
            >
              Odmietnuť
            </button>
            <button
              onClick={handleAccept}
              className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-gold-light"
            >
              Prijať cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
