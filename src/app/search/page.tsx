import { Metadata } from 'next';
import { searchPosts, decodeHtmlEntities } from '@/lib/wordpress';
import { SITE_NAME } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';

interface SearchPageProps {
  searchParams: { q?: string; page?: string };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || '';
  return {
    title: query ? `Výsledky pre "${query}" | ${SITE_NAME}` : `Vyhľadávanie | ${SITE_NAME}`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = parseInt(searchParams.page || '1', 10);

  let posts: Awaited<ReturnType<typeof searchPosts>> | null = null;

  if (query) {
    posts = await searchPosts(query, page, 12);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
          Vyhľadávanie
        </h1>
        {query && (
          <p className="text-gray-600">
            Výsledky pre &ldquo;<span className="text-gold">{decodeHtmlEntities(query)}</span>&rdquo;
            {posts && <span className="text-gray-500"> &mdash; {posts.total} výsledkov</span>}
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-500 text-lg">
            Zadajte hľadaný výraz pomocou ikony vyhľadávania v hlavičke.
          </p>
        </div>
      )}

      {query && posts && posts.posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={posts.totalPages}
            baseUrl={`/search?q=${encodeURIComponent(query)}`}
          />
        </>
      )}

      {query && posts && posts.posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Pre výraz &ldquo;{decodeHtmlEntities(query)}&rdquo; sme nenašli žiadne výsledky.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Skúste iný výraz alebo prehliadajte naše kategórie.
          </p>
        </div>
      )}
    </div>
  );
}
