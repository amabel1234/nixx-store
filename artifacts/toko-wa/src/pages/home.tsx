import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ChevronDown, PackageOpen, Search, ShieldCheck, Store, Truck } from 'lucide-react';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { BrandMark } from '@/components/brand-mark';

export default function Home() {
  const { products, isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState('featured');
  const categories = useMemo(() => ['Semua', ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return [...products]
      .filter((product) => category === 'Semua' || product.category === category)
      .filter((product) => !term || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(term))
      .sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : Number(b.featured) - Number(a.featured));
  }, [products, search, category, sort]);

  return (
    <div className="grain min-h-[100dvh] bg-[hsl(var(--background))]">
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border)/.75)] bg-[hsl(var(--background)/.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="focus-ring rounded-xl" data-testid="link-home-brand"><BrandMark /></Link>
          <nav className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1.5 rounded-full bg-[hsl(var(--secondary))] px-3 py-2 text-xs font-semibold text-[hsl(var(--primary))] sm:flex"><span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" /> Buka setiap hari</span>
            <Link href="/admin" className="focus-ring rounded-full border border-[hsl(var(--border))] px-3.5 py-2 text-xs font-bold text-[hsl(var(--primary))] transition hover:border-[hsl(var(--primary)/.35)] hover:bg-[hsl(var(--secondary)/.5)]" data-testid="link-admin">Kelola toko</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 pt-12 lg:grid-cols-[1fr_370px] lg:items-end lg:px-8 lg:pb-20 lg:pt-20">
          <div className="animate-rise-in">
            <p className="mono-font mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)/.35)] bg-[hsl(var(--accent)/.1)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]"><Store size={13} /> Belanja dekat, ngobrol mudah</p>
            <h1 className="display-font max-w-[730px] text-[clamp(3.25rem,8vw,6.7rem)] font-bold leading-[.91] tracking-[-.07em] text-[hsl(var(--primary))]">Yang dibutuhkan,<br /><span className="text-[hsl(var(--accent))]">tinggal chat.</span></h1>
            <p className="mt-7 max-w-[470px] text-[16px] leading-relaxed text-[hsl(var(--muted-foreground))]">Pilihan kebutuhan rumah dan camilan rumahan dari toko tetangga. Lihat barangnya, klik belinya, lanjut ngobrol di WhatsApp.</p>
            <a href="#katalog" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--accent))] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_hsl(var(--accent))]" data-testid="link-browse-catalog">Lihat katalog <ArrowRight size={17} /></a>
          </div>
          <div className="animate-soft-pop relative overflow-hidden rounded-[28px] bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-lg)] lg:mb-1">
            <div className="absolute -right-10 -top-12 size-40 rounded-full border-[20px] border-[hsl(var(--accent)/.6)]" />
            <div className="absolute -bottom-14 -left-12 size-40 rounded-full border-[20px] border-[hsl(var(--secondary)/.25)]" />
            <div className="relative">
              <p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary-foreground)/.65)]">Cara belanja</p>
              <div className="mt-6 space-y-5">
                {[['01', 'Pilih kebutuhanmu', 'Semua produk ada di satu tempat.'], ['02', 'Klik Beli via WA', 'Pesan otomatis sudah kami siapkan.'], ['03', 'Tinggal ngobrol', 'Konfirmasi stok dan pengiriman langsung.']].map(([number, title, text]) => (
                  <div className="flex gap-3.5" key={number}><span className="mono-font grid size-7 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent))] text-[10px] font-bold text-[hsl(var(--accent-foreground))]">{number}</span><div><p className="font-bold">{title}</p><p className="mt-0.5 text-xs text-[hsl(var(--primary-foreground)/.68)]">{text}</p></div></div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-2 border-t border-[hsl(var(--primary-foreground)/.18)] pt-4 text-xs text-[hsl(var(--primary-foreground)/.72)]"><ShieldCheck size={16} className="text-[hsl(var(--accent))]" /> Aman, jelas, tanpa langkah berbelit</div>
            </div>
          </div>
        </section>

        <section id="katalog" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 pb-20 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-5 border-t border-[hsl(var(--border))] pt-7 sm:flex-row sm:items-end">
            <div><p className="mono-font text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--accent))]">Katalog hari ini</p><h2 className="display-font mt-1 text-3xl font-bold tracking-[-.045em] text-[hsl(var(--primary))]">Ambil yang perlu.</h2></div>
            <div className="relative w-full sm:max-w-[280px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk..." className="focus-ring w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary)/.5)]" data-testid="input-search-products" /></div>
          </div>
          <div className="mb-7 flex flex-wrap items-center gap-2">
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">{categories.map((item) => <button onClick={() => setCategory(item)} className={`focus-ring shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition ${category === item ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))]'}`} key={item} data-testid={`button-category-${item.toLowerCase()}`}>{item}</button>)}</div>
            <label className="relative ml-auto flex shrink-0 items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><span className="hidden sm:block">Urutkan</span><ChevronDown size={14} className="pointer-events-none absolute right-2" /><select value={sort} onChange={(event) => setSort(event.target.value)} className="focus-ring appearance-none rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2 pl-3 pr-7 text-xs font-semibold text-[hsl(var(--foreground))] outline-none" data-testid="select-sort-products"><option value="featured">Pilihan toko</option><option value="price-low">Harga terendah</option><option value="price-high">Harga tertinggi</option></select></label>
          </div>
          {isLoading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div className="overflow-hidden rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))]" key={item}><div className="skeleton aspect-[1.08]" /><div className="space-y-3 p-4"><div className="skeleton h-2 w-16 rounded" /><div className="skeleton h-7 w-full rounded" /><div className="skeleton h-4 w-3/4 rounded" /></div></div>)}</div>
            : filteredProducts.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
            : <div className="animate-soft-pop rounded-[24px] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/.55)] px-6 py-16 text-center"><PackageOpen className="mx-auto text-[hsl(var(--accent))]" size={35} /><h3 className="display-font mt-4 text-2xl font-bold text-[hsl(var(--primary))]" data-testid="text-empty-catalog">Produk tidak ditemukan</h3><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Coba kata kunci lain atau pilih kategori Semua.</p><button onClick={() => { setSearch(''); setCategory('Semua'); }} className="focus-ring mt-5 rounded-full bg-[hsl(var(--secondary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary))]" data-testid="button-reset-catalog">Atur ulang pencarian</button></div>}
        </section>

        <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.42)]">
          <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8">
            {[[Truck, 'Antar sekitar toko', 'Tanyakan area antar langsung lewat chat.'], [Check, 'Harga transparan', 'Harga yang terlihat adalah harga yang kamu tanyakan.'], [ShieldCheck, 'Pemilik yang responsif', 'Satu chat langsung sampai ke orang toko.']].map(([Icon, title, text]) => <div className="flex gap-3" key={title as string}><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[hsl(var(--card))] text-[hsl(var(--primary))]"><Icon size={17} /></span><div><p className="font-bold text-[hsl(var(--primary))]">{title as string}</p><p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{text as string}</p></div></div>)}
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-8 text-xs text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between lg:px-8"><BrandMark compact /><p>Belanja santai dari toko dekat rumah.</p></footer>
    </div>
  );
}