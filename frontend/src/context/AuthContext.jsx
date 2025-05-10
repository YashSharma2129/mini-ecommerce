import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenRefreshTimer, setTokenRefreshTimer] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const setupTokenRefresh = () => {
      if (tokenRefreshTimer) clearInterval(tokenRefreshTimer);
      // Refresh token every 23 hours
      const timer = setInterval(refreshToken, 23 * 60 * 60 * 1000);
      setTokenRefreshTimer(timer);
    };

    if (user) {
      setupTokenRefresh();
    }

    return () => {
      if (tokenRefreshTimer) clearInterval(tokenRefreshTimer);
    };
  }, [user]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem('token', response.data.token);
    } catch (error) {
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration...');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Registration successful');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network error - Please check your connection or disable ad blockers');
      } else {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      login,
      register,
      logout,
      isAdmin: user?.role === 'admin'
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
