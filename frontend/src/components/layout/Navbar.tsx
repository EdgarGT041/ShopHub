import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

const navLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? 'text-blue-700 font-semibold'
    : 'text-slate-700 font-medium transition hover:text-blue-600';
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="text-2xl font-bold text-slate-900">
            ShopHub
          </Link>
        </div>

        <div className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
          />
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/" className={navLinkClassName}>
            Products
          </NavLink>
          <Link to="/cart" className="relative rounded-md p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Open cart">
            <ShoppingCart size={20} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <NavLink to="/" onClick={closeMobileMenu} className={navLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/" onClick={closeMobileMenu} className={navLinkClassName}>
              Products
            </NavLink>
            <Link to="/cart" onClick={closeMobileMenu} className="text-slate-700">
              Cart ({itemCount})
            </Link>
            {isAuthenticated && user ? (
              <>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-fit rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" onClick={closeMobileMenu} className="text-sm font-medium text-slate-700">
                  Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="text-sm font-medium text-blue-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};
