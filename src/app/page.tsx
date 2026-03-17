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
  // Fetch extra posts per category so we can filter out hero duplicates and still show 4
  const [latestPosts, drinkingPosts, diningPosts, livingPosts] = await Promise.all([
    getPosts(1, 3),
    getPostsByCategory(6, 1, 8),
    getPostsByCategory(12, 1, 8),
    getPostsByCategory(13, 1, 8),
  ]);

  // Exclude hero post IDs from category sections to avoid duplicates
  const heroIds = new Set(latestPosts.posts.map((p) => p.id));
  const filteredDrinking = drinkingPosts.posts.filter((p) => !heroIds.has(p.id)).slice(0, 4);
  const filteredDining = diningPosts.posts.filter((p) => !heroIds.has(p.id)).slice(0, 4);
  const filteredLiving = livingPosts.posts.filter((p) => !heroIds.has(p.id)).slice(0, 4);

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

      <CategorySection title="Drinking" slug="drinking" posts={filteredDrinking} />

      <SponsorBanner size="medium" />

      <CategorySection title="Dining" slug="dining" posts={filteredDining} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <CategorySection title="Living" slug="living" posts={filteredLiving} />
    </>
  );
}
