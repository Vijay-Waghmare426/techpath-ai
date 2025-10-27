import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  children, 
  className = "",
  variant = "default" 
}) => {
  const variants = {
    default: "bg-white/5 hover:bg-white/10 border-white/10",
    featured: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30",
    blog: "bg-white/5 hover:bg-white/10 border-white/10",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-lg
        ${variants[variant]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
        group
      `}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
      
      <div className="relative p-6">
        {/* Icon */}
        {Icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {title && (
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-200">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          )}
          
          {children}
        </div>

        {/* Hover effect indicator */}
        {onClick && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;