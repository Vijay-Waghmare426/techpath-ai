const express = require('express');
const router = express.Router();
const InterviewQuestion = require('../models/InterviewQuestion');
const BlogPost = require('../models/BlogPost');

// @route   GET /api/stats/home
// @desc    Get accurate statistics for home page
// @access  Public
router.get('/home', async (req, res) => {
  try {
    // Get interview questions count with active status
    const totalQuestions = await InterviewQuestion.countDocuments({ isActive: true });
    
    // Get tech articles count that are published
    const totalArticles = await BlogPost.countDocuments({ isPublished: true });

    // Add 500+ if questions are more than 500, else show actual number
    const formattedQuestions = totalQuestions > 500 ? '500+' : totalQuestions;
    
    // Add 100+ if articles are more than 100, else show actual number
    const formattedArticles = totalArticles > 100 ? '100+' : totalArticles;
    
    res.json({
      success: true,
      data: {
        interviewQuestions: formattedQuestions,
        techArticles: formattedArticles,
        aiSupport: "24/7", // This is a constant since it's a service feature
        rawCounts: {
          questions: totalQuestions,
          articles: totalArticles
        }
      }
    });
  } catch (error) {
    console.error('Error fetching home stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching home stats',
      error: error.message
    });
  }
});

module.exports = router;