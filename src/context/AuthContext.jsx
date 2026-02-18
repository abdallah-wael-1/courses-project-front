import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);

          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setToken(storedToken);

            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              try {
                const response = await axiosInstance.get('/users/profile');
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
              } catch (error) {
                console.error('Failed to fetch user profile:', error);
                logout();
              }
            }
          }
        } catch (error) {
          console.error('Invalid token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register 
  const register = async (userData) => {
    try {
      const response = await axiosInstance.post('/users/register', userData);

      const { data } = response.data;
      const newToken = data.token;

      let newUser = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
      };

      if (userData && userData.avatar) {
        newUser = { ...newUser, avatar: userData.avatar };
      }

      setToken(newToken);
      setUser(newUser);
      try {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (e) {
        console.log(e);
        
      }

      return { success: true, data: newUser };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      const { data } = response.data;
      const newToken = data.token;

      const newUser = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        phone: data.phone,
        bio: data.bio,
        location: data.location,
        dateOfBirth: data.dateOfBirth,
        occupation: data.occupation,
        education: data.education,
      };

      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // Update Profile 
  const updateProfile = async (payload) => {
    try {
      const response = await axiosInstance.patch('/users/profile', payload);

      const updatedUser = response.data.data;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true, data: updatedUser };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      };
    }
  };

  // Update Password
  const updatePassword = async (passwordData) => {
    try {
      const response = await axiosInstance.patch('/users/change-password', passwordData);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed',
      };
    }
  };

  // Delete Account
  const deleteAccount = async () => {
    try {
      const response = await axiosInstance.delete('/users/account');
      if (response.data.status === 'success') {
        logout();
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete account',
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const setLocalUser = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      console.log(e);
      
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateProfile,
    setLocalUser,
    updatePassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};