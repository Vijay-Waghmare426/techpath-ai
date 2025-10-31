const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['javascript', 'react', 'nodejs', 'cloud', 'devops', 'ai', 'career', 'general'],
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  readTime: {
    type: String,
    required: true,
    default: '5 min read'
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
  shares: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
blogPostSchema.index({ category: 1, isPublished: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ isFeatured: -1, isTrending: -1 });
blogPostSchema.index({ publishedAt: -1 });
blogPostSchema.index({ slug: 1 });

// Pre-save middleware to generate slug
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  this.lastModified = new Date();
  next();
});

// Virtual for formatted publish date
blogPostSchema.virtual('formattedDate').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.publishedAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
  return this.publishedAt.toLocaleDateString();
});

// Static method to get featured posts
blogPostSchema.statics.getFeatured = function() {
  return this.findOne({ isFeatured: true, isPublished: true })
    .sort({ publishedAt: -1 });
};

// Static method to get posts by category
blogPostSchema.statics.getByCategory = function(category, limit = 10) {
  const query = { isPublished: true };
  if (category && category !== 'all') {
    query.category = category;
  }
  return this.find(query)
    .sort({ publishedAt: -1 })
    .limit(limit);
};

// Static method to search posts
blogPostSchema.statics.searchPosts = function(searchTerm, category = 'all') {
  const query = { isPublished: true };
  
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { excerpt: { $regex: searchTerm, $options: 'i' } },
      { 'author.name': { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ];
  }
  
  return this.find(query).sort({ publishedAt: -1 });
};

// Instance method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
blogPostSchema.methods.toggleLike = function(increment = true) {
  this.likes += increment ? 1 : -1;
  return this.save();
};

// Instance method to toggle bookmark
blogPostSchema.methods.toggleBookmark = function(increment = true) {
  this.bookmarks += increment ? 1 : -1;
  return this.save();
};

module.exports = mongoose.model('BlogPost', blogPostSchema);