import React from 'react';
import { clsx } from 'clsx';

interface ShortButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

const ShortButton: React.FC<ShortButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  type = 'button',
  size = 'md',
}) => {
  const sizeStyles = clsx({
    'h-10 px-4 text-sm': size === 'sm',
    'h-12 px-6 text-base': size === 'md',
    'h-14 px-8 text-lg': size === 'lg',
  });

  const baseStyles = clsx(
    // Base button styles
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-2xl',
    'font-suit',
    'font-bold',
    'leading-6',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-background',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disabled:transform-none',
    'active:scale-95',
    'hover:scale-[1.02]',
    sizeStyles,
    className
  );

  const variantStyles = clsx({
    // Primary variant - gradient background
    'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500': 
      variant === 'primary' && !disabled,
    
    // Secondary variant - border with transparent background
    'border-2 border-white/20 bg-transparent hover:bg-white/5 text-white focus:ring-white/30': 
      variant === 'secondary' && !disabled,
    
    // Disabled state
    'bg-gray-600 text-gray-400 border-gray-600 hover:bg-gray-600 hover:scale-100 cursor-not-allowed': 
      disabled,
  });

  return (
    <button
      type={type}
      className={clsx(baseStyles, variantStyles)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ShortButton;
