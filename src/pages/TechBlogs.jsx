import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Tag, 
  TrendingUp, 
  Search, 
  Filter,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

const TechBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'devops', name: 'DevOps' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'career', name: 'Career' },
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of Web Development: AI-Powered Development Tools",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we build web applications, from code generation to automated testing and deployment.",
    author: "Sarah Chen",
    authorRole: "Senior Frontend Engineer at Google",
    publishDate: "2 days ago",
    readTime: "8 min read",
    category: "ai",
    image: "/api/placeholder/800/400",
    views: 12500,
    likes: 324,
    trending: true,
    tags: ["AI", "Web Development", "Future Tech", "Automation"]
  };

  const blogPosts = [
    {
      id: 2,
      title: "Mastering React Server Components: A Complete Guide",
      excerpt: "Deep dive into React Server Components, understanding when to use them, and how they improve performance.",
      author: "Michael Rodriguez",
      authorRole: "Full Stack Developer",
      publishDate: "1 week ago",
      readTime: "12 min read",
      category: "react",
      image: "/api/placeholder/400/250",
      views: 8200,
      likes: 156,
      tags: ["React", "Server Components", "Performance"]
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js and Microservices",
      excerpt: "Learn how to design and implement scalable microservices architecture using Node.js and Docker.",
      author: "Emily Johnson",
      authorRole: "Backend Architect",
      publishDate: "3 days ago",
      readTime: "15 min read",
      category: "nodejs",
      image: "/api/placeholder/400/250",
      views: 6800,
      likes: 198,
      tags: ["Node.js", "Microservices", "Architecture", "Docker"]
    },
    {
      id: 4,
      title: "AWS Lambda vs Azure Functions: Performance Comparison",
      excerpt: "Comprehensive comparison of serverless computing platforms, including performance benchmarks and cost analysis.",
      author: "David Kim",
      authorRole: "Cloud Solutions Architect",
      publishDate: "5 days ago",
      readTime: "10 min read",
      category: "cloud",
      image: "/api/placeholder/400/250",
      views: 9100,
      likes: 243,
      tags: ["AWS", "Azure", "Serverless", "Cloud Computing"]
    },
    {
      id: 5,
      title: "DevOps Best Practices for 2025: CI/CD Pipeline Optimization",
      excerpt: "Updated strategies for implementing efficient CI/CD pipelines with modern tools and practices.",
      author: "Alex Thompson",
      authorRole: "DevOps Engineer",
      publishDate: "1 week ago",
      readTime: "14 min read",
      category: "devops",
      image: "/api/placeholder/400/250",
      views: 7500,
      likes: 189,
      tags: ["DevOps", "CI/CD", "Automation", "Best Practices"]
    },
    {
      id: 6,
      title: "JavaScript Performance Optimization Techniques in 2025",
      excerpt: "Essential techniques for optimizing JavaScript performance in modern web applications.",
      author: "Lisa Wang",
      authorRole: "Performance Engineer",
      publishDate: "4 days ago",
      readTime: "11 min read",
      category: "javascript",
      image: "/api/placeholder/400/250",
      views: 10200,
      likes: 287,
      tags: ["JavaScript", "Performance", "Optimization", "Best Practices"]
    },
    {
      id: 7,
      title: "Career Transition: From Bootcamp to Senior Developer",
      excerpt: "Real stories and practical advice for advancing your career from bootcamp graduate to senior developer role.",
      author: "James Martinez",
      authorRole: "Senior Software Engineer",
      publishDate: "6 days ago",
      readTime: "9 min read",
      category: "career",
      image: "/api/placeholder/400/250",
      views: 5600,
      likes: 142,
      tags: ["Career", "Bootcamp", "Senior Developer", "Growth"]
    }
  ];

  const trendingTopics = [
    { name: "React 19", posts: 45 },
    { name: "AI Development", posts: 38 },
    { name: "Serverless", posts: 29 },
    { name: "TypeScript", posts: 52 },
    { name: "Docker", posts: 33 },
    { name: "GraphQL", posts: 24 }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-12"
    >
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tech
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Blogs
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Stay updated with the latest trends, tutorials, and insights from the tech industry
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="featured" className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  {featuredPost.trending && (
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">Trending</span>
                    </div>
                  )}
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-white text-sm font-medium">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">{featuredPost.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                    Read Full Article
                  </button>
                </div>
                
                <div className="md:w-1/2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <BookOpen className="h-24 w-24 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-300">Featured Article</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-white"
            >
              Latest Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group cursor-pointer" variant="blog">
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-4 rounded-lg">
                      <BookOpen className="h-12 w-12 text-purple-400" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-400 text-sm capitalize">{post.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Author and Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-white text-sm">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Read More */}
                      <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{post.publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-6">Trending Topics</h3>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                      <span className="text-white font-medium">{topic.name}</span>
                      <span className="text-purple-400 text-sm">{topic.posts} posts</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="featured">
                <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Get the latest tech insights delivered to your inbox weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
                  />
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                    Subscribe
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechBlogs;