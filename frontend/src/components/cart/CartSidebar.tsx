import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

export const CartSidebar = () => {
  const items = useCartStore((state) => state.items);
  const itemCount = useCartStore((state) => state.itemCount);
  const total = useCartStore((state) => state.total);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Cart Summary</h3>
      <p className="mt-1 text-sm text-slate-600">{itemCount} item(s) in cart</p>

      {items.length === 0 ? (
        <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-600">Your cart is empty.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.slice(0, 3).map((item) => (
            <li key={item._id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-2">
              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.quantity} x {formatCurrency(item.price)}
                </p>
              </div>
            </li>
          ))}
          {items.length > 3 ? (
            <li className="text-xs text-slate-500">+ {items.length - 3} more item(s)</li>
          ) : null}
        </ul>
      )}

      <div className="mt-4 border-t border-slate-200 pt-4">
        <p className="flex items-center justify-between text-sm text-slate-700">
          <span>Total</span>
          <span className="text-base font-semibold text-slate-900">{formatCurrency(total)}</span>
        </p>
        <Link
          to="/cart"
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View cart
        </Link>
      </div>
    </div>
  );
};
