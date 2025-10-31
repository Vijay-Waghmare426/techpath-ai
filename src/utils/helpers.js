// Utility functions for the application

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
};

// Get difficulty color classes
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': 
      return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'Intermediate': 
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'Advanced': 
      return 'text-red-400 bg-red-400/10 border-red-400/20';
    default: 
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

// Get type color classes
export const getTypeColor = (type) => {
  switch (type) {
    case 'Conceptual':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'Implementation':
      return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    case 'System Design':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case 'Performance':
      return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
    case 'Architecture':
      return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
    case 'Comparison':
      return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Get random item from array
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Shuffle array
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = (groups[item[key]] || []);
    group.push(item);
    groups[item[key]] = group;
    return groups;
  }, {});
};

// Sort array by multiple criteria
export const sortBy = (array, criteria) => {
  return array.sort((a, b) => {
    for (const criterion of criteria) {
      const { key, direction = 'asc' } = criterion;
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

const helpers = {
  formatDate,
  formatRelativeTime,
  getDifficultyColor,
  getTypeColor,
  debounce,
  throttle,
  generateId,
  capitalize,
  truncateText,
  formatNumber,
  isValidEmail,
  storage,
  copyToClipboard,
  isMobile,
  getRandomItem,
  shuffleArray,
  groupBy,
  sortBy
};

export default helpers;