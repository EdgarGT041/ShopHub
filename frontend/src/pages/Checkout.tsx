import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useCartStore } from '../store/cartStore';
import { createOrder } from '../utils/api';
import { formatCurrency } from '../utils/formatters';

export const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">No items to checkout</h1>
        <p className="mt-2 text-slate-600">Add products to your cart before continuing.</p>
        <Link
          to="/"
          className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await createOrder({
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
      });

      clearCart();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not complete checkout.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Shipping details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Address</span>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-700">City</span>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-700">Postal code</span>
              <input
                type="text"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Country</span>
              <input
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Payment method</span>
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              >
                <option value="Card">Card</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </label>
          </div>
        </section>

        <section className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {items.map((item) => (
              <li key={item._id} className="flex justify-between gap-3">
                <span className="truncate">
                  {item.name} x {item.quantity}
                </span>
                <span>{formatCurrency(item.quantity * item.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            Total: {formatCurrency(total)}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
        </section>
      </form>
    </div>
  );
};
