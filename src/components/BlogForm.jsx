import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { blogAPI } from '../services/blogAPI';
import { 
  Save, 
  X,
  Eye,
  Edit
} from 'lucide-react';

const BlogForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'frontend',
    tags: [],
    author: {
      name: '',
      role: 'Developer'
    },
    readTime: '5 min',
    featured: false
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        excerpt: initialData.excerpt || '',
        category: initialData.category || 'frontend',
        tags: initialData.tags || [],
        author: typeof initialData.author === 'string' 
          ? { name: initialData.author, role: 'Developer' }
          : initialData.author || { name: '', role: 'Developer' },
        readTime: initialData.readTime || '5 min',
        featured: initialData.featured || false
      });
    }
  }, [initialData]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await blogAPI.getBlogCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'author') {
      setFormData(prev => ({
        ...prev,
        author: { ...prev.author, name: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        // formData.author is already an object with name and role
      };

      let result;
      if (isEditing && initialData?._id) {
        result = await blogAPI.updateBlogPost(initialData._id, submitData);
      } else {
        result = await blogAPI.createBlogPost(submitData);
      }

      if (result.success) {
        onSave && onSave(result.data);
      } else {
        setError(result.message || 'Failed to save blog post');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while saving');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    return formData.title.trim() && 
           formData.content.trim() && 
           formData.excerpt.trim() && 
           formData.author.name.trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors duration-200"
            >
              {isPreviewMode ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isPreviewMode ? (
          // Preview Mode
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">{formData.title}</h1>
              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-6">
                <span>{formData.author.name}</span>
                <span>•</span>
                <span>{formData.readTime}</span>
                <span>•</span>
                <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                  {formData.category}
                </span>
                {formData.featured && (
                  <>
                    <span>•</span>
                    <span className="bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">
                      Featured
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-300 text-lg mb-6">{formData.excerpt}</p>
              <div className="prose prose-invert max-w-none">
                {formData.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 mb-4">{paragraph}</p>
                ))}
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
                placeholder="Enter blog post title..."
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 resize-none"
                placeholder="Brief description of the blog post..."
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="15"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 resize-none"
                placeholder="Write your blog post content here..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                >
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="cloud">Cloud Computing</option>
                  <option value="devops">DevOps & Security</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="general">General Tech</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
                  placeholder="Author name..."
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Read Time */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
                  placeholder="e.g., 5 min"
                />
              </div>

              {/* Featured */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Options
                </label>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 bg-white/5 border border-white/10 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="featured" className="text-white text-sm">
                    Mark as Featured
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Tags
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
                  placeholder="Type a tag and press Enter..."
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-red-400 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!validateForm() || isSubmitting}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</span>
              </button>
            </div>
          </form>
        )}
      </Card>
    </motion.div>
  );
};

export default BlogForm;