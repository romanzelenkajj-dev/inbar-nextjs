export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

// Category slug mapping for navigation
export const MAIN_CATEGORIES = [
  { name: 'Drinking', slug: 'drinking', id: 6 },
  { name: 'Dining', slug: 'dining', id: 12 },
  { name: 'Living', slug: 'living', id: 13 },
] as const;

export const NAV_LINKS = [
  { name: 'O nás', href: '/o-nas' },
  { name: 'Kontakt', href: '/kontakt' },
] as const;

export const FOOTER_LINKS = [
  { name: 'O nás', href: '/o-nas' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Inzercia', href: '/inzercia' },
  { name: 'Ochrana súkromia', href: '/ochrana-sukromia' },
  { name: 'Cookies', href: '/cookies' },
] as const;

export const SITE_NAME = 'InBar&Restaurant';
export const SITE_DESCRIPTION = 'Slovenský magazín o gastronómii, nápojovej kultúre a životnom štýle pre tých, ktorí si vedia vychutnať každý moment.';
export const SITE_URL = 'https://inbar-nextjs.vercel.app';
