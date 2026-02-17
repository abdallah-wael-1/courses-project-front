/**
 * @param {File} file
 * @returns {Promise<string>}
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * @param {File} file
 * @param {number} maxSizeMB
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select an image file (JPG, PNG, etc.)' };
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `Image size must be less than ${maxSizeMB}MB` };
  }
  return { valid: true };
};


export const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return url;
};