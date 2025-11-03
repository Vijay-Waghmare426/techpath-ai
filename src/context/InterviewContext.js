import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { interviewAPI } from '../services/interviewAPI';

// Initial state
const initialState = {
  categories: [],
  questions: [],
  selectedCategory: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    difficulty: '',
    type: '',
    sortBy: ''
  },
  stats: {
    totalQuestions: 0,
    totalCategories: 0,

    popularQuestions: 0
  }
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_FILTERS: 'SET_FILTERS',
  SET_STATS: 'SET_STATS',
  CLEAR_QUESTIONS: 'CLEAR_QUESTIONS',
  UPDATE_QUESTION_STATS: 'UPDATE_QUESTION_STATS',
  RESET_STATE: 'RESET_STATE'
};

// Reducer function
const interviewReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        stats: {
          ...state.stats,
          totalCategories: action.payload.length
        },
        loading: false,
        error: null
      };

    case ActionTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        stats: {
          ...state.stats,
          totalQuestions: action.payload.length
        },
        loading: false,
        error: null
      };

    case ActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
        questions: [], // Clear questions when category changes
        filters: {
          ...initialState.filters // Reset filters
        }
      };

    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case ActionTypes.CLEAR_QUESTIONS:
      return {
        ...state,
        questions: [],
        selectedCategory: null
      };

    case ActionTypes.UPDATE_QUESTION_STATS:
      return {
        ...state,
        questions: state.questions.map(question =>
          question.id === action.payload.questionId
            ? {
                ...question,
                [action.payload.statType]: question[action.payload.statType] + 1
              }
            : question
        )
      };

    case ActionTypes.SET_STATS:
      return {
        ...state,
        stats: action.payload
      };

    case ActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Create context
const InterviewContext = createContext();

// Context provider component
export const InterviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interviewReducer, initialState);

  // Action creators
  const actions = {
    // Fetch all categories
    fetchCategories: async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const response = await interviewAPI.getCategories();
        if (response.success) {
          dispatch({ type: ActionTypes.SET_CATEGORIES, payload: response.data });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: response.message });
        }
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to fetch categories' });
      }
    },

    // Select a category
    selectCategory: async (categoryId) => {
      dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: categoryId });
      await actions.fetchQuestionsByCategory(categoryId);
    },

    // Fetch questions by category
    fetchQuestionsByCategory: async (categoryId, filters = {}) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const response = await interviewAPI.getQuestionsByCategory(categoryId, filters);
        if (response.success) {
          dispatch({ type: ActionTypes.SET_QUESTIONS, payload: response.data });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: response.message });
        }
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to fetch questions' });
      }
    },

    // Update filters
    updateFilters: async (newFilters) => {
      dispatch({ type: ActionTypes.SET_FILTERS, payload: newFilters });
      
      // Re-fetch questions with new filters if category is selected
      if (state.selectedCategory) {
        await actions.fetchQuestionsByCategory(state.selectedCategory, {
          ...state.filters,
          ...newFilters
        });
      }
    },

    // Search questions
    searchQuestions: async (searchTerm, filters = {}) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const response = await interviewAPI.searchQuestions(searchTerm, filters);
        if (response.success) {
          dispatch({ type: ActionTypes.SET_QUESTIONS, payload: response.data });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: response.message });
        }
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Search failed' });
      }
    },

    // Update question stats (views, likes)
    updateQuestionStats: async (questionId, statType) => {
      try {
        let response;
 if (statType === 'likes') {
          response = await interviewAPI.incrementLikes(questionId);
        }

        if (response?.success) {
          dispatch({
            type: ActionTypes.UPDATE_QUESTION_STATS,
            payload: { questionId, statType }
          });
          // Refresh stats after updating
          actions.fetchStats();
        }
      } catch (error) {
        console.error(`Failed to update ${statType}:`, error);
      }
    },

    // Go back to categories
    goBackToCategories: () => {
      dispatch({ type: ActionTypes.CLEAR_QUESTIONS });
    },

    // Fetch stats
    fetchStats: async () => {
      try {
        const response = await interviewAPI.getStats();
        if (response.success) {
          dispatch({ type: ActionTypes.SET_STATS, payload: response.data });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },

    // Clear error
    clearError: () => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: null });
    },

    // Reset entire state
    resetState: () => {
      dispatch({ type: ActionTypes.RESET_STATE });
    }
  };

  // Auto-fetch categories on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        // Fetch categories and stats in parallel
        const [categoriesResponse, statsResponse] = await Promise.all([
          interviewAPI.getCategories(),
          interviewAPI.getStats()
        ]);
        
        if (categoriesResponse.success) {
          dispatch({ type: ActionTypes.SET_CATEGORIES, payload: categoriesResponse.data });
        } else {
          dispatch({ type: ActionTypes.SET_ERROR, payload: categoriesResponse.message });
        }
        
        if (statsResponse.success) {
          console.log('Stats API Response:', statsResponse.data);
          dispatch({ type: ActionTypes.SET_STATS, payload: statsResponse.data });
        } else {
          console.error('Stats API failed:', statsResponse);
        }
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to fetch data' });
      }
    };
    
    fetchInitialData();
  }, []); // Empty dependency array

  const contextValue = {
    ...state,
    actions
  };

  return (
    <InterviewContext.Provider value={contextValue}>
      {children}
    </InterviewContext.Provider>
  );
};

// Custom hook to use the context
export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};

export default InterviewContext;