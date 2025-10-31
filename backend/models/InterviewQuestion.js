const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'cloud', 'devops', 'mobile', 'ai'],
    lowercase: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  type: {
    type: String,
    required: true,
    enum: ['Conceptual', 'Implementation', 'System Design', 'Performance', 'Debugging'],
    default: 'Conceptual'
  },
  tags: [{
    type: String,
    trim: true
  }],
  popular: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  bookmarks: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
interviewQuestionSchema.index({ category: 1, difficulty: 1 });
interviewQuestionSchema.index({ tags: 1 });
interviewQuestionSchema.index({ popular: -1, views: -1 });

// Virtual for question summary
interviewQuestionSchema.virtual('summary').get(function() {
  return this.question.length > 100 ? 
    this.question.substring(0, 100) + '...' : 
    this.question;
});

// Static method to get questions by category
interviewQuestionSchema.statics.getByCategory = function(category) {
  return this.find({ category: category, isActive: true });
};

// Static method to get popular questions
interviewQuestionSchema.statics.getPopular = function(limit = 10) {
  return this.find({ popular: true, isActive: true })
    .sort({ views: -1 })
    .limit(limit);
};

// Instance method to increment views
interviewQuestionSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);