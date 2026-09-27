'use client';
import { useCallback, useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/features/products/products-api';
import { useAppDispatch } from '@/hooks/redux';
import { addItem } from '@/features/cart/cart-slice';
import { Button } from '@/components/ui/button';
import { ProductCard } from './product-card';

const PAGE_SIZE = 24;
export function ProductList() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip: page * PAGE_SIZE,
    search: debouncedQuery || undefined,
    category: category || undefined,
  });
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQuery(query);
      setPage(0);
    }, 350);
    return () => window.clearTimeout(id);
  }, [query]);
  const handleAdd = useCallback(
    (product: NonNullable<typeof data>['products'][number]) => {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart`);
    },
    [dispatch],
  );
  const pages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);
  return (
    <section aria-labelledby="products-heading">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 id="products-heading" className="text-3xl font-bold">
            Products
          </h1>
          <p className="mt-1 text-slate-600">Manage your catalogue with confidence.</p>
        </div>
        <Link href="/products/new">
          <Button>
            <Plus className="mr-2" size={16} />
            Add product
          </Button>
        </Link>
      </div>
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <label className="relative">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-11 w-full rounded-md border bg-white pl-10 pr-3"
            placeholder="Search products"
          />
        </label>
        <label>
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(0);
            }}
            className="min-h-11 w-full rounded-md border bg-white px-3"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {isError ? (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Could not load products.{' '}
          <button className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-600" aria-live="polite">
            {isFetching ? 'Refreshing products…' : `${data?.total ?? 0} products`}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAdd} />
            ))}
          </div>
          {data?.products.length === 0 && (
            <p className="py-16 text-center text-slate-500">No products match your filters.</p>
          )}
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="secondary" disabled={page === 0} onClick={() => setPage((value) => value - 1)}>
              Previous
            </Button>
            <span className="self-center text-sm">
              Page {page + 1} of {Math.max(1, pages)}
            </span>
            <Button variant="secondary" disabled={page + 1 >= pages} onClick={() => setPage((value) => value + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
function ProductGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="rounded-xl bg-white p-4 shadow-sm">
          <div className="shimmer h-48" />
          <div className="shimmer mt-4 h-4 w-1/3" />
          <div className="shimmer mt-3 h-6 w-3/4" />
        </div>
      ))}
    </div>
  );
}
