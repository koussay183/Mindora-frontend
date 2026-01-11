/**
 * Card Component
 * Premium glassmorphism card with glow effects
 */

'use client';

import React from 'react';
import type { CardProps, PersonalityColor } from '@/lib/types';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
  glow = 'none',
  animated = false,
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variantStyles = {
    glass: 'bg-white/90 backdrop-blur-md border border-neutral-gray-200 shadow-lg',
    solid: 'bg-white border border-neutral-gray-200 shadow-md',
    outline: 'bg-white border-2 border-brand-primary/20 hover:border-brand-primary/40',
  };

  const glowStyles: Record<PersonalityColor | 'none', string> = {
    blue: 'shadow-glow-indigo hover:shadow-glow-indigo',
    purple: 'shadow-glow-indigo hover:shadow-glow-indigo',
    green: 'shadow-glow-green hover:shadow-glow-green',
    orange: 'shadow-glow-orange hover:shadow-glow-orange',
    none: '',
  };

  const animatedStyles = animated ? 'hover:scale-[1.02] hover:-translate-y-1' : '';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${glowStyles[glow]} ${animatedStyles} ${className}`;

  return (
    <div className={combinedStyles}>
      {children}
    </div>
  );
};
