import axiosInstance from './axiosInstance';

export const enrollInCourse = async (courseId) => {
  try {
    const response = await axiosInstance.post('/enrollments/enroll', { courseId });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    console.error(' Enroll error:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to enroll in course'
    };
  }
};

export const getMyEnrollments = async () => {
  try {
    const response = await axiosInstance.get('/enrollments/my-courses');
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch enrollments'
    };
  }
};

export const updateProgress = async (enrollmentId, progressData) => {
  try {
    const response = await axiosInstance.put(
      `/enrollments/${enrollmentId}/progress`,
      progressData
    );
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update progress'
    };
  }
};

export const updateCourseProgress = async (courseId, progressData) => {
  try {
    console.log(' Updating course progress:', { courseId, progressData });
    
    const response = await axiosInstance.patch(
      `/enrollments/course/${courseId}/progress`,
      progressData
    );
    
    console.log(' Progress updated:', response.data);
    
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error(' Update progress error:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update progress'
    };
  }
};