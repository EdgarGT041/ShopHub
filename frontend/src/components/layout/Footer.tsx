export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
        <p>ShopHub © {currentYear}. Designed & Built by Edgar Guerrero</p>
      </div>
    </footer>
  );
};
