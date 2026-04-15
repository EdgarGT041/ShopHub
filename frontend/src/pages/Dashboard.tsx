import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">You are not logged in</h1>
        <p className="mt-2 text-slate-600">Login to access your account dashboard.</p>
        <Link
          to="/login"
          className="mt-4 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
        <p className="mt-1 text-sm text-slate-600">Manage your profile and review your latest orders.</p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Logout
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Order History</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your recent orders will appear here once you complete a checkout flow.
        </p>
      </div>
    </div>
  );
};
