import { getPosts, getCategories } from '@/lib/api';
import { CardFull, CardVertical } from '@/components/ArticleCard';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'InBar Magazine — Drinking, Dining, Living',
  description: 'Slovenský magazín o baroch, reštauráciách a životnom štýle.',
};

async function getCategoryPosts(categories, slug, count = 4) {
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return [];
  const { posts } = await getPosts({ perPage: count, categoryId: cat.id });
  return posts;
}

export default async function HomePage() {
  const categories = await getCategories();
  const { posts: latestPosts } = await getPosts({ perPage: 3 });

  const heroPosts = latestPosts.slice(0, 3);

  const drinkingPosts = await getCategoryPosts(categories, 'drinking', 4);
  const diningPosts   = await getCategoryPosts(categories, 'dining', 4);
  const livingPosts   = await getCategoryPosts(categories, 'living', 3);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      {heroPosts.length > 0 && (
        <section className="hero">
          <div className="hero-grid">
            {heroPosts[0] && <CardFull post={heroPosts[0]} size="main" />}
            {heroPosts[1] && <CardFull post={heroPosts[1]} size="sub" />}
            {heroPosts[2] && <CardFull post={heroPosts[2]} size="sub" />}
          </div>
        </section>
      )}

      {/* ── Ad strip ────────────────────────────────────────────── */}
      <div className="ad-strip">
        <div className="container ad-strip-inner">
          <span className="ad-label">Reklama</span>
          <span style={{color:'#ccc', fontSize:'13px'}}>— priestor pre vašu reklamu —</span>
        </div>
      </div>

      {/* ── Drinking ─────────────────────────────────────────────── */}
      {drinkingPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Drinking</h2>
              <Link href="/category/drinking" className="section-link">Všetko z Drinking →</Link>
            </div>
            <div className="articles-grid">
              {drinkingPosts.map(post => <CardVertical key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Dining ───────────────────────────────────────────────── */}
      {diningPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title green">Dining</h2>
              <Link href="/category/dining" className="section-link">Všetko z Dining →</Link>
            </div>
            <div className="articles-grid">
              {diningPosts.map(post => <CardVertical key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Living ───────────────────────────────────────────────── */}
      {livingPosts.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Living</h2>
              <Link href="/category/living" className="section-link">Všetko z Living →</Link>
            </div>
            <div className="articles-grid">
              {livingPosts.map(post => <CardVertical key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
