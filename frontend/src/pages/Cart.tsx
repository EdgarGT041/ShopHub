import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatters';

export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Browse products and add items to get started.</p>
        <Link
          to="/"
          className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-slate-900">{item.name}</h2>
                <p className="text-sm text-slate-600">{formatCurrency(item.price)} each</p>
                <p className="text-xs text-slate-500">Stock: {item.stock}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 text-sm font-semibold text-slate-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={(event) => {
                    const nextQuantity = Number.parseInt(event.target.value, 10);

                    if (!Number.isNaN(nextQuantity)) {
                      updateQuantity(item._id, nextQuantity);
                    }
                  }}
                  className="h-8 w-16 rounded-md border border-slate-300 text-center text-sm"
                />
                <button
                  type="button"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 text-sm font-semibold text-slate-700"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                <button
                  type="button"
                  onClick={() => removeItem(item._id)}
                  className="mt-1 text-xs font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};
