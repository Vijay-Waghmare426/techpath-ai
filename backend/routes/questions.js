const express = require('express');
const router = express.Router();
const InterviewQuestion = require('../models/InterviewQuestion');

// @route   GET /api/questions
// @desc    Get all interview questions with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, type, search, limit = 50, page = 1 } = req.query;
    
    // Build query object
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (type) {
      query.type = type;
    }
    
    // Add search functionality
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const questions = await InterviewQuestion
      .find(query)
      .sort({ popular: -1, views: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await InterviewQuestion.countDocuments(query);
    
    res.json({
      success: true,
      data: questions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching questions',
      error: error.message
    });
  }
});

// @route   GET /api/questions/categories
// @desc    Get all available categories with question counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await InterviewQuestion.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    // Add category metadata
    const categoryMap = {
      frontend: { name: 'Frontend Development', icon: 'Code' },
      backend: { name: 'Backend Development', icon: 'Server' },
      cloud: { name: 'Cloud Computing', icon: 'Cloud' },
      devops: { name: 'DevOps & Security', icon: 'Shield' },
      mobile: { name: 'Mobile Development', icon: 'Smartphone' },
      ai: { name: 'AI & Machine Learning', icon: 'Brain' }
    };
    
    const enrichedCategories = categories.map(cat => ({
      id: cat._id,
      name: categoryMap[cat._id]?.name || cat._id,
      icon: categoryMap[cat._id]?.icon || 'Code',
      count: cat.count
    }));
    
    res.json({
      success: true,
      data: enrichedCategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message
    });
  }
});

// @route   GET /api/questions/stats
// @desc    Get question statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalQuestions = await InterviewQuestion.countDocuments({ isActive: true });
    const totalCategories = await InterviewQuestion.distinct('category', { isActive: true });
    const popularQuestions = await InterviewQuestion.countDocuments({ popular: true, isActive: true });
    
    // Calculate total views across all questions
    const totalViewsResult = await InterviewQuestion.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalViews = totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;
    
    // Get difficulty distribution
    const difficultyStats = await InterviewQuestion.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);
    
    // Get category distribution with question counts
    const categoryStats = await InterviewQuestion.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 }, totalViews: { $sum: '$views' } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get most viewed questions
    const mostViewedQuestions = await InterviewQuestion.find({ isActive: true })
      .sort({ views: -1 })
      .limit(5)
      .select('question category difficulty views');
    
    res.json({
      success: true,
      data: {
        totalQuestions,
        totalCategories: totalCategories.length,
        popularQuestions,
        totalViews,
        difficultyDistribution: difficultyStats,
        categoryDistribution: categoryStats,
        mostViewedQuestions
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching stats',
      error: error.message
    });
  }
});

// @route   GET /api/questions/:id
// @desc    Get single question by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    
    if (!question || !question.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Increment views
    await question.incrementViews();
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching question',
      error: error.message
    });
  }
});

// @route   PUT /api/questions/:id/like
// @desc    Toggle like for a question
// @access  Public (in production, this should be authenticated)
router.put('/:id/like', async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    
    if (!question || !question.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Toggle like (in production, you'd check if user already liked)
    question.likes += 1;
    await question.save();
    
    res.json({
      success: true,
      data: { likes: question.likes }
    });
  } catch (error) {
    console.error('Error liking question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking question',
      error: error.message
    });
  }
});

module.exports = router;