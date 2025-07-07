import ProductList from '@/components/ProductList';


async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.products;
}

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="px-4 py-8 min-h-screen">
      <h2 className="text-3xl text-center font-avenir mb-6">Product List</h2>
      <ProductList products={products} />
    </div>
  );
}
