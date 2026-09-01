import { useCallback, useEffect, useState } from 'react';
import { createProduct, Product, readProducts, writeProducts } from '@/lib/store';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setProducts(readProducts());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(refresh, 180);
    const handleChange = () => refresh();
    window.addEventListener('nixx-store-products-changed', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('nixx-store-products-changed', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, [refresh]);

  const addProduct = useCallback((input: Omit<Product, 'id'>) => {
    const next = [...readProducts(), createProduct(input)];
    writeProducts(next);
    setProducts(next);
  }, []);

  const updateProduct = useCallback((id: string, input: Omit<Product, 'id'>) => {
    const next = readProducts().map((product) => product.id === id ? { ...input, id } : product);
    writeProducts(next);
    setProducts(next);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    const next = readProducts().filter((product) => product.id !== id);
    writeProducts(next);
    setProducts(next);
  }, []);

  return { products, isLoading, addProduct, updateProduct, deleteProduct };
}