// API service for interview-related data
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Client with error handling
class APIClient {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get(endpoint) {
    return this.request(endpoint);
  }

  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

// Interview Questions API
export const interviewAPI = {
  // Get all categories with question counts
  async getCategories() {
    try {
      const response = await APIClient.get('/questions/categories');
      return response; // Return the full response which includes success: true
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to mock data if API fails
      return { success: true, data: getMockCategories() };
    }
  },

  // Get questions by category with filters
  async getQuestionsByCategory(categoryId, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        category: categoryId,
        ...filters
      });
      
      const response = await APIClient.get(`/questions?${queryParams}`);
      return response; // Return the full response which includes success: true
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to mock data if API fails
      return { success: true, data: getMockQuestionsByCategory(categoryId) };
    }
  },

  // Get question statistics
  async getQuestionStats() {
    try {
      const response = await APIClient.get('/questions/stats');
      return response; // Return the full response which includes success: true
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to mock stats
      return {
        success: true,
        data: {
          totalQuestions: 500,
          totalCategories: 6,
          popularQuestions: 50
        }
      };
    }
  },

  // Get statistics
  async getStats() {
    try {
      console.log('Making API call to:', `${API_BASE_URL}/questions/stats`);
      const response = await APIClient.get('/questions/stats');
      console.log('Stats API response:', response);
      return response; // Return the full response which includes success: true
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Return fallback stats
      return {
        success: true,
        data: {
          totalQuestions: 0,
          totalCategories: 0,
          totalViews: 0,
          popularQuestions: 0
        }
      };
    }
  }
};

// Fallback mock data functions
function getMockCategories() {
  return [
    { id: 'frontend', name: 'Frontend Development', icon: 'Code', count: 45 },
    { id: 'backend', name: 'Backend Development', icon: 'Server', count: 38 },
    { id: 'cloud', name: 'Cloud Computing', icon: 'Cloud', count: 29 },
    { id: 'devops', name: 'DevOps & Security', icon: 'Shield', count: 33 },
    { id: 'mobile', name: 'Mobile Development', icon: 'Smartphone', count: 24 },
    { id: 'ai', name: 'AI & Machine Learning', icon: 'Brain', count: 31 }
  ];
}

function getMockQuestionsByCategory(categoryId) {
  return [
    {
      id: 1,
      question: "What is the difference between let, const, and var in JavaScript?",
      category: categoryId,
      difficulty: "Beginner",
      type: "Conceptual",
      tags: ["JavaScript", "ES6", "Variables"],
      answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned.",
      popular: true,
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      question: "Explain the concept of closures in JavaScript with an example.",
      category: categoryId,
      difficulty: "Intermediate", 
      type: "Conceptual",
      tags: ["JavaScript", "Closures", "Scope"],
      answer: "A closure is a function that has access to variables in its outer scope even after the outer function has returned.",
      popular: false,
      views: 890,
      likes: 67
    }
  ];
}

// Legacy exports for compatibility
export const getCategories = interviewAPI.getCategories;
export const getQuestionsByCategory = interviewAPI.getQuestionsByCategory;
export const getQuestionStats = interviewAPI.getQuestionStats;