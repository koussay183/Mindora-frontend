/**
 * Button Component
 * Premium futuristic button with glow effects and animations
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { ButtonProps } from '@/lib/types';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}) => {
  const hoverRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = hoverRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, []);

  const baseStyles = 'relative font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

  const variantStyles = {
    primary: 'bg-brand-primary hover:bg-brand-dark text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white border border-neutral-gray-300 hover:bg-neutral-gray-50 text-midnight shadow-sm hover:shadow-md',
    outline: 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white',
    ghost: 'bg-transparent text-neutral-gray-700 hover:bg-neutral-gray-100',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      ref={hoverRef}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      aria-busy={loading}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}

      {/* Ripple effect overlay */}
      <span className="absolute inset-0 pointer-events-none" />
    </button>
  );
};
