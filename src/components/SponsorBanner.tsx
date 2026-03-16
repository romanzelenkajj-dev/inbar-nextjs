import Image from 'next/image';

const bannerConfig = {
  wide: { src: '/banners/pampero-1212x358.jpg', width: 1212, height: 358 },
  medium: { src: '/banners/pampero-770x250.jpg', width: 770, height: 250 },
  square: { src: '/banners/pampero-300x300.jpg', width: 300, height: 300 },
  thin: { src: '/banners/pampero-485x100.jpg', width: 485, height: 100 },
} as const;

interface SponsorBannerProps {
  size: 'wide' | 'medium' | 'square' | 'thin';
  className?: string;
}

export default function SponsorBanner({ size, className }: SponsorBannerProps) {
  const { src, width, height } = bannerConfig[size];

  const sizeClasses = size === 'medium' ? 'max-w-3xl mx-auto py-4' : '';

  return (
    <div className={`text-center ${sizeClasses} ${className ?? ''}`.trim()}>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Reklama</p>
      <a
        href="https://www.alkoshop.sk/?s=pampero&post_type=product&type_aws=true&aws_id=1&aws_filter=1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={src}
          alt="Pampero"
          width={width}
          height={height}
          className="max-w-full h-auto mx-auto"
        />
      </a>
    </div>
  );
}
