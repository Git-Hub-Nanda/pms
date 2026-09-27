'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetProductQuery } from '@/features/products/products-api';
import { addItem } from '@/features/cart/cart-slice';
import { useAppDispatch } from '@/hooks/redux';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export function ProductDetail({ id }: { id: number }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: product, isLoading, isError, refetch } = useGetProductQuery(id);
  if (isLoading) return <div className="shimmer h-96" />;
  if (isError || !product)
    return (
      <div role="alert">
        Could not load this product.{' '}
        <button onClick={() => refetch()} className="underline">
          Retry
        </button>
      </div>
    );
  return (
    <article className="grid gap-8 lg:grid-cols-2">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={800}
        height={600}
        className="h-auto w-full rounded-xl object-cover"
        priority
      />
      <div>
        <button onClick={() => router.back()} className="text-sm text-brand-700 underline">
          Back to products
        </button>
        <p className="mt-6 text-sm uppercase tracking-wide text-slate-500">{product.category}</p>
        <h1 className="mt-2 text-4xl font-bold">{product.title}</h1>
        <p className="mt-5 text-lg text-slate-600">{product.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">Price</dt>
            <dd className="text-xl font-bold">{formatCurrency(product.price)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Stock</dt>
            <dd className="font-semibold">{product.stock} units</dd>
          </div>
          <div>
            <dt className="text-slate-500">Brand</dt>
            <dd>{product.brand ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Rating</dt>
            <dd>{product.rating}/5</dd>
          </div>
        </dl>
        <Button
          className="mt-8"
          onClick={() => {
            dispatch(addItem(product));
            toast.success('Added to cart');
          }}
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
}
