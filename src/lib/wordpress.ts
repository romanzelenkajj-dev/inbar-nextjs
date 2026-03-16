import { WPPost, WPCategory, WPPage, CategoryWithChildren, PaginatedPosts } from './types';

const API_BASE = 'https://inbar.sk/wp-json/wp/v2';

export const EXCLUDED_SLUGS = ['masterclass-guest-shift-three-cents-v-bratislave'];

async function fetchAPI<T>(endpoint: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} for ${endpoint}`);
  }
  return res.json();
}

async function fetchAPIWithHeaders(endpoint: string, revalidate = 3600) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} for ${endpoint}`);
  }
  const data = await res.json();
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  return { data, totalPages, total };
}

// Posts
export async function getPosts(page = 1, perPage = 10): Promise<PaginatedPosts> {
  const { data, totalPages, total } = await fetchAPIWithHeaders(
    `/posts?per_page=${perPage}&page=${page}&_embed`
  );
  const posts = (data as WPPost[]).filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
  return { posts, totalPages, total };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (EXCLUDED_SLUGS.includes(slug)) return null;
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  return posts.length > 0 ? posts[0] : null;
}

export async function getPostsByCategory(
  categoryId: number,
  page = 1,
  perPage = 12
): Promise<PaginatedPosts> {
  const { data, totalPages, total } = await fetchAPIWithHeaders(
    `/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_embed`
  );
  const posts = (data as WPPost[]).filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
  return { posts, totalPages, total };
}

export async function searchPosts(query: string, page = 1, perPage = 12): Promise<PaginatedPosts> {
  const { data, totalPages, total } = await fetchAPIWithHeaders(
    `/posts?search=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&_embed`
  );
  const posts = (data as WPPost[]).filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
  return { posts, totalPages, total };
}

export async function getRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  perPage = 4
): Promise<WPPost[]> {
  if (categoryIds.length === 0) return [];
  const posts = await fetchAPI<WPPost[]>(
    `/posts?categories=${categoryIds[0]}&per_page=${perPage + 1}&exclude=${excludeId}&_embed`
  );
  return posts.filter((p) => !EXCLUDED_SLUGS.includes(p.slug)).slice(0, perPage);
}

// Categories
export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/categories?per_page=100');
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const categories = await fetchAPI<WPCategory[]>(`/categories?slug=${encodeURIComponent(slug)}`);
  return categories.length > 0 ? categories[0] : null;
}

export async function getCategoryTree(): Promise<CategoryWithChildren[]> {
  const categories = await getCategories();
  const topLevel = categories.filter((c) => c.parent === 0 && c.slug !== 'nezaradene');
  return topLevel.map((parent) => ({
    ...parent,
    children: categories.filter((c) => c.parent === parent.id),
  }));
}

export async function getChildCategories(parentId: number): Promise<WPCategory[]> {
  const categories = await getCategories();
  return categories.filter((c) => c.parent === parentId);
}

// Pages
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}`);
  return pages.length > 0 ? pages[0] : null;
}

// Helpers
export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return media.source_url;
}

export function getFeaturedImageAlt(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return media?.alt_text || decodeHtmlEntities(post.title.rendered);
}

export function getAuthorName(post: WPPost): string | null {
  const author = post._embedded?.author?.[0];
  const name = author?.name || null;
  if (!name || name === 'InBar Redakcia') return null;
  return name;
}

export function getPostCategories(post: WPPost): Array<{ id: number; name: string; slug: string }> {
  const terms = post._embedded?.['wp:term']?.[0];
  if (!terms) return [];
  return terms.map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#038;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201c')
    .replace(/&#8221;/g, '\u201d')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
}
