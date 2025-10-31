import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (linkText) => {
    switch (linkText) {
      case 'Interview Hub':
        navigate('/interview-hub');
        break;
      case 'Tech Blogs':
        navigate('/tech-blogs');
        break;
      case 'AI Solver':
        navigate('/ai-solver');
        break;
      case 'About Us':
        // Could navigate to an about page or scroll to about section
        alert('About Us page coming soon!');
        break;
      case 'Documentation':
      case 'Tutorials':
      case 'Community':
      case 'Support':
        alert(`${linkText} section coming soon!`);
        break;
      case 'Privacy Policy':
      case 'Terms of Service':
      case 'Contact':
      case 'Careers':
      case 'Cookie Policy':
        alert(`${linkText} page coming soon!`);
        break;
      default:
        break;
    }
  };

  const handleSocialClick = (platform) => {
    const urls = {
      'GitHub': 'https://github.com',
      'Twitter': 'https://twitter.com',
      'LinkedIn': 'https://linkedin.com',
      'Email': 'mailto:contact@techpath.ai'
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@techpath.ai', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Platform',
      links: ['Interview Hub', 'Tech Blogs', 'AI Solver', 'About Us'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Tutorials', 'Community', 'Support'],
    },
    {
      title: 'Company',
      links: ['Privacy Policy', 'Terms of Service', 'Contact', 'Careers'],
    },
  ];

  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TechPath.ai
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your complete IT career companion — from interviews to AI-powered troubleshooting.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={social.label}
                  onClick={() => handleSocialClick(social.label)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 TechPath.ai. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => handleLinkClick('Privacy Policy')}
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleLinkClick('Terms of Service')}
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleLinkClick('Cookie Policy')}
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;