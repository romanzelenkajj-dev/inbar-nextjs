import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/logo.png" alt="InBar Magazine" height="44" />
            </div>
            <p className="footer-tagline">Bar & Restaurant Magazine</p>
            <p className="footer-desc">Slovenský magazín o baroch, reštauráciách a životnom štýle. Drinking, Dining, Living.</p>
            <div className="footer-social">
              <a href="https://instagram.com/inbarsk" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://facebook.com/inbarsk" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            </div>
          </div>

          <div>
            <p className="footer-nav-title">Kategórie</p>
            <ul className="footer-nav-list">
              <li><Link href="/category/drinking">Drinking</Link></li>
              <li><Link href="/category/dining">Dining</Link></li>
              <li><Link href="/category/living">Living</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-nav-title">Kontakt</p>
            <div className="footer-contact-person">
              InBar &amp; Restaurant s.r.o.<br />
              <a href="mailto:info@inbar.sk">info@inbar.sk</a>
            </div>
            <ul className="footer-nav-list">
              <li><Link href="/o-nas">O nás</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/inzercia">Inzercia</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} InBar Magazine. Všetky práva vyhradené.</span>
          <div className="footer-bottom-links">
            <Link href="/ochrana-sukromia">Ochrana súkromia</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
