import axiosInstance from './axiosInstance';

export const getUserDashboard = async () => {
  try {
    const response = await axiosInstance.get('/users/dashboard');
    return { success: true, data: response.data.data };
  } catch (error) {
    let errorMessage = 'Failed to fetch dashboard data';
    if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    return { success: false, message: errorMessage };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to fetch profile' };
  }
};


export const updateUserProfile = async (data) => {
  try {
    const response = await axiosInstance.patch('/users/profile', data);
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to update profile' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.patch('/users/change-password', { currentPassword, newPassword });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to change password' };
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete('/users/account');
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to delete account' };
  }
};