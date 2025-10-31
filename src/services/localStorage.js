// Local storage service for persisting user data
class LocalStorageService {
  // Keys for different data types
  static KEYS = {
    BOOKMARKED_POSTS: 'techpath_bookmarked_posts',
    LIKED_POSTS: 'techpath_liked_posts',
    VIEWED_QUESTIONS: 'techpath_viewed_questions',
    ANSWERED_QUESTIONS: 'techpath_answered_questions',
    USER_PROGRESS: 'techpath_user_progress',
    CHAT_HISTORY: 'techpath_chat_history'
  };

  // Generic methods for localStorage operations
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Specific methods for blog posts
  static getBookmarkedPosts() {
    return new Set(this.get(this.KEYS.BOOKMARKED_POSTS, []));
  }

  static setBookmarkedPosts(bookmarkedSet) {
    return this.set(this.KEYS.BOOKMARKED_POSTS, Array.from(bookmarkedSet));
  }

  static getLikedPosts() {
    return new Set(this.get(this.KEYS.LIKED_POSTS, []));
  }

  static setLikedPosts(likedSet) {
    return this.set(this.KEYS.LIKED_POSTS, Array.from(likedSet));
  }

  // Methods for interview questions
  static getViewedQuestions() {
    return new Set(this.get(this.KEYS.VIEWED_QUESTIONS, []));
  }

  static setViewedQuestions(viewedSet) {
    return this.set(this.KEYS.VIEWED_QUESTIONS, Array.from(viewedSet));
  }

  static getAnsweredQuestions() {
    return new Set(this.get(this.KEYS.ANSWERED_QUESTIONS, []));
  }

  static setAnsweredQuestions(answeredSet) {
    return this.set(this.KEYS.ANSWERED_QUESTIONS, Array.from(answeredSet));
  }

  // Methods for user progress
  static getUserProgress() {
    return this.get(this.KEYS.USER_PROGRESS, {
      totalQuestionsViewed: 0,
      totalQuestionsAnswered: 0,
      categoriesExplored: [],
      lastActivity: null
    });
  }

  static setUserProgress(progress) {
    return this.set(this.KEYS.USER_PROGRESS, progress);
  }

  // Methods for chat history
  static getChatHistory() {
    return this.get(this.KEYS.CHAT_HISTORY, []);
  }

  static setChatHistory(messages) {
    // Limit to last 50 messages to prevent localStorage bloat
    const limitedMessages = messages.slice(-50);
    return this.set(this.KEYS.CHAT_HISTORY, limitedMessages);
  }

  static addChatMessage(message) {
    const history = this.getChatHistory();
    history.push(message);
    return this.setChatHistory(history);
  }

  // Utility methods
  static getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  static exportUserData() {
    const userData = {};
    Object.values(this.KEYS).forEach(key => {
      userData[key] = this.get(key);
    });
    return userData;
  }

  static importUserData(userData) {
    try {
      Object.entries(userData).forEach(([key, value]) => {
        if (Object.values(this.KEYS).includes(key)) {
          this.set(key, value);
        }
      });
      return true;
    } catch (error) {
      console.error('Error importing user data:', error);
      return false;
    }
  }
}

export default LocalStorageService;