
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, setToken } from '../services/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setToken(token);
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const response = await apiRegister(userData);
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};