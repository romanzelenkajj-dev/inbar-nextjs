import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Cookies | ${SITE_NAME}`,
  description: 'Zásady používania cookies na stránke InBar Magazine.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
        Zásady používania cookies
      </h1>

      <div className="wp-content">
        <p>
          Táto stránka používa cookies – malé textové súbory, ktoré sa ukladajú vo vašom
          zariadení, aby stránka mohla poskytovať lepší používateľský zážitok.
        </p>

        <h3>Čo sú cookies?</h3>
        <p>
          Cookies sú malé textové súbory, ktoré webové stránky ukladajú na vašom počítači
          alebo mobilnom zariadení pri ich návšteve. Slúžia na uloženie vašich preferencií,
          zlepšenie výkonu stránky a poskytovanie relevantného obsahu.
        </p>

        <h3>Aké cookies používame?</h3>
        <ul>
          <li>
            <strong>Nevyhnutné cookies</strong> – potrebné pre základnú funkčnosť stránky
          </li>
          <li>
            <strong>Analytické cookies</strong> – pomáhajú nám pochopiť, ako návštevníci
            používajú stránku (napr. Google Analytics)
          </li>
          <li>
            <strong>Marketingové cookies</strong> – používané na sledovanie návštevníkov
            naprieč webovými stránkami za účelom zobrazovania relevantných reklám
          </li>
        </ul>

        <h3>Ako spravovať cookies?</h3>
        <p>
          Väčšina prehliadačov umožňuje kontrolovať cookies prostredníctvom nastavení.
          Môžete cookies vymazať alebo zablokovať, avšak niektoré časti stránky potom
          nemusia správne fungovať.
        </p>

        <h3>Viac informácií</h3>
        <p>
          Pre viac informácií o cookies a ich správe navštívte{' '}
          <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
            www.allaboutcookies.org
          </a>.
        </p>
      </div>
    </div>
  );
}
