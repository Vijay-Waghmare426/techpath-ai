// API service for blog-related data
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

  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Blog Posts API
export const blogAPI = {
  // Get all blog posts with optional filters
  async getBlogPosts(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await APIClient.get(`/blogs?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Fallback to mock data if API fails
      return getMockBlogPosts();
    }
  },

  // Get featured blog post
  async getFeaturedPost() {
    try {
      const response = await APIClient.get('/blogs/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured post:', error);
      // Fallback to mock data if API fails
      return getMockFeaturedPost();
    }
  },

  // Get trending topics
  async getTrendingTopics() {
    try {
      const response = await APIClient.get('/blogs/trending-topics');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      // Fallback to mock data if API fails
      return getMockTrendingTopics();
    }
  },

  // Get blog categories
  async getBlogCategories() {
    try {
      const response = await APIClient.get('/blogs/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      // Fallback to mock data if API fails
      return getMockCategories();
    }
  },

  // Like a blog post
  async likeBlogPost(postId, increment = true) {
    try {
      const response = await APIClient.put(`/blogs/${postId}/like`, { increment });
      return response.data;
    } catch (error) {
      console.error('Error liking blog post:', error);
      throw error;
    }
  },

  // Bookmark a blog post
  async bookmarkBlogPost(postId, increment = true) {
    try {
      const response = await APIClient.put(`/blogs/${postId}/bookmark`, { increment });
      return response.data;
    } catch (error) {
      console.error('Error bookmarking blog post:', error);
      throw error;
    }
  },

  // Search blog posts
  async searchBlogPosts(searchTerm, category = 'all') {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        category: category
      });
      
      const response = await APIClient.get(`/blogs?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
  },

  // Create a new blog post
  async createBlogPost(postData) {
    try {
      const response = await APIClient.post('/blogs', postData);
      return response;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Update a blog post
  async updateBlogPost(postId, postData) {
    try {
      const response = await APIClient.put(`/blogs/${postId}`, postData);
      return response;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  // Delete a blog post
  async deleteBlogPost(postId) {
    try {
      const response = await APIClient.delete(`/blogs/${postId}`);
      return response;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }
};

// Fallback mock data functions
function getMockBlogPosts() {
  return [
    {
      id: 2,
      title: "Mastering React Server Components: A Complete Guide",
      excerpt: "Deep dive into React Server Components, understanding when to use them, and how they improve performance.",
      author: { name: "Michael Rodriguez", role: "Full Stack Developer" },
      category: "react",
      tags: ["React", "Server Components", "Performance"],
      views: 8200,
      likes: 156,
      readTime: "12 min read",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      formattedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js and Microservices",
      excerpt: "Learn how to design and implement scalable microservices architecture using Node.js and Docker.",
      author: { name: "Emily Johnson", role: "Backend Architect" },
      category: "nodejs",
      tags: ["Node.js", "Microservices", "Architecture", "Docker"],
      views: 6800,
      likes: 198,
      readTime: "15 min read",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      formattedDate: "3 days ago"
    }
  ];
}

function getMockFeaturedPost() {
  return {
    id: 1,
    title: "The Future of Web Development: AI-Powered Development Tools",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we build web applications, from code generation to automated testing and deployment.",
    author: { name: "Sarah Chen", role: "Senior Frontend Engineer at Google" },
    category: "ai",
    tags: ["AI", "Web Development", "Future Tech", "Automation"],
    isFeatured: true,
    isTrending: true,
    views: 12500,
    likes: 324,
    readTime: "8 min read",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    formattedDate: "2 days ago"
  };
}

function getMockTrendingTopics() {
  return [
    { name: "React 19", posts: 45 },
    { name: "AI Development", posts: 38 },
    { name: "Serverless", posts: 29 },
    { name: "TypeScript", posts: 52 },
    { name: "Docker", posts: 33 },
    { name: "GraphQL", posts: 24 }
  ];
}

function getMockCategories() {
  return [
    { id: 'all', name: 'All Posts' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'devops', name: 'DevOps' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'career', name: 'Career' }
  ];
}