import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { InterviewProvider } from './context/InterviewContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InterviewHub from './pages/InterviewHub';
import TechBlogs from './pages/TechBlogs';
import BlogDetail from './pages/BlogDetail';
import AiIssueSolver from './pages/AiIssueSolver';

function App() {
  return (
    <Router>
      <InterviewProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/interview-hub" element={<InterviewHub />} />
              <Route path="/tech-blogs" element={<TechBlogs />} />
              <Route path="/tech-blogs/:slug" element={<BlogDetail />} />
              <Route path="/ai-solver" element={<AiIssueSolver />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </InterviewProvider>
    </Router>
  );
}

export default App;