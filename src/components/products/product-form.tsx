'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddProductMutation, useGetCategoriesQuery } from '@/features/products/products-api';
import { productSchema, type ProductInput } from '@/lib/validation/product';
import { Button } from '@/components/ui/button';
const fields: Array<{ name: keyof ProductInput; label: string; type?: string }> = [
  { name: 'title', label: 'Title' },
  { name: 'brand', label: 'Brand' },
  { name: 'description', label: 'Description' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'stock', label: 'Stock', type: 'number' },
  { name: 'discountPercentage', label: 'Discount percentage', type: 'number' },
  { name: 'rating', label: 'Rating', type: 'number' },
  { name: 'thumbnail', label: 'Thumbnail URL' },
  { name: 'image', label: 'Product image URL' },
];
export function ProductForm() {
  const router = useRouter();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createProduct, { isLoading }] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { rating: 0, stock: 0, discountPercentage: 0 },
  });
  const onSubmit = async (values: ProductInput) => {
    try {
      await createProduct(values).unwrap();
      toast.success('Product created successfully');
      router.push('/products');
    } catch {
      toast.error('Could not create the product. Please retry.');
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2"
    >
      {fields.map(({ name, label, type = 'text' }) => (
        <label key={name} className={name === 'description' ? 'sm:col-span-2' : ''}>
          <span className="mb-1 block text-sm font-medium">{label}</span>
          {name === 'description' ? (
            <textarea
              {...register(name)}
              rows={4}
              className="w-full rounded-md border px-3 py-2"
              aria-invalid={!!errors[name]}
            />
          ) : (
            <input
              {...register(name)}
              type={type}
              min={type === 'number' ? 0 : undefined}
              step={name === 'rating' || name === 'discountPercentage' ? '0.01' : undefined}
              className="min-h-11 w-full rounded-md border px-3"
              aria-invalid={!!errors[name]}
            />
          )}
          <span className="mt-1 block text-sm text-red-600">{errors[name]?.message}</span>
        </label>
      ))}
      <label>
        <span className="mb-1 block text-sm font-medium">Category</span>
        <select
          {...register('category')}
          className="min-h-11 w-full rounded-md border px-3"
          aria-invalid={!!errors.category}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option value={category.slug} key={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-sm text-red-600">{errors.category?.message}</span>
      </label>
      <div className="flex items-end gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating…' : 'Create product'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
