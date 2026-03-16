import { WPPost } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface HeroSectionProps {
  posts: WPPost[];
}

export default function HeroSection({ posts }: HeroSectionProps) {
  if (posts.length === 0) return null;

  const [mainPost, ...sidePosts] = posts;
  const hasSidePosts = sidePosts.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className={`grid grid-cols-1 ${hasSidePosts ? 'lg:grid-cols-3' : ''} gap-6 lg:h-[500px]`}>
        {/* Main large post */}
        <div className={`${hasSidePosts ? 'lg:col-span-2' : ''} h-full`}>
          <ArticleCard post={mainPost} variant="large" />
        </div>

        {/* Side posts */}
        {hasSidePosts && (
          <div className={`grid ${sidePosts.length >= 2 ? 'grid-rows-2' : 'grid-rows-1'} gap-6 h-full`}>
            {sidePosts.slice(0, 2).map((post) => (
              <div key={post.id} className="min-h-0">
                <ArticleCard post={post} variant="hero-side" showExcerpt={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
