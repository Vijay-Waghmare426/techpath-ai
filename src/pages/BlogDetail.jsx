import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../services/blogAPI';
import Card from '../components/Card';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Tag
} from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // For now, we'll use the ID from the slug
        const postId = slug.split('-').pop();
        const response = await blogAPI.getBlogPosts();
        
        // Find the post by ID (in a real app, you'd have a getPostBySlug endpoint)
        const foundPost = response.find(p => p.id.toString() === postId);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      await blogAPI.likeBlogPost(post.id, !liked);
      setLiked(!liked);
      setPost(prev => ({
        ...prev,
        likes: prev.likes + (liked ? -1 : 1)
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleBookmark = async () => {
    if (!post) return;
    
    try {
      await blogAPI.bookmarkBlogPost(post.id, !bookmarked);
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const handleShare = async () => {
    if (!post) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      const shareText = `Check out this article: ${post.title} - ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Article link copied to clipboard!');
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The requested article could not be found.'}</p>
          <button
            onClick={() => navigate('/tech-blogs')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/tech-blogs')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </motion.button>

        <Card>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* Category Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-4 w-4 text-purple-400" />
              <span className="text-purple-400 text-sm capitalize font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-white font-medium">{post.author.name}</span>
                <span>•</span>
                <span>{post.author.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{post.formattedDate || post.publishDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />

              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    liked 
                      ? 'text-red-400 bg-red-400/10' 
                      : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    bookmarked 
                      ? 'text-yellow-400 bg-yellow-400/10' 
                      : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>Bookmark</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors duration-200"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Article Content */}
            <div className="text-gray-300 leading-relaxed space-y-6">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="space-y-6">
                {post.content ? (
                  // Split content by double newlines to create paragraphs
                  post.content.split('\n\n').map((paragraph, index) => {
                    // Check if it's a heading (starts with #)
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">
                          {paragraph.substring(2)}
                        </h1>
                      );
                    } else if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                          {paragraph.substring(3)}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">
                          {paragraph.substring(4)}
                        </h3>
                      );
                    } else if (paragraph.startsWith('- ')) {
                      // Handle lists
                      const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                      return (
                        <ul key={index} className="space-y-2 ml-4">
                          {listItems.map((item, listIndex) => (
                            <li key={listIndex} className="list-disc list-inside">
                              {item.substring(2)}
                            </li>
                          ))}
                        </ul>
                      );
                    } else if (paragraph.startsWith('```')) {
                      // Handle code blocks
                      const codeContent = paragraph.replace(/```\w*\n?/, '').replace(/```$/, '');
                      return (
                        <pre key={index} className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                          <code className="text-green-400 text-sm">{codeContent}</code>
                        </pre>
                      );
                    } else {
                      // Regular paragraph
                      return (
                        <p key={index} className="text-gray-300">
                          {paragraph}
                        </p>
                      );
                    }
                  })
                ) : (
                  <p className="text-gray-400 italic">No content available.</p>
                )}
              </div>
            </div>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
};

export default BlogDetail;