import { getPosts, getCategory } from '@/lib/api';
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

  return (
    <>
      <div className="archive-header">
        <div className="container" style={{textAlign:'center'}}>
          <h1 className="archive-title" style={{textTransform:'uppercase', textAlign:'center', letterSpacing:'0.08em'}}>{cat.name}</h1>
          {cat.description && <p className="archive-desc" style={{textAlign:'center'}}>{cat.description}</p>}
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
        {page < totalPages && (
          <div style={{textAlign:'center', padding:'48px 0 32px'}}>
            <Link href={`/category/${params.slug}?page=${page + 1}`} className="btn-nacitat-viac">
              Načítať viac
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
