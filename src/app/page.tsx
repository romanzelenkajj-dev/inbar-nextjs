import { getPosts, getPostsByCategory } from '@/lib/wordpress';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import SponsorBanner from '@/components/SponsorBanner';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default async function HomePage() {
  const [latestPosts, drinkingPosts, diningPosts, livingPosts] = await Promise.all([
    getPosts(1, 3),
    getPostsByCategory(6, 1, 4),
    getPostsByCategory(12, 1, 4),
    getPostsByCategory(13, 1, 4),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection posts={latestPosts.posts} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <CategorySection title="Drinking" slug="drinking" posts={drinkingPosts.posts} />

      <SponsorBanner size="medium" />

      <CategorySection title="Dining" slug="dining" posts={diningPosts.posts} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <CategorySection title="Living" slug="living" posts={livingPosts.posts} />
    </>
  );
}
