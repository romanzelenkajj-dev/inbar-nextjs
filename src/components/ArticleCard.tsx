import Image from 'next/image';
import Link from 'next/link';
import { WPPost } from '@/lib/types';
import { getFeaturedImageUrl, getFeaturedImageAlt, decodeHtmlEntities, getPostCategories } from '@/lib/wordpress';
import { formatDateShort, stripHtml, truncateText } from '@/lib/utils';

interface ArticleCardProps {
  post: WPPost;
  variant?: 'default' | 'large' | 'compact';
  showExcerpt?: boolean;
  showCategory?: boolean;
}

export default function ArticleCard({
  post,
  variant = 'default',
  showExcerpt = true,
  showCategory = true,
}: ArticleCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const imageAlt = getFeaturedImageAlt(post);
  const title = decodeHtmlEntities(post.title.rendered);
  const excerpt = truncateText(stripHtml(decodeHtmlEntities(post.excerpt.rendered)), 120);
  const categories = getPostCategories(post);
  const firstCategory = categories[0];

  if (variant === 'large') {
    return (
      <Link href={`/${post.slug}`} className="group block relative overflow-hidden rounded-xl">
        <div className="aspect-[16/9] md:aspect-[2/1] relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-dark-card" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            {showCategory && firstCategory && (
              <span className="inline-block text-xs font-medium tracking-widest uppercase text-gold mb-3" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                {firstCategory.name}
              </span>
            )}
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight mb-3 group-hover:text-gold transition-colors duration-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
              {title}
            </h2>
            {showExcerpt && (
              <p className="text-gray-300 text-sm md:text-base max-w-2xl hidden md:block" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {excerpt}
              </p>
            )}
            <time className="text-xs text-gray-400 mt-3 block">
              {formatDateShort(post.date)}
            </time>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/${post.slug}`} className="group flex gap-4 items-start">
        {imageUrl && (
          <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="96px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {showCategory && firstCategory && (
            <span className="text-[10px] font-medium tracking-widest uppercase text-gold">
              {firstCategory.name}
            </span>
          )}
          <h3 className="text-sm font-serif font-semibold text-white leading-snug mt-1 group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <time className="text-[11px] text-gray-500 mt-1 block">
            {formatDateShort(post.date)}
          </time>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-dark-card" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div>
        {showCategory && firstCategory && (
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold">
            {firstCategory.name}
          </span>
        )}
        <h3 className="text-lg font-serif font-semibold text-white leading-snug mt-1 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        {showExcerpt && (
          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            {excerpt}
          </p>
        )}
        <time className="text-xs text-gray-500 mt-2 block">
          {formatDateShort(post.date)}
        </time>
      </div>
    </Link>
  );
}
