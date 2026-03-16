import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Kontakt | ${SITE_NAME}`,
  description: 'Kontaktujte redakciu InBar&Restaurant.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Kontakt</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-cream-dark border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-gold mb-4">Redakcia</h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <strong className="text-gray-900">Alexandra Tinková</strong><br />
              Šéfredaktorka
            </p>
            <p>
              tel.: <a href="tel:+421903897411" className="text-gold hover:text-gold-light transition-colors">+421 903 897 411</a>
            </p>
            <p>
              e-mail:{' '}
              <a href="mailto:alexandra.tinkova@propublishing.sk" className="text-gold hover:text-gold-light transition-colors">
                alexandra.tinkova@propublishing.sk
              </a>
            </p>
          </div>
        </div>

        <div className="bg-cream-dark border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-gold mb-4">Vydavateľ</h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <strong className="text-gray-900">PRO PUBLISHING s. r. o.</strong>
            </p>
            <p>
              Landererova 6<br />
              811 09 Bratislava<br />
              Slovenská republika
            </p>
            <p>IČO: 52233570</p>
          </div>
        </div>
      </div>
    </div>
  );
}
