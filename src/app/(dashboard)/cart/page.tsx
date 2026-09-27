'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { removeItem, setQuantity } from '@/features/cart/cart-slice';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (!items.length)
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link className="mt-4 inline-block text-brand-700 underline" href="/products">
          Browse products
        </Link>
      </section>
    );
  return (
    <section>
      <h1 className="text-3xl font-bold">Cart</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-y rounded-xl bg-white px-4 shadow-sm ring-1 ring-slate-200">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 py-4">
              <Image src={product.thumbnail} alt="" width={96} height={72} className="h-18 w-24 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{product.title}</h2>
                <p>{formatCurrency(product.price)}</p>
                <label className="mt-2 block text-sm">
                  Quantity{' '}
                  <input
                    className="ml-2 w-16 rounded border px-2 py-1"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) =>
                      dispatch(setQuantity({ id: product.id, quantity: Number(event.target.value) }))
                    }
                  />
                </label>
              </div>
              <button
                className="self-center p-2 text-red-600"
                aria-label={`Remove ${product.title}`}
                onClick={() => dispatch(removeItem(product.id))}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button className="mt-5 w-full">Proceed to checkout</Button>
        </aside>
      </div>
    </section>
  );
}
