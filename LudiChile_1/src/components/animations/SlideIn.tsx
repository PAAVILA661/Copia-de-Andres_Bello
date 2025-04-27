"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SlideIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5, 
  className = '' 
}: SlideInProps) {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };
  
  const initial = directionMap[direction];
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: initial.x, 
        y: initial.y 
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 