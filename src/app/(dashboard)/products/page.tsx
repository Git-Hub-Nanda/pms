import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const ProductList = dynamic(() => import('@/components/products/product-list').then((mod) => mod.ProductList), {
  loading: () => <p className="text-slate-600">Loading products…</p>,
});
export const metadata: Metadata = { title: 'Products' };
export default function ProductsPage() {
  return <ProductList />;
}
