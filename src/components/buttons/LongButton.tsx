import React from 'react';
import { clsx } from 'clsx';

interface LongButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const LongButton: React.FC<LongButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  type = 'button',
}) => {
  const baseStyles = clsx(
    // Base button styles
    'w-full',
    'h-14',
    'px-6',
    'rounded-2xl',
    'font-suit',
    'font-bold',
    'text-base',
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
    'cursor-pointer',
    className
  );

  const variantStyles = clsx({
    // Primary variant - yellow background with black text
    'bg-[#FFFBC0] hover:bg-[#FFF9A0] text-[#000414] shadow-lg hover:shadow-xl focus:ring-[#FFFBC0]': 
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

export default LongButton;
