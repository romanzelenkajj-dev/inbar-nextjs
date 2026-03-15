'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LEFT = [
  { label: 'Drinking', href: '/category/drinking' },
  { label: 'Dining',   href: '/category/dining' },
  { label: 'Living',   href: '/category/living' },
];

const NAV_RIGHT = [
  { label: 'O nás',    href: '/o-nas' },
  { label: 'Kontakt',  href: '/kontakt' },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    const onKey = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?s=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-social">
            <a href="https://instagram.com/inbarsk" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
            <a href="https://facebook.com/inbarsk" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
          </div>
          <span className="topbar-date">{today}</span>
        </div>
      </div>

      {/* Main header */}
      <header className="site-header">
        <div className="container header-inner">
          <nav className="nav-left">
            <ul>
              {NAV_LEFT.map(item => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-logo">
            <Link href="/">
              <img src="https://inbar.sk/app/uploads/2020/03/INBAR-LOGO-WEB.png" alt="InBar Magazine" height="52" />
            </Link>
          </div>

          <div className="nav-right">
            <ul>
              {NAV_RIGHT.map(item => (
                <li key={item.href} style={{marginRight:'8px'}}>
                  <Link href={item.href} style={{color:'#ccc', fontSize:'11px', fontWeight:'600', letterSpacing:'.12em', textTransform:'uppercase', padding:'8px 12px', display:'block', transition:'color .2s'}}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <button className="search-btn" onClick={() => setSearchOpen(true)} aria-label="Hladaj">
              <svg viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <div className={`search-overlay${searchOpen ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
        <div className="search-overlay-inner">
          <button className="search-overlay-close" onClick={() => setSearchOpen(false)}>×</button>
          <form onSubmit={handleSearch}>
            <input type="search" placeholder="Hladat clanok..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus={searchOpen} />
            <button type="submit">
              <svg viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
