const WP_API = process.env.NEXT_PUBLIC_WP_API || 'https://inbar.sk/wp-json/wp/v2';

// ── Posts ──────────────────────────────────────────────────────────────────

export async function getPosts({ perPage = 10, page = 1, categoryId = '', embed = true } = {}) {
  try {
    const params = new URLSearchParams({ per_page: perPage, page });
    if (categoryId) params.set('categories', categoryId);
    if (embed) params.set('_embed', '1');
    const res = await fetch(`${WP_API}/posts?${params}`, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: [], total: 0 };
    const posts = await res.json();
    const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
    return { posts, total };
  } catch { return { posts: [], total: 0 }; }
}

export async function getPost(slug) {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
  } catch { return null; }
}

// ── Categories ────────────────────────────────────────────────────────────

export async function getCategories() {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=100&hide_empty=true`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function getCategory(slug) {
  try {
    const res = await fetch(`${WP_API}/categories?slug=${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const cats = await res.json();
    return cats[0] || null;
  } catch { return null; }
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function getFeaturedImage(post, size = 'large') {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  return media.media_details?.sizes?.[size]?.source_url || media.source_url || null;
}

export function getExcerpt(post, maxLength = 120) {
  const raw = post?.excerpt?.rendered || post?.content?.rendered || '';
  const text = raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.slice(0, maxLength).replace(/\s\S*$/, '') + '…' : text;
}

export function getPrimaryCategory(post) {
  const terms = post?._embedded?.['wp:term']?.[0] || [];
  return terms.find(t => t.taxonomy === 'category' && t.slug !== 'uncategorized') || terms[0] || null;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('sk-SK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Category badge colour mapping
export const CATEGORY_COLORS = {
  drinking: 'amber',
  dining:   'green',
  living:   'blue',
  default:  'amber',
};

export function getCategoryColor(slug = '') {
  return CATEGORY_COLORS[slug.toLowerCase()] || CATEGORY_COLORS.default;
}
