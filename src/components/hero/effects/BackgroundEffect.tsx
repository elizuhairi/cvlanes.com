'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '@/context/ThemeContext';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none';
  theme?: Theme;
}

const DesignCodeEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very light base overlay - lighter for light theme */}
      <div className={`absolute inset-0 ${isLight ? 'bg-white/20' : 'bg-gradient-to-br from-black/40 via-black/20 to-transparent'} z-0`} />
      
      {/* Enhanced ambient light effect */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          background: isLight
            ? [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)'
            ]
            : [
              'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)'
            ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Subtle accent gradient */}
      <motion.div
        className="absolute inset-0 z-5"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className={`w-full h-full ${
          isLight 
            ? 'bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20' 
            : 'bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10'
        }`} />
      </motion.div>
    </div>
  );
};

const ParticlesEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number}>>([]);
  const isLight = theme === 'light';
  
  useEffect(() => {
    setMounted(true);
    // Generate particle data after mounting to avoid hydration mismatch
    const newParticles = Array(20).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0" />;
  
  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 ${isLight ? 'bg-blue-500/30' : 'bg-blue-400/30'} rounded-full`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 1
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [1, 2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const GradientEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Array<{size: number, posX: number, posY: number, duration: number}>>([]);
  
  useEffect(() => {
    setMounted(true);
    // Generate star data after mounting to avoid hydration mismatch
    if (isColorful) {
      const newStars = Array.from({ length: 50 }).map(() => ({
        size: Math.random() * 2 + 1,
        posX: Math.random() * 100,
        posY: Math.random() * 100,
        duration: Math.random() * 3 + 2
      }));
      setStars(newStars);
    }
  }, [isColorful]);
  
  if (isColorful) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic background base */}
        <div className="absolute inset-0 bg-[#050023]" />
        
        {/* Animated cosmic nebula effect */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)'
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 60% 30%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 40%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 40% 70%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 60% 50%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Cosmic stars - only render on client side */}
        {mounted && (
          <div className="absolute inset-0">
            {stars.map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.posX}%`,
                  top: `${star.posY}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Floating cosmic objects */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
            left: '10%',
            top: '20%'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute w-60 h-60 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 204, 0.1) 0%, transparent 70%)',
            right: '15%',
            bottom: '20%'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Subtle overlay to enhance text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050023] via-transparent to-transparent" />
      </div>
    );
  }
  
  return (
    <div className={`absolute inset-0 ${
      isLight 
        ? 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-400/10 to-transparent'
        : 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent'
    }`} />
  );
};

const BackgroundEffect = ({ type, theme = 'dark' }: Props) => {
  switch (type) {
    case 'particles':
      return <ParticlesEffect theme={theme} />;
    case 'design-code':
      return <DesignCodeEffect theme={theme} />;
    case 'gradient':
      return <GradientEffect theme={theme} />;
    case 'none':
    default:
      return null;
  }
};

export default BackgroundEffect;