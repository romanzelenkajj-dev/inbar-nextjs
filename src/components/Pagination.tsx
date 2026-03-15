import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const getUrl = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Stránkovanie">
      {currentPage > 1 && (
        <Link
          href={getUrl(currentPage - 1)}
          className="px-3 py-2 text-sm text-gray-400 hover:text-gold transition-colors"
        >
          &larr; Predošlá
        </Link>
      )}

      {pages.map((page, i) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-600">
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getUrl(page)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-gold text-dark font-semibold'
                : 'text-gray-400 hover:text-gold hover:bg-dark-card'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={getUrl(currentPage + 1)}
          className="px-3 py-2 text-sm text-gray-400 hover:text-gold transition-colors"
        >
          Ďalšia &rarr;
        </Link>
      )}
    </nav>
  );
}
