import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('blog_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('blog_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blog_auth_user');
    }
  }, [user]);

  const login = (username, password) => {
    const trimmed = username.trim();
    if (!trimmed) {
      return { success: false, message: 'Username is required.' };
    }
    if (password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    setUser({ username: trimmed });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}