import { getPosts, getCategory, getCategoryColor } from '@/lib/api';
import { CardVertical } from '@/components/ArticleCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const cat = await getCategory(params.slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description || `Všetky články v kategórii ${cat.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const cat = await getCategory(params.slug);
  if (!cat) notFound();

  const page = parseInt(searchParams?.page || '1', 10);
  const { posts, total } = await getPosts({ perPage: 12, page, categoryId: cat.id });
  const totalPages = Math.ceil(total / 12);
  const color = getCategoryColor(params.slug);

  return (
    <>
      <div className="archive-header">
        <div className="container">
          <span className={`cat-badge ${color}`} style={{marginBottom:'12px',display:'inline-block'}}>{cat.name}</span>
          <h1 className="archive-title">{cat.name}</h1>
          {cat.description && <p className="archive-desc">{cat.description}</p>}
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p style={{padding:'48px 0', color:'#888'}}>Žiadne články v tejto kategórii.</p>
        ) : (
          <div className="archive-grid">
            {posts.map(post => <CardVertical key={post.id} post={post} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && (
              <Link href={`/category/${params.slug}?page=${page - 1}`} className="page-numbers">← Predchádzajúca</Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/category/${params.slug}?page=${p}`} className={`page-numbers${p === page ? ' current' : ''}`}>{p}</Link>
            ))}
            {page < totalPages && (
              <Link href={`/category/${params.slug}?page=${page + 1}`} className="page-numbers">Ďalšia →</Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
