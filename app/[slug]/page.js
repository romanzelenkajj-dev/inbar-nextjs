import { getPost, getPosts, getFeaturedImage, getPrimaryCategory, formatDate, getCategoryColor } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  const img = getFeaturedImage(post);
  return {
    title: post.title?.rendered?.replace(/<[^>]+>/g, ''),
    description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160),
    openGraph: img ? { images: [img] } : {},
  };
}

export default async function SinglePost({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const img = getFeaturedImage(post, 'full');
  const cat = getPrimaryCategory(post);
  const color = getCategoryColor(cat?.slug);
  const date = formatDate(post.date);

  // Related posts from same category
  const { posts: related } = cat
    ? await (async () => {
        const { getPosts: gp } = await import('@/lib/api');
        return gp({ perPage: 3, categoryId: cat.id });
      })()
    : { posts: [] };
  const relatedFiltered = related.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="single-hero">
        <div className="single-hero-inner">
          {cat && (
            <div className="single-cat">
              <Link href={`/category/${cat.slug}`}>
                <span className={`cat-badge ${color}`}>{cat.name}</span>
              </Link>
            </div>
          )}
          <h1 className="single-title" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
          <p className="single-meta">
            {date}
            {cat && <> · <Link href={`/category/${cat.slug}`}>{cat.name}</Link></>}
          </p>
        </div>
        {img && (
          <div className="single-featured">
            <img src={img} alt={post.title?.rendered?.replace(/<[^>]+>/g, '') || ''} />
          </div>
        )}
      </div>

      {/* Content */}
      <article
        className="single-content"
        dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
      />

      {/* Related */}
      {relatedFiltered.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Podobné články</h2>
            </div>
            <div className="articles-grid">
              {relatedFiltered.map(p => {
                const pImg = getFeaturedImage(p, 'medium_large');
                const pCat = getPrimaryCategory(p);
                const pColor = getCategoryColor(pCat?.slug);
                return (
                  <Link key={p.id} href={`/${p.slug}`} className="card-v">
                    <div className="card-v-img">
                      {pImg ? <img src={pImg} alt="" /> : <div className="card-v-img-placeholder" />}
                    </div>
                    {pCat && <span className={`cat-badge cat-badge-sm ${pColor}`}>{pCat.name}</span>}
                    <p className="card-v-title" dangerouslySetInnerHTML={{ __html: p.title?.rendered }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
