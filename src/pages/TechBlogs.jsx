import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import BlogForm from '../components/BlogForm';
import LocalStorageService from '../services/localStorage';
import { blogAPI } from '../services/blogAPI';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Tag, 
  TrendingUp, 
  Search,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const TechBlogs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [viewCounts, setViewCounts] = useState({});
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Blog management state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isManagementMode, setIsManagementMode] = useState(false);
  // Load data from localStorage on component mount
  useEffect(() => {
    setLikedPosts(LocalStorageService.getLikedPosts());
    setBookmarkedPosts(LocalStorageService.getBookmarkedPosts());
    loadBlogData();
  }, []);

  // Load blog data from API
  const loadBlogData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [postsResponse, featuredResponse, topicsResponse, categoriesResponse] = await Promise.all([
        blogAPI.getBlogPosts(),
        blogAPI.getFeaturedPost(),
        blogAPI.getTrendingTopics(),
        blogAPI.getBlogCategories()
      ]);
      
      setBlogPosts(postsResponse || []);
      setFeaturedPost(featuredResponse || null);
      setTrendingTopics(topicsResponse || []);
      setCategories(categoriesResponse || []);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Persist data to localStorage when state changes
  useEffect(() => {
    LocalStorageService.setLikedPosts(likedPosts);
  }, [likedPosts]);

  useEffect(() => {
    LocalStorageService.setBookmarkedPosts(bookmarkedPosts);
  }, [bookmarkedPosts]);

  // Handle post interactions
  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(postId)) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      return newBookmarked;
    });
  };

  const handleShare = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare(post);
      }
    } else {
      fallbackShare(post);
    }
  };

  const fallbackShare = (post) => {
    const shareText = `Check out this article: ${post.title} - ${post.excerpt}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Article link copied to clipboard!');
    });
  };

  const handleReadMore = (post) => {
    setViewCounts(prev => ({
      ...prev,
      [post.id]: (prev[post.id] || 0) + 1
    }));
    
    // Create a slug from the title and ID
    const slug = `${post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')}-${post.id}`;
    
    navigate(`/tech-blogs/${slug}`);
  };

  // Blog management functions
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowBlogForm(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.deleteBlogPost(blogId);
        // Refresh the blog data
        await loadBlogData();
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const handleBlogSave = async (savedBlog) => {
    setShowBlogForm(false);
    setEditingBlog(null);
    // Refresh the blog data
    await loadBlogData();
    alert(`Blog post ${editingBlog ? 'updated' : 'created'} successfully!`);
  };

  const handleBlogCancel = () => {
    setShowBlogForm(false);
    setEditingBlog(null);
  };

  // Combine featured post with regular posts for searching
  const allPosts = featuredPost ? [featuredPost, ...blogPosts] : blogPosts;
  
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' || 
                         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Separate featured post from regular posts
  const filteredFeaturedPost = filteredPosts.find(post => post.id === featuredPost.id);
  const filteredRegularPosts = filteredPosts.filter(post => post.id !== featuredPost.id);

  return (
    <>
      {/* Blog Form Modal */}
      {showBlogForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
            </div>

            {/* Modal panel */}
            <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-transparent">
              <BlogForm
                initialData={editingBlog}
                onSave={handleBlogSave}
                onCancel={handleBlogCancel}
                isEditing={!!editingBlog}
              />
            </div>
          </div>
        </div>
      )}

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
          
          {/* Management Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateBlog}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Blog</span>
              </button>
              <button
                onClick={() => setIsManagementMode(!isManagementMode)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isManagementMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Edit className="h-5 w-5" />
                <span>{isManagementMode ? 'Exit Management' : 'Manage Blogs'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          <span className="ml-3 text-white">Loading blog posts...</span>
        </div>
      )}

      {/* Search and Filters Section */}
      {!loading && (
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
                  className="w-full pl-10 pr-12 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
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
      )}

      {/* Featured Post */}
      {filteredFeaturedPost && (
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
                    {filteredFeaturedPost.trending && (
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">Trending</span>
                      </div>
                    )}
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {filteredFeaturedPost.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {filteredFeaturedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-white text-sm font-medium">{filteredFeaturedPost.author?.name || filteredFeaturedPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{filteredFeaturedPost.formattedDate || filteredFeaturedPost.publishDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{filteredFeaturedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {filteredFeaturedPost.tags.map((tag) => (
                        <span key={tag} className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleReadMore(filteredFeaturedPost)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                    >
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
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-3xl font-bold text-white">
                Latest Articles
              </h2>
              {searchTerm && (
                <p className="text-gray-400">
                  {filteredRegularPosts.length + (filteredFeaturedPost ? 1 : 0)} result(s) for "{searchTerm}"
                </p>
              )}
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRegularPosts.length > 0 ? (
                filteredRegularPosts.map((post, index) => (
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
                          <span className="text-white text-sm">{post.author?.name || post.author}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{(post.views + (viewCounts[post.id] || 0)).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(post.id);
                              }}
                              className={`flex items-center space-x-1 transition-colors duration-200 ${
                                likedPosts.has(post.id) ? 'text-red-400' : 'hover:text-red-400'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.formattedDate || post.publishDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {isManagementMode ? (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditBlog(post);
                                }}
                                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBlog(post._id || post.id);
                                }}
                                className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(post.id);
                                }}
                                className={`p-2 rounded-lg transition-colors duration-200 ${
                                  bookmarkedPosts.has(post.id) 
                                    ? 'text-yellow-400 bg-yellow-400/10' 
                                    : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                                }`}
                              >
                                <Bookmark className={`h-4 w-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShare(post);
                                }}
                                className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors duration-200"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleReadMore(post)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors duration-200"
                              >
                                Read More
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))) : (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                  <p className="text-gray-400">
                    {searchTerm ? 
                      `No articles match "${searchTerm}". Try adjusting your search terms.` : 
                      `No articles found in the "${categories.find(c => c.id === selectedCategory)?.name}" category.`
                    }
                  </p>
                </div>
              )}
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
    </>
  );
};

export default TechBlogs;