import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getPostsByCategory,
  getChildCategories,
  getCategories,
  decodeHtmlEntities,
} from '@/lib/wordpress';
import { SITE_NAME } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { page?: string; sub?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: 'Kategória nenájdená' };

  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: category.description || `Články v kategórii ${category.name}`,
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description: category.description || `Články v kategórii ${category.name}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const page = parseInt(searchParams.page || '1', 10);
  const subCategorySlug = searchParams.sub;
  const childCategories = await getChildCategories(category.id);

  // Determine which category to fetch posts from
  let activeCategoryId = category.id;
  let activeSubSlug: string | undefined;

  if (subCategorySlug) {
    const allCategories = await getCategories();
    const subCat = allCategories.find(
      (c) => c.slug === subCategorySlug && c.parent === category.id
    );
    if (subCat) {
      activeCategoryId = subCat.id;
      activeSubSlug = subCat.slug;
    }
  }

  const { posts, totalPages } = await getPostsByCategory(activeCategoryId, page, 12);

  const baseUrl = activeSubSlug
    ? `/category/${params.slug}?sub=${activeSubSlug}`
    : `/category/${params.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
          {decodeHtmlEntities(category.name)}
        </h1>
        {category.description && (
          <p className="text-gray-400 text-lg max-w-2xl">
            {decodeHtmlEntities(category.description)}
          </p>
        )}
      </div>

      {/* Subcategory Tabs */}
      {childCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-dark-border">
          <Link
            href={`/category/${params.slug}`}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              !activeSubSlug
                ? 'bg-gold text-dark font-semibold'
                : 'bg-dark-card text-gray-400 hover:text-gold border border-dark-border'
            }`}
          >
            Všetky
          </Link>
          {childCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/category/${params.slug}?sub=${sub.slug}`}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                activeSubSlug === sub.slug
                  ? 'bg-gold text-dark font-semibold'
                  : 'bg-dark-card text-gray-400 hover:text-gold border border-dark-border'
              }`}
            >
              {decodeHtmlEntities(sub.name)}
              <span className="ml-1 text-xs opacity-60">({sub.count})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid */}
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

      <Pagination currentPage={page} totalPages={totalPages} baseUrl={baseUrl} />
    </div>
  );
}
