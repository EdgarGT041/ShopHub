import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RouteErrorBoundary } from './components/common/RouteErrorBoundary';
import { Layout } from './components/layout/Layout';
import { useAuthStore } from './store/authStore';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProductDetail } from './pages/ProductDetail';
import { Register } from './pages/Register';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

const withBoundary = (element: ReactNode) => {
  return <RouteErrorBoundary>{element}</RouteErrorBoundary>;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={withBoundary(<Layout />)}>
          <Route path="/" element={withBoundary(<Home />)} />
          <Route path="/product/:id" element={withBoundary(<ProductDetail />)} />
          <Route path="/cart" element={withBoundary(<Cart />)} />
          <Route
            path="/checkout"
            element={withBoundary(
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={withBoundary(<Login />)} />
          <Route path="/register" element={withBoundary(<Register />)} />
          <Route
            path="/dashboard"
            element={withBoundary(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

