import { Outlet } from 'react-router-dom';
import { CartSidebar } from '../cart/CartSidebar';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="min-h-[50vh]">
            <Outlet />
          </section>
          <aside className="hidden lg:block">
            <CartSidebar />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};
