import Link from 'next/link';
import { WPPost } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface CategorySectionProps {
  title: string;
  slug: string;
  posts: WPPost[];
}

export default function CategorySection({ title, slug, posts }: CategorySectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            {title}
          </h2>
          <div className="hidden sm:block h-px bg-gray-200 flex-1 min-w-[60px]" />
        </div>
        <Link
          href={`/category/${slug}`}
          className="text-xs font-semibold tracking-widest uppercase text-gold border border-gold/40 rounded-full px-4 py-1.5 hover:bg-gold hover:text-dark transition-all duration-300 whitespace-nowrap"
        >
          Zobraziť všetky
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {posts.slice(0, 4).map((post) => (
          <ArticleCard key={post.id} post={post} showExcerpt={true} />
        ))}
      </div>
    </section>
  );
}
