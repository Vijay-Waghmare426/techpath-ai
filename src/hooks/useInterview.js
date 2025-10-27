import { useState, useEffect } from 'react';
import { useInterview } from '../context/InterviewContext';
import { getQuestionStats } from '../services/interviewAPI';

// Custom hook for getting dynamic stats
export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await getQuestionStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

// Custom hook for managing expanded answers
export const useExpandedAnswers = () => {
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const toggleAnswer = (questionId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const expandAnswer = (questionId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const collapseAnswer = (questionId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: false
    }));
  };

  const clearExpandedAnswers = () => {
    setExpandedAnswers({});
  };

  return {
    expandedAnswers,
    toggleAnswer,
    expandAnswer,
    collapseAnswer,
    clearExpandedAnswers
  };
};

// Custom hook for search functionality
export const useSearch = () => {
  const { filters, actions } = useInterview();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== filters.search) {
        actions.updateFilters({ search: searchTerm });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters.search, actions]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    actions.updateFilters({ search: '' });
  };

  return {
    searchTerm,
    handleSearchChange,
    clearSearch
  };
};

// Custom hook for filtering
export const useFilters = () => {
  const { filters, actions } = useInterview();

  const updateFilter = (filterType, value) => {
    actions.updateFilters({ [filterType]: value });
  };

  const clearFilters = () => {
    actions.updateFilters({
      search: '',
      difficulty: '',
      type: '',
      sortBy: ''
    });
  };

  const applyFilters = (newFilters) => {
    actions.updateFilters(newFilters);
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    applyFilters,
    hasActiveFilters: Object.values(filters).some(value => value !== '')
  };
};

// Custom hook for question stats
export const useQuestionStats = () => {
  const { actions } = useInterview();

  const incrementViews = (questionId) => {
    actions.updateQuestionStats(questionId, 'views');
  };

  const incrementLikes = (questionId) => {
    actions.updateQuestionStats(questionId, 'likes');
  };

  return {
    incrementViews,
    incrementLikes
  };
};

// Custom hook for local storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Custom hook for bookmarks
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useLocalStorage('interview_bookmarks', []);

  const addBookmark = (questionId) => {
    setBookmarks(prev => {
      if (!prev.includes(questionId)) {
        return [...prev, questionId];
      }
      return prev;
    });
  };

  const removeBookmark = (questionId) => {
    setBookmarks(prev => prev.filter(id => id !== questionId));
  };

  const toggleBookmark = (questionId) => {
    if (bookmarks.includes(questionId)) {
      removeBookmark(questionId);
    } else {
      addBookmark(questionId);
    }
  };

  const isBookmarked = (questionId) => {
    return bookmarks.includes(questionId);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearBookmarks
  };
};

// Custom hook for progress tracking
export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage('interview_progress', {});

  const markQuestionAsViewed = (questionId) => {
    setProgress(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        viewed: true,
        viewedAt: new Date().toISOString()
      }
    }));
  };

  const markQuestionAsAnswered = (questionId) => {
    setProgress(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answered: true,
        answeredAt: new Date().toISOString()
      }
    }));
  };

  const getCategoryProgress = (categoryId, questions) => {
    const categoryQuestions = questions.filter(q => q.category === categoryId);
    const viewedCount = categoryQuestions.filter(q => progress[q.id]?.viewed).length;
    const answeredCount = categoryQuestions.filter(q => progress[q.id]?.answered).length;
    
    return {
      total: categoryQuestions.length,
      viewed: viewedCount,
      answered: answeredCount,
      viewedPercentage: categoryQuestions.length ? (viewedCount / categoryQuestions.length) * 100 : 0,
      answeredPercentage: categoryQuestions.length ? (answeredCount / categoryQuestions.length) * 100 : 0
    };
  };

  return {
    progress,
    markQuestionAsViewed,
    markQuestionAsAnswered,
    getCategoryProgress
  };
};

// Custom hook for error handling
export const useErrorHandler = () => {
  const { error, actions } = useInterview();

  const handleError = (errorMessage) => {
    console.error('Interview Hub Error:', errorMessage);
    // Could integrate with error reporting service here
  };

  const clearError = () => {
    actions.clearError();
  };

  return {
    error,
    handleError,
    clearError,
    hasError: !!error
  };
};