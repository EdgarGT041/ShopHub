import { useMutation } from '@tanstack/react-query';
import { login as loginRequest, register as registerRequest } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types';

export const useAuth = () => {
  const storeLogin = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      storeLogin(data);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      storeLogin(data);
    },
  });

  const login = async (payload: LoginPayload) => loginMutation.mutateAsync(payload);
  const register = async (payload: RegisterPayload) => registerMutation.mutateAsync(payload);

  return {
    user,
    token,
    isAuthenticated,
    logout,
    login,
    register,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error?.message ?? registerMutation.error?.message ?? null,
  };
};
