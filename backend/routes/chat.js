const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API with error handling
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY environment variable is not set');
  throw new Error('GEMINI_API_KEY is required');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    console.log('Received message:', message);
    
    // Initialize model with specific configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });
    
    // Generate response
    console.log('Generating AI response...');
    const prompt = `You are an AI assistant specialized in helping with programming and technical questions. Please provide a detailed and helpful response to this question: ${message}`;
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('AI Response generated:', text.substring(0, 100) + '...');
      
      res.json({ 
        success: true,
        response: text 
      });
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Handle specific API errors
      if (error.message.includes('not found for API version')) {
        return res.status(500).json({
          success: false,
          error: 'Invalid API configuration',
          details: 'The Gemini model configuration is incorrect. Please check the model name and API version.',
          name: error.name
        });
      }
      
      if (error.message.includes('API key')) {
        return res.status(500).json({
          success: false,
          error: 'API key error',
          details: 'There was an issue with the API key. Please check your configuration.',
          name: error.name
        });
      }
      
      // Generic error response
      res.status(500).json({ 
        success: false,
        error: 'Failed to get AI response',
        details: error.message,
        name: error.name
      });
    }
  } catch (error) {
    console.error('Route Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;