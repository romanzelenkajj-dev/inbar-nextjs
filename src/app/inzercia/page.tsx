import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Inzercia | ${SITE_NAME}`,
  description: 'Inzertné možnosti v InBar Magazine – oslovte milovníkov gastronómie a životného štýlu.',
};

export default function AdvertisingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Inzercia</h1>
      <p className="text-gray-400 text-lg mb-10">
        Oslovte našich čitateľov – milovníkov dobrej gastronómie, barov a životného štýlu.
      </p>

      <div className="wp-content mb-12">
        <p>
          InBar Magazine ponúka rôzne formy spolupráce a inzertné priestory pre značky
          a podniky zo sveta gastronómie, nápojov a životného štýlu.
        </p>
        <p>
          Pre viac informácií o možnostiach inzercie nás neváhajte kontaktovať:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <p className="text-sm text-gray-300">
            <strong className="text-white block mb-2">Zuzana Zelenková</strong>
            tel.: <a href="tel:+421902547267" className="text-gold hover:text-gold-light transition-colors">+421 902 547 267</a><br />
            <a href="mailto:zuzana.zelenkova@propublishing.sk" className="text-gold hover:text-gold-light transition-colors text-xs">
              zuzana.zelenkova@propublishing.sk
            </a>
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <p className="text-sm text-gray-300">
            <strong className="text-white block mb-2">Peter Nemec</strong>
            tel.: <a href="tel:+421911160599" className="text-gold hover:text-gold-light transition-colors">+421 911 160 599</a><br />
            <a href="mailto:peter.nemec@propublishing.sk" className="text-gold hover:text-gold-light transition-colors text-xs">
              peter.nemec@propublishing.sk
            </a>
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <p className="text-sm text-gray-300">
            <strong className="text-white block mb-2">Roman Šimoník</strong>
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
