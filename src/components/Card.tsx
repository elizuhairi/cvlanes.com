'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  hoverEffect?: boolean;
  slideDirection?: 'left' | 'right' | null;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'primary',
  hoverEffect = true,
  slideDirection = null,
  className = '',
}) => {
  const getGlowClassName = () => {
    switch (variant) {
      case 'primary':
        return 'theme-card-glow theme-card-glow-primary';
      case 'secondary':
        return 'theme-card-glow theme-card-glow-secondary';
      case 'tertiary':
        return 'theme-card-glow theme-card-glow-tertiary';
      case 'muted':
        return 'theme-card-glow theme-card-glow-muted';
      default:
        return 'theme-card-glow theme-card-glow-primary';
    }
  };

  return (
    <motion.div
      initial={slideDirection ? { opacity: 0, x: slideDirection === 'left' ? -50 : 50 } : { opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`theme-card group ${className}`}
    >
      {/* Glow effect that changes with theme */}
      <div className={getGlowClassName()} />
      
      {/* Main content container with background that adapts to theme */}
      <div className="theme-card-content p-8 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 