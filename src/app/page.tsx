import { Metadata } from 'next';
import { getPosts, getPostsByCategory } from '@/lib/wordpress';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import SponsorBanner from '@/components/SponsorBanner';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils';

export const metadata: Metadata = {
  title: `${SITE_NAME} – Bar, Restaurant & Lifestyle`,
  description: SITE_DESCRIPTION,
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
      <HeroSection posts={latestPosts.posts} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <CategorySection title="Drinking" slug="drinking" posts={drinkingPosts.posts} />

      <SponsorBanner size="wide" className="my-8 max-w-7xl mx-auto px-4" />

      <CategorySection title="Dining" slug="dining" posts={diningPosts.posts} />

      <SponsorBanner size="square" className="my-8 max-w-7xl mx-auto px-4" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <CategorySection title="Living" slug="living" posts={livingPosts.posts} />
    </>
  );
}
