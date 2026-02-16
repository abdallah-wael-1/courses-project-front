// src/api/userApi.js
import axiosInstance from './axiosInstance';

// ✅ Get User Dashboard Data
export const getUserDashboard = async () => {
  try {
    console.log('📡 Fetching dashboard...');
    const response = await axiosInstance.get('/users/dashboard');

    console.log('✅ Dashboard data received:', response.data);

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('❌ Dashboard fetch error:', error);
    
    let errorMessage = 'Failed to fetch dashboard data';
    
    if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};

// ✅ Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch profile'
    };
  }
};

// ✅ Update User Profile
export const updateUserProfile = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      '/users/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile'
    };
  }
};

// ✅ Change Password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.patch(
      '/users/change-password',
      { currentPassword, newPassword }
    );
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to change password'
    };
  }
};

// ✅ Delete Account
export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete('/users/account');
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete account'
    };
  }
};