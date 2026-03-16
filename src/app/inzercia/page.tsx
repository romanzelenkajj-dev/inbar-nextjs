import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Inzercia | ${SITE_NAME}`,
  description: 'Inzertné možnosti v InBar&Restaurant – oslovte milovníkov gastronómie a životného štýlu.',
};

export default function AdvertisingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Inzercia</h1>
      <p className="text-gray-600 text-lg mb-10">
        Oslovte našich čitateľov – milovníkov dobrej gastronómie, barov a životného štýlu.
      </p>

      <div className="wp-content mb-12">
        <p>
          Pre viac informácií o možnostiach inzercie nás neváhajte kontaktovať:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-cream-dark border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900 block mb-2">Zuzana Zelenková</strong>
            tel.: <a href="tel:+421902547267" className="text-gold hover:text-gold-light transition-colors">+421 902 547 267</a><br />
            <a href="mailto:zuzana.zelenkova@propublishing.sk" className="text-gold hover:text-gold-light transition-colors text-xs">
              zuzana.zelenkova@propublishing.sk
            </a>
          </p>
        </div>

        <div className="bg-cream-dark border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900 block mb-2">Martin Obert</strong>
            tel.: <a href="tel:+421905343812" className="text-gold hover:text-gold-light transition-colors">+421 905 343 812</a><br />
            <a href="mailto:martin.obert@propublishing.sk" className="text-gold hover:text-gold-light transition-colors text-xs">
              martin.obert@propublishing.sk
            </a>
          </p>
        </div>

        <div className="bg-cream-dark border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900 block mb-2">Roman Šimoník</strong>
            tel.: <a href="tel:+421917694771" className="text-gold hover:text-gold-light transition-colors">+421 917 694 771</a><br />
            <a href="mailto:roman.simonik@propublishing.sk" className="text-gold hover:text-gold-light transition-colors text-xs">
              roman.simonik@propublishing.sk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
