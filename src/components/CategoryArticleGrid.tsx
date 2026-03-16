'use client';

import { useState, useEffect } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { WPPost } from '@/lib/types';

const EXCLUDED_SLUGS = ['masterclass-guest-shift-three-cents-v-bratislave'];

interface CategoryArticleGridProps {
  initialPosts: WPPost[];
  initialTotalPages: number;
  categoryIds: number[];
  perPage: number;
}

export default function CategoryArticleGrid({
  initialPosts,
  initialTotalPages,
  categoryIds,
  perPage,
}: CategoryArticleGridProps) {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  // Reset when categoryIds or initialPosts change (tab switch)
  useEffect(() => {
    setPosts(initialPosts);
    setCurrentPage(1);
    setTotalPages(initialTotalPages);
  }, [initialPosts, initialTotalPages]);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const res = await fetch(
        `https://cms.inbar.sk/wp-json/wp/v2/posts?categories=${categoryIds.join(',')}&per_page=${perPage}&page=${nextPage}&_embed`
      );

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data: WPPost[] = await res.json();
      const serverTotalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
      const filtered = data.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));

      setPosts((prev) => [...prev, ...filtered]);
      setCurrentPage(nextPage);
      setTotalPages(serverTotalPages);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const hasMore = currentPage < totalPages;

  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">V tejto kategórii zatiaľ nie sú žiadne články.</p>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 mb-4 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-12 py-3 border border-gray-800 text-gray-800 bg-transparent text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'NAČÍTAVA SA…' : 'ZOBRAZIŤ VIAC'}
          </button>
        </div>
      )}
    </>
  );
}
