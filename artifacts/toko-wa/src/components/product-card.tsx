import { ArrowUpRight, MessageCircle, Star } from 'lucide-react';
import { Product } from '@/lib/store';

export function formatPrice(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value).replace('Rp', 'Rp ');
}

export function waLink(product: Product) {
  const message = `Halo Nixx store, saya mau beli ${product.name} seharga ${formatPrice(product.price)}. Apakah masih tersedia?`;
  return `https://wa.me/6283182791150?text=${encodeURIComponent(message)}`;
}

function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[hsl(var(--secondary))] ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
        onError={(event) => { event.currentTarget.style.display = 'none'; }}
        data-testid={`img-product-${product.id}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.22)] to-transparent" />
      {product.featured && (
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[hsl(var(--card)/.9)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[hsl(var(--primary))] backdrop-blur-sm" data-testid={`badge-featured-${product.id}`}>
          <Star size={11} fill="currentColor" /> Pilihan toko
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className={`group animate-rise-in overflow-hidden rounded-[22px] border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] delay-${Math.min(index + 1, 4)}`} data-testid={`card-product-${product.id}`}>
      <ProductImage product={product} className="aspect-[1.08]" />
      <div className="p-4.5">
        <p className="mono-font mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]" data-testid={`text-category-${product.id}`}>{product.category}</p>
        <h3 className="display-font min-h-[2.9rem] text-[19px] font-semibold leading-[1.15] tracking-[-.025em]" data-testid={`text-name-${product.id}`}>{product.name}</h3>
        <p className="mt-2 min-h-[2.5rem] text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))]" data-testid={`text-description-${product.id}`}>{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[hsl(var(--border))] pt-3.5">
          <p className="display-font text-[18px] font-bold text-[hsl(var(--primary))]" data-testid={`text-price-${product.id}`}>{formatPrice(product.price)}</p>
          <a href={waLink(product)} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary))] px-3.5 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))] transition hover:bg-[hsl(var(--primary)/.88)] active:scale-95" data-testid={`link-buy-${product.id}`}>
            <MessageCircle size={15} /> Beli via WA <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}