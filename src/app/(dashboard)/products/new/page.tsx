import type { Metadata } from 'next';
import { ProductForm } from '@/components/products/product-form';
import { requireRole } from '@/lib/auth/authorization';
export const metadata: Metadata = { title: 'Add Product' };
export default async function NewProductPage() {
  await requireRole(['admin', 'manager']);
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold">Add product</h1>
      <p className="mb-6 text-slate-600">All fields are validated before submission.</p>
      <ProductForm />
    </section>
  );
}
