import Link from 'next/link';

export default function AdBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-cream-dark border border-gray-200 rounded-xl p-8 md:p-12 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Reklama</p>
        <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3">
          Inzerujte v InBar&amp;Restaurant
        </h3>
        <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
          Oslovte našich čitateľov – milovníkov dobrej gastronómie, barov a životného štýlu.
        </p>
        <Link
          href="/inzercia"
          className="inline-block px-6 py-3 bg-gold text-dark font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors"
        >
          Zistiť viac
        </Link>
      </div>
    </section>
  );
}
