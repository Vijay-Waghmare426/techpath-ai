// API service for interview-related data
// This will be replaced with actual API calls later

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data that would come from database
const mockQuestions = [
  {
    id: 1,
    question: "What is the difference between let, const, and var in JavaScript?",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["JavaScript", "ES6", "Variables"],
    answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned.",
    popular: true,
    views: 1250,
    likes: 89,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 2,
    question: "Explain the concept of closures in JavaScript with an example.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Closures", "Scope"],
    answer: "A closure is a function that has access to variables in its outer scope even after the outer function has returned. Example: function outer() { let x = 10; return function inner() { console.log(x); }; }",
    popular: false,
    views: 890,
    likes: 67,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 3,
    question: "How do you optimize React component performance?",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Performance",
    tags: ["React", "Performance", "Optimization"],
    answer: "Use React.memo, useMemo, useCallback, lazy loading, avoid inline functions in JSX, implement virtualization for large lists, and use proper key props.",
    popular: true,
    views: 2100,
    likes: 156,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 4,
    question: "What is the difference between REST and GraphQL APIs?",
    category: "backend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["API", "REST", "GraphQL"],
    answer: "REST uses multiple endpoints and HTTP methods, GraphQL uses single endpoint with flexible queries. GraphQL allows clients to request specific data, reducing over-fetching.",
    popular: false,
    views: 1456,
    likes: 98,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 5,
    question: "Explain the CAP theorem in distributed systems.",
    category: "backend",
    difficulty: "Advanced",
    type: "System Design",
    tags: ["Distributed Systems", "CAP Theorem", "Database"],
    answer: "CAP theorem states you can only guarantee 2 of 3: Consistency, Availability, and Partition tolerance in a distributed system.",
    popular: false,
    views: 756,
    likes: 45,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 6,
    question: "How would you implement authentication in a Node.js application?",
    category: "backend",
    difficulty: "Intermediate",
    type: "Implementation",
    tags: ["Node.js", "Authentication", "JWT", "Security"],
    answer: "Use JWT tokens, bcrypt for password hashing, middleware for protection, and secure storage practices.",
    popular: false,
    views: 934,
    likes: 72,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 7,
    question: "What is the difference between EC2 and Lambda in AWS?",
    category: "cloud",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["AWS", "EC2", "Lambda", "Serverless"],
    answer: "EC2 provides virtual servers you manage, Lambda is serverless compute that auto-scales and you pay per execution.",
    popular: false,
    views: 678,
    likes: 54,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 8,
    question: "How do you implement auto-scaling in AWS?",
    category: "cloud",
    difficulty: "Intermediate",
    type: "Implementation",
    tags: ["AWS", "Auto Scaling", "Load Balancer", "CloudWatch"],
    answer: "Use Auto Scaling Groups with Launch Templates, define scaling policies based on CloudWatch metrics.",
    popular: false,
    views: 567,
    likes: 43,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 9,
    question: "Explain AWS VPC and its components.",
    category: "cloud",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["AWS", "VPC", "Networking", "Security"],
    answer: "VPC is a virtual network where you can launch AWS resources. Components include subnets, route tables, internet gateways, NAT gateways, and security groups.",
    popular: true,
    views: 1234,
    likes: 89,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 10,
    question: "Explain the difference between Docker and Kubernetes.",
    category: "devops",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Docker", "Kubernetes", "Containerization"],
    answer: "Docker creates containers, Kubernetes orchestrates and manages multiple containers across clusters.",
    popular: false,
    views: 1123,
    likes: 78,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 11,
    question: "How do you set up a CI/CD pipeline?",
    category: "devops",
    difficulty: "Advanced",
    type: "Implementation",
    tags: ["CI/CD", "Jenkins", "GitLab", "Pipeline"],
    answer: "Define stages for build, test, and deploy using tools like Jenkins, GitLab CI, or GitHub Actions with automated triggers.",
    popular: true,
    views: 1876,
    likes: 134,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 12,
    question: "What is Infrastructure as Code (IaC)?",
    category: "devops",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["IaC", "Terraform", "CloudFormation", "Ansible"],
    answer: "IaC is managing infrastructure through code rather than manual processes. Tools like Terraform and CloudFormation enable version control and automation.",
    popular: false,
    views: 845,
    likes: 62,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 13,
    question: "What is the difference between SQL and NoSQL databases?",
    category: "database",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["SQL", "NoSQL", "Database", "ACID"],
    answer: "SQL databases are relational with ACID properties, NoSQL are non-relational with flexible schemas and eventual consistency.",
    popular: false,
    views: 987,
    likes: 71,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 14,
    question: "How do you optimize database query performance?",
    category: "database",
    difficulty: "Intermediate",
    type: "Performance",
    tags: ["Database", "Optimization", "Indexing", "Query"],
    answer: "Use proper indexing, query optimization, avoid N+1 queries, use EXPLAIN plans, and database-specific tuning.",
    popular: false,
    views: 756,
    likes: 58,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 15,
    question: "Explain database normalization and its forms.",
    category: "database",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["Database", "Normalization", "Design", "RDBMS"],
    answer: "Normalization reduces data redundancy. 1NF eliminates duplicate columns, 2NF removes partial dependencies, 3NF removes transitive dependencies.",
    popular: true,
    views: 1345,
    likes: 98,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 16,
    question: "Explain React Native vs Flutter for mobile development.",
    category: "mobile",
    difficulty: "Intermediate",
    type: "Comparison",
    tags: ["React Native", "Flutter", "Mobile", "Cross-platform"],
    answer: "React Native uses JavaScript and native components, Flutter uses Dart and custom widgets with better performance.",
    popular: false,
    views: 823,
    likes: 64,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 17,
    question: "How do you handle state management in large React applications?",
    category: "frontend",
    difficulty: "Advanced",
    type: "Architecture",
    tags: ["React", "State Management", "Redux", "Context"],
    answer: "Use Redux for complex state, Context API for simple global state, and local state for component-specific data.",
    popular: false,
    views: 1567,
    likes: 112,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 18,
    question: "What are React Hooks and their benefits?",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["React", "Hooks", "useState", "useEffect"],
    answer: "Hooks allow you to use state and lifecycle features in functional components. Benefits include code reuse, simpler testing, and better performance.",
    popular: true,
    views: 2345,
    likes: 178,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 19,
    question: "Design a URL shortener like bit.ly",
    category: "backend",
    difficulty: "Advanced",
    type: "System Design",
    tags: ["System Design", "Scalability", "Database Design"],
    answer: "Use base62 encoding, database sharding, caching layer, load balancers, and analytics tracking.",
    popular: true,
    views: 2876,
    likes: 198,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 20,
    question: "What is iOS vs Android development differences?",
    category: "mobile",
    difficulty: "Beginner",
    type: "Comparison",
    tags: ["iOS", "Android", "Swift", "Kotlin"],
    answer: "iOS uses Swift/Objective-C with Xcode, Android uses Kotlin/Java with Android Studio. Different UI guidelines and app store policies.",
    popular: false,
    views: 654,
    likes: 45,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

// Calculate dynamic category data based on questions
const calculateCategoryStats = () => {
  const categories = {};
  
  mockQuestions.forEach(question => {
    if (!categories[question.category]) {
      categories[question.category] = {
        questionCount: 0,
        totalViews: 0,
        totalLikes: 0,
        popularQuestions: 0,
        difficulties: { Beginner: 0, Intermediate: 0, Advanced: 0 },
        types: {}
      };
    }
    
    const cat = categories[question.category];
    cat.questionCount++;
    cat.totalViews += question.views || 0;
    cat.totalLikes += question.likes || 0;
    
    if (question.popular) cat.popularQuestions++;
    if (question.difficulty) cat.difficulties[question.difficulty]++;
    if (question.type) {
      cat.types[question.type] = (cat.types[question.type] || 0) + 1;
    }
  });
  
  return categories;
};

const mockCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'Code',
    description: 'React, JavaScript, HTML/CSS, Vue.js, Angular and frontend frameworks',
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: 'Server',
    description: 'Node.js, Python, Java, APIs, databases and server-side technologies',
    color: 'from-green-500 to-emerald-500',
    popular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'cloud',
    name: 'Cloud & AWS',
    icon: 'Cloud',
    description: 'AWS, Azure, GCP, serverless, microservices and cloud architecture',
    color: 'from-purple-500 to-violet-500',
    popular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    icon: 'Shield',
    description: 'Docker, Kubernetes, CI/CD, Jenkins, monitoring and deployment',
    color: 'from-orange-500 to-red-500',
    popular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    icon: 'Smartphone',
    description: 'React Native, Flutter, iOS, Android and mobile app development',
    color: 'from-pink-500 to-rose-500',
    popular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'database',
    name: 'Database & SQL',
    icon: 'Database',
    description: 'SQL, NoSQL, MongoDB, PostgreSQL, optimization and data modeling',
    color: 'from-indigo-500 to-blue-500',
    popular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions (will be replaced with actual HTTP calls)
export const interviewAPI = {
  // Get all categories
  getCategories: async () => {
    await delay(500); // Simulate network delay
    try {
      // Future: const response = await fetch(`${API_BASE_URL}/categories`);
      // Future: return await response.json();
      return {
        success: true,
        data: mockCategories,
        message: 'Categories fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Failed to fetch categories',
        error: error.message
      };
    }
  },

  // Get category by ID
  getCategoryById: async (categoryId) => {
    await delay(300);
    try {
      const category = mockCategories.find(cat => cat.id === categoryId);
      if (!category) {
        return {
          success: false,
          data: null,
          message: 'Category not found'
        };
      }
      return {
        success: true,
        data: category,
        message: 'Category fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to fetch category',
        error: error.message
      };
    }
  },

  // Get questions by category
  getQuestionsByCategory: async (categoryId, filters = {}) => {
    await delay(700);
    try {
      let questions = mockQuestions.filter(q => q.category === categoryId);
      
      // Apply filters
      if (filters.difficulty) {
        questions = questions.filter(q => q.difficulty === filters.difficulty);
      }
      
      if (filters.type) {
        questions = questions.filter(q => q.type === filters.type);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        questions = questions.filter(q => 
          q.question.toLowerCase().includes(searchLower) ||
          q.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'popular':
            questions.sort((a, b) => b.likes - a.likes);
            break;
          case 'newest':
            questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'difficulty':
            const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
            questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
            break;
          default:
            break;
        }
      }

      return {
        success: true,
        data: questions,
        total: questions.length,
        message: 'Questions fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        total: 0,
        message: 'Failed to fetch questions',
        error: error.message
      };
    }
  },

  // Get single question
  getQuestionById: async (questionId) => {
    await delay(300);
    try {
      const question = mockQuestions.find(q => q.id === parseInt(questionId));
      if (!question) {
        return {
          success: false,
          data: null,
          message: 'Question not found'
        };
      }
      return {
        success: true,
        data: question,
        message: 'Question fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to fetch question',
        error: error.message
      };
    }
  },

  // Update question stats (views, likes)
  updateQuestionStats: async (questionId, statType) => {
    await delay(200);
    try {
      // Future: API call to update stats
      // const response = await fetch(`${API_BASE_URL}/questions/${questionId}/stats`, {
      //   method: 'POST',
      //   body: JSON.stringify({ type: statType })
      // });
      
      return {
        success: true,
        message: `${statType} updated successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${statType}`,
        error: error.message
      };
    }
  },

  // Search questions across all categories
  searchQuestions: async (searchTerm, filters = {}) => {
    await delay(500);
    try {
      let questions = mockQuestions;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        questions = questions.filter(q => 
          q.question.toLowerCase().includes(searchLower) ||
          q.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          q.answer.toLowerCase().includes(searchLower)
        );
      }

      // Apply additional filters
      if (filters.category) {
        questions = questions.filter(q => q.category === filters.category);
      }

      return {
        success: true,
        data: questions,
        total: questions.length,
        message: 'Search completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        total: 0,
        message: 'Search failed',
        error: error.message
      };
    }
  }
};

// Simple API Functions for backward compatibility
export const fetchCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = calculateCategoryStats();
      const categoriesWithStats = mockCategories.map(category => ({
        ...category,
        questionCount: stats[category.id]?.questionCount || 0,
        totalViews: stats[category.id]?.totalViews || 0,
        totalLikes: stats[category.id]?.totalLikes || 0,
        popularQuestions: stats[category.id]?.popularQuestions || 0,
        difficulties: stats[category.id]?.difficulties || { Beginner: 0, Intermediate: 0, Advanced: 0 },
        types: stats[category.id]?.types || {}
      }));
      resolve(categoriesWithStats);
    }, 300);
  });
};

export const fetchQuestionsByCategory = async (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = mockQuestions.filter(q => q.category === categoryId);
      resolve(questions);
    }, 300);
  });
};

export const fetchQuestionById = async (questionId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const question = mockQuestions.find(q => q.id === parseInt(questionId));
      resolve(question);
    }, 200);
  });
};

export const searchQuestions = async (query, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...mockQuestions];
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(q => 
          q.question.toLowerCase().includes(lowerQuery) ||
          q.answer.toLowerCase().includes(lowerQuery) ||
          q.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
      }
      
      if (filters.category) {
        results = results.filter(q => q.category === filters.category);
      }
      
      if (filters.difficulty) {
        results = results.filter(q => q.difficulty === filters.difficulty);
      }
      
      if (filters.type) {
        results = results.filter(q => q.type === filters.type);
      }
      
      resolve(results);
    }, 400);
  });
};

export const getQuestionStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = calculateCategoryStats();
      const totalQuestions = mockQuestions.length;
      const totalViews = mockQuestions.reduce((sum, q) => sum + (q.views || 0), 0);
      const totalLikes = mockQuestions.reduce((sum, q) => sum + (q.likes || 0), 0);
      const popularQuestions = mockQuestions.filter(q => q.popular).length;
      
      // Calculate difficulty distribution
      const difficulties = mockQuestions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {});
      
      // Calculate type distribution
      const types = mockQuestions.reduce((acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1;
        return acc;
      }, {});
      
      // Calculate category distribution
      const categories = mockQuestions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1;
        return acc;
      }, {});
      
      resolve({
        totalQuestions,
        totalViews,
        totalLikes,
        popularQuestions,
        difficulties,
        types,
        categories,
        categoryStats: stats
      });
    }, 200);
  });
};

export default interviewAPI;