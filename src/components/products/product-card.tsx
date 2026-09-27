import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const ProductCard = memo(function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <Link href={`/products/${product.id}`} className="block focus-visible:ring-inset">
        <Image
          src={product.thumbnail}
          alt=""
          width={480}
          height={320}
          className="h-48 w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{product.category}</p>
          <h2 className="mt-1 line-clamp-1 font-semibold">{product.title}</h2>
          <p className="mt-2 text-lg font-bold">{formatCurrency(product.price)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button className="w-full" onClick={() => onAdd(product)}>
          <ShoppingCart className="mr-2" size={16} />
          Add to cart
        </Button>
      </div>
    </article>
  );
});
