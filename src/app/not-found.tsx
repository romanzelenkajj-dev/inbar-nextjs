import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stránka nenájdená',
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl md:text-8xl font-serif font-bold text-gold mb-4">404</h1>
      <h2 className="text-2xl font-serif text-white mb-4">Stránka nenájdená</h2>
      <p className="text-gray-400 mb-8">
        Hľadaná stránka neexistuje alebo bola presunutá.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-gold text-dark font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors"
      >
        Späť na úvodnú stránku
      </Link>
    </div>
  );
}
