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
import { stripHtml, truncateText, SITE_URL, SITE_NAME } from '@/lib/utils';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import SponsorBanner from '@/components/SponsorBanner';

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
    alternates: {
      canonical: `${SITE_URL}/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: post.date,
    dateModified: post.modified,
    author: authorName ? { '@type': 'Person', name: authorName } : { '@type': 'Organization', name: SITE_NAME },
    image: imageUrl || undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'https://inbar.sk/app/uploads/2020/03/INBAR-LOGO-WEB.png',
      },
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative w-full min-h-[60vh] md:min-h-[65vh] flex flex-col">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" style={{ top: '40%' }} />
          <div className="absolute inset-0 bg-dark/20" />
          {/* Title & categories inside hero */}
          <div className="relative z-10 mt-auto max-w-3xl mx-auto w-full px-4 pb-10 pt-16">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-8 mb-8 pb-8 border-b border-gray-200">
          {authorName && <span className="text-gray-700">{authorName}</span>}
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
        <div className="mt-12 pt-8 border-t border-gray-200">
          <ShareButtons url={articleUrl} title={title} />
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
            Súvisiace články
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((relPost) => (
              <ArticleCard key={relPost.id} post={relPost} showExcerpt={false} />
            ))}
          </div>
        </section>
      )}

      {/* Sponsor Banner */}
      <SponsorBanner size="medium" className="my-4 max-w-3xl mx-auto px-4" />
    </article>
  );
}
