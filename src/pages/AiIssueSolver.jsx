import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import { 
  Brain, 
  Send, 
  Sparkles, 
  Code, 
  Bug, 
  Lightbulb, 
  Zap,
  MessageCircle,
  Upload,
  Settings,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AiIssueSolver = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI coding assistant. I can help you debug code, explain complex concepts, and solve technical challenges. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    {
      icon: Bug,
      title: "Debug Code",
      description: "Find and fix bugs in your code",
      action: "Help me debug this code issue"
    },
    {
      icon: Code,
      title: "Code Review",
      description: "Get feedback on code quality",
      action: "Please review my code for improvements"
    },
    {
      icon: Lightbulb,
      title: "Explain Concept",
      description: "Understand complex programming concepts",
      action: "Explain this programming concept to me"
    },
    {
      icon: Zap,
      title: "Optimize Performance",
      description: "Improve code performance and efficiency",
      action: "How can I optimize this code for better performance?"
    }
  ];

  const exampleQuestions = [
    "How do I fix this React useEffect infinite loop?",
    "What's the difference between SQL and NoSQL databases?",
    "Help me implement authentication in Node.js",
    "How to optimize API response times?",
    "Explain async/await vs Promises in JavaScript",
    "Best practices for error handling in Python"
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI that understands your code context and provides intelligent solutions"
    },
    {
      icon: Code,
      title: "Multi-Language Support",
      description: "Support for JavaScript, Python, Java, C++, and 20+ programming languages"
    },
    {
      icon: Zap,
      title: "Real-time Solutions",
      description: "Get instant answers and solutions to your coding problems"
    },
    {
      icon: Lightbulb,
      title: "Learning Focused",
      description: "Not just answers - detailed explanations to help you learn and grow"
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (message = inputMessage) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I understand you're looking for help with that. The AI Issue Solver is currently in development and will be available soon! In the meantime, you can explore our Interview Hub and Tech Blogs for comprehensive learning resources.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-orange-400/30"
          >
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-orange-300">Coming Soon - AI Beta</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Issue
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Solver
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Your intelligent coding companion powered by advanced AI to debug, optimize, and solve technical challenges
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-orange-400 text-sm">Beta Preview</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`p-4 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                            : 'bg-white/5 text-gray-300 border border-white/10'
                        }`}>
                          <p className="leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.type === 'ai' && (
                              <div className="flex space-x-2">
                                <button className="text-xs opacity-70 hover:opacity-100 transition-opacity">
                                  <Star className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Describe your coding challenge or paste your code here..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-200"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                      <Upload className="h-5 w-5" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.action)}
                      className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <action.icon className="h-5 w-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                        <div>
                          <h4 className="text-white font-medium text-sm">{action.title}</h4>
                          <p className="text-gray-400 text-xs">{action.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Example Questions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-4">Example Questions</h3>
                <div className="space-y-2">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="w-full text-left text-sm text-gray-400 hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all duration-200"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Beta Notice */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card variant="featured">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Beta Preview</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    The AI Issue Solver is currently in development. Join our waitlist to be notified when it launches!
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                    Join Waitlist
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Powerful AI Features Coming Soon
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <feature.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AiIssueSolver;