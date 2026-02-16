import axiosInstance from './axiosInstance';
export const getAllCourses = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/courses', { params });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch courses'
    };
  }
};


export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch course'
    };
  }
};

export const createCourse = async (formData) => {
  try {
    const response = await axiosInstance.post('/courses', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create course'
    };
  }
};

export const updateCourse = async (id, formData) => {
  try {
    const response = await axiosInstance.patch(`/courses/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update course'
    };
  }
};

export const deleteCourse = async (id) => {
  try {
    await axiosInstance.delete(`/courses/${id}`);
    return {
      success: true,
      message: 'Course deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete course'
    };
  }
};