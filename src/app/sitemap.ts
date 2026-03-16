import { MetadataRoute } from 'next';
import { EXCLUDED_SLUGS } from '@/lib/wordpress';

const SITE_URL = 'https://inbar-nextjs.vercel.app';
const WP_API = 'https://inbar.sk/wp-json/wp/v2';

interface WPPostSlug {
  slug: string;
  modified: string;
}

async function getAllPostSlugs(): Promise<WPPostSlug[]> {
  const posts: WPPostSlug[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${WP_API}/posts?per_page=100&_fields=slug,modified&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) break;

    const data: WPPostSlug[] = await res.json();
    if (data.length === 0) break;

    posts.push(...data);

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    if (page >= totalPages) break;
    page++;
  }

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${SITE_URL}/category/drinking`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/category/dining`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/category/living`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/o-nas`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/inzercia`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/ochrana-sukromia`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/cookies`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const postPages = posts.filter((post) => !EXCLUDED_SLUGS.includes(post.slug)).map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
