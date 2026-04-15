import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    try {
      await register({ name, email, password });
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unable to complete registration.';
      setLocalError(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Register</h1>
      <p className="mt-1 text-sm text-slate-600">Create your ShopHub account in seconds.</p>

      {localError || error ? <div className="mt-4"><ErrorMessage message={localError ?? error ?? 'Unknown error'} /></div> : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            minLength={6}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};
