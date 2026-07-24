/**
 * Resolves an image path or URL for display in the app.
 * Supports:
 * - External URLs (http://, https://, or //)
 * - Data URLs (data:image/...)
 * - Local static paths relative to public/ (e.g., "images/gallery/photo.jpg", "/images/faculty/teacher.jpg")
 * 
 * Uses import.meta.env.BASE_URL for GitHub Pages deployment compatibility.
 * 
 * @param {string} path - The image path or URL
 * @returns {string} - The resolved image URL
 */
export function getImageUrl(path) {
  if (!path || typeof path !== 'string') return '';

  const trimmed = path.trim();
  if (!trimmed) return '';

  // Return external URLs or data URLs directly
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Handle local path with import.meta.env.BASE_URL
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Checks if a string looks like an image path or URL (vs short text initials like "MS" or "RN").
 * @param {string} val 
 * @returns {boolean}
 */
export function isImagePath(val) {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('images/')
  ) {
    return true;
  }
  if (trimmed.includes('/') || (trimmed.includes('.') && trimmed.length > 4)) {
    return true;
  }
  return false;
}
