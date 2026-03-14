import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Stránka sa nenašla</h2>
      <p>Článok alebo stránka, ktorú hľadáte, neexistuje.</p>
      <div className="search-form" style={{marginTop:'32px'}}>
        <Link href="/" style={{padding:'12px 32px', background:'var(--amber)', color:'white', borderRadius:'var(--radius)', fontWeight:'600', fontSize:'13px', letterSpacing:'.08em'}}>
          ← Späť na úvod
        </Link>
      </div>
    </div>
  );
}
