"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  delay: number;
}

interface SuccessConfettiProps {
  show: boolean;
}

export default function SuccessConfetti({ show }: SuccessConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (show) {
      const colors = ['#FFD700', '#FFC0CB', '#00FFFF', '#FF4500', '#9370DB', '#32CD32'];
      const newConfetti: ConfettiPiece[] = [];
      
      for (let i = 0; i < 70; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 20 - 20,
          size: Math.random() * 8 + 5,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
        });
      }
      
      setConfetti(newConfetti);
      
      // Reset confetti after animation
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            top: `${piece.y}%`, 
            left: `${piece.x}%`, 
            opacity: 1,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            top: '100%', 
            opacity: 0,
            rotate: piece.rotation,
            scale: 1
          }}
          transition={{ 
            duration: 4 + Math.random(), 
            delay: piece.delay,
            type: 'tween',
            ease: 'easeIn'
          }}
          style={{
            position: 'absolute',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
} 