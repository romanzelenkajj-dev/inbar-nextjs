import { WPPost } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface HeroSectionProps {
  posts: WPPost[];
}

export default function HeroSection({ posts }: HeroSectionProps) {
  if (posts.length === 0) return null;

  const [mainPost, ...sidePosts] = posts;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main large post */}
        <div className="lg:col-span-2">
          <ArticleCard post={mainPost} variant="large" />
        </div>

        {/* Side posts */}
        <div className="flex flex-col gap-6">
          {sidePosts.slice(0, 2).map((post) => (
            <div key={post.id} className="flex-1">
              <ArticleCard post={post} variant="hero-side" showExcerpt={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
