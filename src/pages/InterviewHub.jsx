import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { useInterview } from '../context/InterviewContext';
import { Heart } from 'lucide-react';
import { useExpandedAnswers, useSearch, useBookmarks, useProgress, useErrorHandler } from '../hooks/useInterview';
import { getDifficultyColor } from '../utils/helpers';
import { 
  Code, 
  Server, 
  Cloud, 
  Shield, 
  Smartphone, 
  Database,
  Search,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  Bookmark,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader,
  AlertCircle
} from 'lucide-react';

const InterviewHub = () => {
  const { 
    categories, 
    questions, 
    selectedCategory, 
    loading, 
    error,
    stats,
    actions
  } = useInterview();  const { expandedAnswers, toggleAnswer, clearExpandedAnswers } = useExpandedAnswers();
  const { searchTerm, handleSearchChange } = useSearch();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { markQuestionAsViewed, markQuestionAsAnswered } = useProgress();
  const { clearError } = useErrorHandler();

  // Debug logging for stats
  useEffect(() => {
    console.log('InterviewHub stats:', stats);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
    
    // Test API call directly
    const testAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions/stats');
        const data = await response.json();
        console.log('Direct API test:', data);
      } catch (error) {
        console.error('Direct API test failed:', error);
      }
    };
    
    testAPI();
  }, [stats, loading, error]);

  // Icon mapping for dynamic rendering
  const iconMap = {
    Code,
    Server,
    Cloud,
    Shield,
    Smartphone,
    Database
  };



  const mockInterviews = [
    {
      title: "Frontend Live Coding",
      description: "Practice live coding challenges with React components and state management.",
      duration: "45 min",
      participants: 12,
      nextSession: "Today, 3:00 PM"
    },
    {
      title: "System Design Discussion",
      description: "Design a scalable chat application with real-time messaging capabilities.",
      duration: "60 min",
      participants: 8,
      nextSession: "Tomorrow, 10:00 AM"
    },
    {
      title: "Behavioral Interview Prep",
      description: "Practice common behavioral questions with experienced interviewers.",
      duration: "30 min",
      participants: 15,
      nextSession: "Today, 6:00 PM"
    }
  ];

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    actions.selectCategory(categoryId);
    clearExpandedAnswers();
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    actions.goBackToCategories();
    clearExpandedAnswers();
  };

  // Handle answer toggle with view tracking
  const handleAnswerToggle = (questionId) => {
    toggleAnswer(questionId);
    if (!expandedAnswers[questionId]) {
      actions.updateQuestionStats(questionId, 'views');
      markQuestionAsViewed(questionId);
      markQuestionAsAnswered(questionId);
    }
  };

  // Handle search change
  const handleSearchInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (questionId) => {
    toggleBookmark(questionId);
  };

  // Handle mock interview join
  const handleJoinMockInterview = (interviewTitle) => {
    alert(`Joining ${interviewTitle}... This feature will connect you to a live mock interview session!`);
    // In a real app, this would:
    // 1. Check user authentication
    // 2. Reserve a spot in the interview session
    // 3. Navigate to the interview room
    // 4. Set up video/audio connection
  };

  // Clear error on mount
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);



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
              Interview
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Hub
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Master technical interviews with real interview questions, detailed answers, and practice sessions
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && !error && !selectedCategory && (
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
                <BookOpen className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.totalQuestions}
                </div>
                <div className="text-gray-400 text-sm">Total Questions</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.totalCategories}
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
                <Eye className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.totalViews?.toLocaleString() || 0}
                </div>
                <div className="text-gray-400 text-sm">Total Views</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
                <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.popularQuestions}
                </div>
                <div className="text-gray-400 text-sm">Popular Questions</div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search and Filters - Only show when category is selected */}
      {selectedCategory && (
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Back Button */}
              <button
                onClick={handleBackToCategories}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Categories</span>
              </button>

              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions in this category..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <Loader className="h-12 w-12 text-purple-400 animate-spin" />
              <p className="text-gray-400">Loading interview data...</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center"
            >
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-red-400 font-semibold mb-2">Something went wrong</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={() => {
                  clearError();
                  actions.fetchCategories();
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories or Questions based on selection */}
      {!loading && !error && (
        <>
          {!selectedCategory ? (
            /* Interview Categories */
            <section className="px-4 sm:px-6 lg:px-8 mb-16">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-8 text-white"
                >
                  Choose Your Interview Category
                </motion.h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => {
                    const IconComponent = iconMap[category.icon];
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full relative cursor-pointer group" onClick={() => handleCategorySelect(category.id)}>
                          {category.popular && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </div>
                          )}
                          
                          <div className="space-y-4">
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                              {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {category.name}
                            </h3>
                            
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {category.description}
                            </p>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-purple-400" />
                                <span className="text-purple-400 text-sm font-medium">
                                  {category.questionCount} Questions
                                </span>
                              </div>
                              <div className="text-purple-400">
                                <Play className="h-5 w-5" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            /* Interview Questions for Selected Category */
            <section className="px-4 sm:px-6 lg:px-8 mb-16">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-8 text-white"
                >
                  {categories.find(cat => cat.id === selectedCategory)?.name} Questions ({questions.length})
                </motion.h2>
                
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="relative">
                        {question.popular && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </div>
                        )}
                        
                        <div className="space-y-4">
                          {/* Question Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white leading-tight mb-3">
                                Q{index + 1}: {question.question}
                              </h3>
                              
                              {/* Stats */}
                              <div className="flex items-center gap-3 text-sm mb-4">
                                <span className={`px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                                  {question.difficulty}
                                </span>
                                <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                                  {question.type}
                                </span>
                                {question.views && (
                                  <span className="text-gray-400 text-xs flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {question.views}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="ml-4 flex items-center space-x-2">
                              <button
                                onClick={() => actions.updateQuestionStats(question._id, 'likes')}
                                className="p-2 rounded-lg transition-colors bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                                title="Like this question"
                              >
                                <div className="flex items-center">
                                  <Heart className={`h-4 w-4 ${question.likes > 0 ? 'text-red-400' : ''}`} />
                                  <span className="ml-1 text-sm">{question.likes || 0}</span>
                                </div>
                              </button>
                              <button
                                onClick={() => handleBookmarkToggle(question._id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isBookmarked(question._id)
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                                }`}
                              >
                                <Bookmark className="h-4 w-4" />
                              </button>
                              
                              <button
                                onClick={() => handleAnswerToggle(question.id)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
                              >
                                {expandedAnswers[question.id] ? (
                                  <>
                                    <EyeOff className="h-4 w-4" />
                                    <span>Hide Answer</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4" />
                                    <span>Show Answer</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag) => (
                              <span key={tag} className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Answer Section */}
                          {expandedAnswers[question.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 rounded-lg"
                            >
                              <h4 className="text-green-400 font-medium mb-2 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Answer:
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {question.answer}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {questions.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Questions Found</h3>
                    <p className="text-gray-400">Try adjusting your search terms.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}

      {/* Mock Interviews */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-white"
          >
            Live Mock Interviews
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mockInterviews.map((interview, index) => (
              <motion.div
                key={interview.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="featured" className="h-full">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">{interview.title}</h3>
                    <p className="text-gray-400 text-sm">{interview.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{interview.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white">{interview.participants} joined</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Session:</span>
                        <span className="text-purple-400">{interview.nextSession}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleJoinMockInterview(interview.title)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
                    >
                      Join Session
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default InterviewHub;