export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
};

const STORAGE_KEY = 'nixx-store-products-v1';

export const seedProducts: Product[] = [
  {
    id: 'beras-pandan-wangi',
    name: 'Beras Pandan Wangi 5 kg',
    price: 78500,
    description: 'Pulen, harum, dan pas untuk stok makan sekeluarga.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Sembako',
    featured: true,
  },
  {
    id: 'kopi-arabika-gayo',
    name: 'Kopi Arabika Gayo 200 g',
    price: 46000,
    description: 'Roast medium dengan rasa cokelat dan sedikit citrus.',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Minuman',
    featured: true,
  },
  {
    id: 'sambal-bawang-rumahan',
    name: 'Sambal Bawang Rumahan 150 ml',
    price: 28000,
    description: 'Pedas gurih, dibuat dalam batch kecil setiap minggu.',
    image: 'https://images.pexels.com/photos/6605652/pexels-photo-6605652.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Dapur',
    featured: false,
  },
  {
    id: 'sabun-cuci-piring',
    name: 'Sabun Cuci Piring Jeruk 800 ml',
    price: 19500,
    description: 'Busa ringan, wangi segar, dan hemat untuk pemakaian harian.',
    image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Rumah',
    featured: false,
  },
];

export function readProducts(): Product[] {
  if (typeof window === 'undefined') return seedProducts;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
      return seedProducts;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : seedProducts;
  } catch {
    return seedProducts;
  }
}

export function writeProducts(products: Product[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent('nixx-store-products-changed'));
}

export function createProduct(input: Omit<Product, 'id'>): Product {
  return { ...input, id: `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'produk'}-${Date.now()}` };
}