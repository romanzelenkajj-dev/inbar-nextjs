import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `O nás | ${SITE_NAME}`,
  description: 'O redakcii InBar Magazine – slovenský online magazín o baroch, reštauráciách a životnom štýle.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">O nás</h1>

      <div className="wp-content">
        <h2>INBAR &amp; RESTAURANT</h2>

        <p>
          InBar je slovenský online magazín venovaný svetu barov, reštaurácií a životného štýlu.
          Prinášame vám inšpiráciu, rozhovory so šéfkuchármi a barmanmi, recenzie podnikov
          a najnovšie trendy zo sveta gastronómie.
        </p>

        <h3>Vydavateľ</h3>
        <p>
          PRO PUBLISHING s. r. o.<br />
          Landererova 6<br />
          811 09 Bratislava<br />
          IČO: 52233570
        </p>

        <h3>Šéfredaktorka</h3>
        <p>
          Elena Strápková<br />
          tel.: +421 948 372 176<br />
          e-mail:{' '}
          <a href="mailto:elena.strapkova@propublishing.sk">elena.strapkova@propublishing.sk</a>
        </p>
      </div>
    </div>
  );
}
