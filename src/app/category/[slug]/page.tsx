import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getPostsByCategory,
  getChildCategories,
  getCategories,
  decodeHtmlEntities,
  EXCLUDED_SLUGS,
} from '@/lib/wordpress';
import { SITE_NAME } from '@/lib/utils';
import CategoryArticleGrid from '@/components/CategoryArticleGrid';
import { WPPost } from '@/lib/types';
import { PaginatedPosts } from '@/lib/types';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { sub?: string };
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

// Fetch posts from multiple categories combined
async function getPostsFromMultipleCategories(
  categoryIds: number[],
  page: number,
  perPage: number
): Promise<PaginatedPosts> {
  const res = await fetch(
    `https://inbar.sk/wp-json/wp/v2/posts?categories=${categoryIds.join(',')}&per_page=${perPage}&page=${page}&_embed`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    return { posts: [], totalPages: 1, total: 0 };
  }
  const data = await res.json();
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  const posts = (data as WPPost[]).filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
  return { posts, totalPages, total };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const subCategorySlug = searchParams.sub;
  const childCategories = await getChildCategories(category.id);

  const isLiving = params.slug === 'living';

  // Build display tabs
  type TabItem = { id: number | string; name: string; slug: string; isLifestyle?: boolean };
  let displayTabs: TabItem[] = [];

  if (isLiving) {
    // Filter out AUTO, merge DIZAJN + ETIKETA into Lifestyle
    const filtered = childCategories.filter(
      (c) => c.slug !== 'auto' && c.id !== 49 && c.id !== 41
    );
    displayTabs = filtered.map((c) => ({ id: c.id, name: decodeHtmlEntities(c.name), slug: c.slug }));
    displayTabs.push({ id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', isLifestyle: true });
  } else {
    displayTabs = childCategories.map((c) => ({ id: c.id, name: decodeHtmlEntities(c.name), slug: c.slug }));
  }

  // Determine which category to fetch posts from
  let activeCategoryId: number | null = null;
  let activeSubSlug: string | undefined;
  let postsResult: PaginatedPosts;

  if (subCategorySlug) {
    if (isLiving && subCategorySlug === 'lifestyle') {
      // Fetch from both DIZAJN (49) and ETIKETA (41)
      activeSubSlug = 'lifestyle';
      postsResult = await getPostsFromMultipleCategories([49, 41], 1, 12);
    } else {
      const allCategories = await getCategories();
      const subCat = allCategories.find(
        (c) => c.slug === subCategorySlug && c.parent === category.id
      );
      if (subCat) {
        activeCategoryId = subCat.id;
        activeSubSlug = subCat.slug;
      }
      postsResult = await getPostsByCategory(activeCategoryId || category.id, 1, 12);
    }
  } else {
    postsResult = await getPostsByCategory(category.id, 1, 12);
  }

  const { posts, totalPages } = postsResult;

  // Determine which category IDs to use for client-side load-more
  let fetchCategoryIds: number[];
  if (isLiving && activeSubSlug === 'lifestyle') {
    fetchCategoryIds = [49, 41];
  } else if (activeCategoryId) {
    fetchCategoryIds = [activeCategoryId];
  } else {
    fetchCategoryIds = [category.id];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          {decodeHtmlEntities(category.name)}
        </h1>
        {category.description && (
          <p className="text-gray-600 text-lg max-w-2xl">
            {decodeHtmlEntities(category.description)}
          </p>
        )}
      </div>

      {/* Subcategory Tabs */}
      {displayTabs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-gray-200">
          <Link
            href={`/category/${params.slug}`}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              !activeSubSlug
                ? 'bg-gold text-dark font-semibold'
                : 'bg-white text-gray-600 hover:text-gold border border-gray-200'
            }`}
          >
            Všetky
          </Link>
          {displayTabs.map((sub) => (
            <Link
              key={sub.slug}
              href={`/category/${params.slug}?sub=${sub.slug}`}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                activeSubSlug === sub.slug
                  ? 'bg-gold text-dark font-semibold'
                  : 'bg-white text-gray-600 hover:text-gold border border-gray-200'
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid with Load More */}
      <CategoryArticleGrid
        initialPosts={posts}
        initialTotalPages={totalPages}
        categoryIds={fetchCategoryIds}
        perPage={12}
      />
    </div>
  );
}
