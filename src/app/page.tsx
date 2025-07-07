'use client';

import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Veri alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 py-8 min-h-screen">
      <h2 className="text-4xl text-center font-avenir mb-6">Product List</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
