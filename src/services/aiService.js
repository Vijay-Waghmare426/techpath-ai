const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const aiService = {
  getChatResponse: async (message) => {
    try {
      console.log('Sending request to AI:', message);
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.details || 'Network response was not ok');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      return data.response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  }
};