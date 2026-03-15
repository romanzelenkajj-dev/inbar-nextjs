import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Ochrana súkromia | ${SITE_NAME}`,
  description: 'Zásady ochrany osobných údajov InBar Magazine.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
        Ochrana súkromia
      </h1>

      <div className="wp-content">
        <h2>Zásady ochrany osobných údajov</h2>

        <p>
          Prevádzkovateľ webovej stránky inbar.sk, spoločnosť PRO PUBLISHING s. r. o., so sídlom
          Landererova 6, 811 09 Bratislava, IČO: 52233570, si váži vaše súkromie a zaväzuje sa
          chrániť vaše osobné údaje.
        </p>

        <h3>Zhromažďovanie údajov</h3>
        <p>
          Pri návšteve našej webovej stránky môžeme zhromažďovať nasledujúce informácie:
        </p>
        <ul>
          <li>Technické údaje o vašom zariadení a prehliadači</li>
          <li>Údaje o navigácii na stránke</li>
          <li>Cookies a podobné technológie</li>
        </ul>

        <h3>Účel spracovania</h3>
        <p>
          Osobné údaje spracúvame na účely:
        </p>
        <ul>
          <li>Zabezpečenia funkčnosti webovej stránky</li>
          <li>Analýzy návštevnosti a zlepšovania obsahu</li>
          <li>Poskytovania relevantnej reklamy</li>
        </ul>

        <h3>Vaše práva</h3>
        <p>
          Máte právo na prístup k vašim osobným údajom, ich opravu, vymazanie, obmedzenie
          spracovania, prenositeľnosť údajov a právo namietať proti spracovaniu. Pre uplatnenie
          vašich práv nás kontaktujte na adrese{' '}
          <a href="mailto:elena.strapkova@propublishing.sk">elena.strapkova@propublishing.sk</a>.
        </p>

        <h3>Kontakt</h3>
        <p>
          V prípade otázok ohľadom ochrany osobných údajov nás kontaktujte:<br />
          PRO PUBLISHING s. r. o.<br />
          Landererova 6, 811 09 Bratislava<br />
          e-mail: <a href="mailto:elena.strapkova@propublishing.sk">elena.strapkova@propublishing.sk</a>
        </p>
      </div>
    </div>
  );
}
