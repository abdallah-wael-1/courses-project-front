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
 * بتضغط الصورة وتحولها لـ base64
 * @param {File} file
 * @param {number} maxWidth - عرض الصورة بعد الضغط (default 800px)
 * @param {number} quality - جودة الصورة من 0 لـ 1 (default 0.65)
 * @returns {Promise<string>} base64 string
 */
export const compressAndConvertToBase64 = (file, maxWidth = 800, quality = 0.65) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');

        // احسب الأبعاد الجديدة مع الحفاظ على النسبة
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // حول لـ base64 مع الضغط
        const base64 = canvas.toDataURL('image/jpeg', quality);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = reader.result;
    };
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

/**
 * بيرجع الـ src الصح للصورة
 */
export const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return url;
};