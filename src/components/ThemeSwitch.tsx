'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'colorful') => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('light')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all group ${
          theme === 'light' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to light theme"
      >
        <span className="material-symbols text-xl">light_mode</span>
        {theme === 'light' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Light Theme
        </div>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('dark')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all group ${
          theme === 'dark' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to dark theme"
      >
        <span className="material-symbols text-xl">dark_mode</span>
        {theme === 'dark' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Dark Theme
        </div>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('colorful')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all group ${
          theme === 'colorful' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to colorful theme"
      >
        <span className="material-symbols text-xl">palette</span>
        {theme === 'colorful' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Colorful Theme
        </div>
      </motion.button>
    </div>
  );
} 