import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/auth';
import { getAccessToken, clearTokens } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // isLoading covers the initial "do we have a valid session?" check on
  // page load, so the app doesn't flash a logged-out state before we've
  // had a chance to ask the backend who the token belongs to.
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const loadCurrentUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const me = await authApi.getMe();
      setCurrentUser(authApi.normalizeUser(me));
    } catch {
      clearTokens();
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();

    // Fired by the API client when a refresh attempt fails (session truly
    // expired) so we drop back to a logged-out state everywhere at once.
    const handleExpired = () => setCurrentUser(null);
    window.addEventListener('setu:session-expired', handleExpired);
    return () => window.removeEventListener('setu:session-expired', handleExpired);
  }, [loadCurrentUser]);

  const register = async ({ name, email, password, role }) => {
    setAuthError('');
    try {
      await authApi.register({ name, email, password, role });
      const me = await authApi.getMe();
      const normalized = authApi.normalizeUser(me);
      setCurrentUser(normalized);
      return normalized;
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    setAuthError('');
    try {
      await authApi.login({ email, password });
      const me = await authApi.getMe();
      const normalized = authApi.normalizeUser(me);
      setCurrentUser(normalized);
      return normalized;
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  // Local-only profile patch for fields the backend doesn't persist yet
  // (bio/location/phone/avatar/skills — see api/auth.js normalizeUser).
  // Anything the backend DOES support (preferred_language) is written
  // through immediately; the rest stays client-side until those columns
  // exist server-side.
  const patchLocalProfile = (updates) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, authError, register, login, logout, patchLocalProfile, refreshUser: loadCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
