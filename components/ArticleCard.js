import Link from 'next/link';
import { getFeaturedImage, getExcerpt, getPrimaryCategory, formatDate, getCategoryColor } from '@/lib/api';

// ── Full overlay card (hero) ──────────────────────────────────────────────
export function CardFull({ post, size = 'main' }) {
  const img = getFeaturedImage(post);
  const cat = getPrimaryCategory(post);
  const color = getCategoryColor(cat?.slug);
  return (
    <Link href={`/${post.slug}`} className={`hero-${size}`}>
      {img ? <img className="hero-img" src={img} alt={post.title?.rendered || ''} /> : <div className="hero-img" style={{background:'#1a1a1a'}} />}
      <div className="hero-overlay" />
      <div className="hero-content">
        {cat && <span className={`cat-badge ${color}`}>{cat.name}</span>}
        <h2 className="hero-title" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
      </div>
    </Link>
  );
}

// ── Big image card ────────────────────────────────────────────────────────
export function CardBig({ post }) {
  const img = getFeaturedImage(post);
  const cat = getPrimaryCategory(post);
  const color = getCategoryColor(cat?.slug);
  const excerpt = getExcerpt(post);
  return (
    <Link href={`/${post.slug}`} className="card-full">
      <div className="card-full-img">
        {img ? <img src={img} alt={post.title?.rendered || ''} /> : <div className="card-full-img-placeholder" />}
      </div>
      <div className="card-full-overlay" />
      <div className="card-full-content">
        {cat && <span className={`cat-badge ${color}`}>{cat.name}</span>}
        <h3 className="card-title-full" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
        {excerpt && <p className="card-excerpt-full">{excerpt}</p>}
      </div>
    </Link>
  );
}

// ── Horizontal card ───────────────────────────────────────────────────────
export function CardHorizontal({ post }) {
  const img = getFeaturedImage(post, 'medium');
  const cat = getPrimaryCategory(post);
  const color = getCategoryColor(cat?.slug);
  return (
    <Link href={`/${post.slug}`} className="card-h">
      <div className="card-h-img">
        {img ? <img src={img} alt={post.title?.rendered || ''} /> : <div className="card-h-img-placeholder" />}
      </div>
      <div>
        {cat && <span className={`cat-badge cat-badge-sm ${color}`}>{cat.name}</span>}
        <p className="card-h-title" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
        <p className="card-h-excerpt">{getExcerpt(post, 80)}</p>
      </div>
    </Link>
  );
}

// ── Vertical grid card ────────────────────────────────────────────────────
export function CardVertical({ post }) {
  const img = getFeaturedImage(post, 'medium_large');
  const cat = getPrimaryCategory(post);
  const color = getCategoryColor(cat?.slug);
  return (
    <Link href={`/${post.slug}`} className="card-v">
      <div className="card-v-img">
        {img ? <img src={img} alt={post.title?.rendered || ''} /> : <div className="card-v-img-placeholder" />}
      </div>
      {cat && <span className={`cat-badge cat-badge-sm ${color}`}>{cat.name}</span>}
      <p className="card-v-title" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
      <p className="card-v-excerpt">{getExcerpt(post)}</p>
    </Link>
  );
}
