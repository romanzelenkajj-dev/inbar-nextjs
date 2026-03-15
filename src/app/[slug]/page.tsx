import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getRelatedPosts,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getAuthorName,
  getPostCategories,
  decodeHtmlEntities,
} from '@/lib/wordpress';
import { formatDate, stripHtml, truncateText, SITE_URL } from '@/lib/utils';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Článok nenájdený' };

  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncateText(stripHtml(decodeHtmlEntities(post.excerpt.rendered)), 160);
  const imageUrl = getFeaturedImageUrl(post);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      url: `${SITE_URL}/${post.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const title = decodeHtmlEntities(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post);
  const imageAlt = getFeaturedImageAlt(post);
  const authorName = getAuthorName(post);
  const categories = getPostCategories(post);
  const relatedPosts = await getRelatedPosts(post.categories, post.id, 4);
  const articleUrl = `${SITE_URL}/${post.slug}`;

  return (
    <article>
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-10">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="text-xs font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-dark-border">
          <span>{authorName}</span>
          <span className="text-dark-border">|</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <div className="ml-auto">
            <ShareButtons url={articleUrl} title={title} />
          </div>
        </div>

        {/* Content */}
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Bottom Share */}
        <div className="mt-12 pt-8 border-t border-dark-border">
          <ShareButtons url={articleUrl} title={title} />
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent mb-12" />
          <h2 className="text-2xl font-serif font-bold text-white mb-8">
            Súvisiace články
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((relPost) => (
              <ArticleCard key={relPost.id} post={relPost} showExcerpt={false} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
