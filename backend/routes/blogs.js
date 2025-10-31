const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// @route   GET /api/blogs
// @desc    Get all blog posts with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    
    // Use the model's search method
    let query;
    if (search) {
      query = BlogPost.searchPosts(search, category);
    } else {
      query = BlogPost.getByCategory(category, limit);
    }
    
    // Calculate pagination for search results
    if (search) {
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(parseInt(limit));
    }
    
    const posts = await query;
    
    // Get total count for pagination
    const total = search ? 
      await BlogPost.countDocuments(await BlogPost.searchPosts(search, category).getQuery()) :
      await BlogPost.countDocuments({ 
        isPublished: true, 
        ...(category && category !== 'all' ? { category } : {}) 
      });
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog posts',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/featured
// @desc    Get featured blog post
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredPost = await BlogPost.getFeatured();
    
    if (!featuredPost) {
      return res.status(404).json({
        success: false,
        message: 'No featured post found'
      });
    }
    
    res.json({
      success: true,
      data: featuredPost
    });
  } catch (error) {
    console.error('Error fetching featured post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured post',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/trending
// @desc    Get trending blog posts
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const trendingPosts = await BlogPost
      .find({ isTrending: true, isPublished: true })
      .sort({ views: -1, publishedAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      data: trendingPosts
    });
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending posts',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/categories
// @desc    Get all available categories with post counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: categories.map(cat => ({
        id: cat._id,
        name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1),
        count: cat.count
      }))
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog categories',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/trending-topics
// @desc    Get trending topics with post counts
// @access  Public
router.get('/trending-topics', async (req, res) => {
  try {
    const trendingTopics = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', posts: { $sum: 1 } } },
      { $sort: { posts: -1 } },
      { $limit: 10 },
      { $project: { name: '$_id', posts: 1, _id: 0 } }
    ]);
    
    res.json({
      success: true,
      data: trendingTopics
    });
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending topics',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog post',
      error: error.message
    });
  }
});

// @route   PUT /api/blogs/:id/like
// @desc    Toggle like for a blog post
// @access  Public (in production, this should be authenticated)
router.put('/:id/like', async (req, res) => {
  try {
    const { increment = true } = req.body;
    const post = await BlogPost.findById(req.params.id);
    
    if (!post || !post.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    await post.toggleLike(increment);
    
    res.json({
      success: true,
      data: { likes: post.likes }
    });
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking blog post',
      error: error.message
    });
  }
});

// @route   PUT /api/blogs/:id/bookmark
// @desc    Toggle bookmark for a blog post
// @access  Public (in production, this should be authenticated)
router.put('/:id/bookmark', async (req, res) => {
  try {
    const { increment = true } = req.body;
    const post = await BlogPost.findById(req.params.id);
    
    if (!post || !post.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    await post.toggleBookmark(increment);
    
    res.json({
      success: true,
      data: { bookmarks: post.bookmarks }
    });
  } catch (error) {
    console.error('Error bookmarking blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while bookmarking blog post',
      error: error.message
    });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post
// @access  Public (in a real app, this would require authentication)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      author,
      readTime,
      featured = false
    } = req.body;

    // Validate required fields
    if (!title || !content || !excerpt || !category || !author) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, content, excerpt, category, and author are required'
      });
    }

    // Create new blog post
    const blogPost = new BlogPost({
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      author: typeof author === 'string' ? { name: author, role: 'Developer' } : author,
      readTime: readTime || '5 min',
      featured,
      publishDate: new Date(),
      isPublished: true
    });

    const savedPost = await blogPost.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: savedPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating blog post',
      error: error.message
    });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @access  Public (in a real app, this would require authentication)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated this way
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating blog post',
      error: error.message
    });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Public (in a real app, this would require authentication)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: deletedPost
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blog post',
      error: error.message
    });
  }
});

module.exports = router;