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
    'h-10 w-32 text-sm': size === 'sm',
    'h-[46px] w-[164px] text-base': size === 'md',
    'h-14 w-40 text-lg': size === 'lg',
  });

  const baseStyles = clsx(
    // Base button styles
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-[23px]',
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
    'overflow-hidden',
    'text-ellipsis',
    'whitespace-nowrap',
    'cursor-pointer',
    sizeStyles,
    className
  );

  const variantStyles = clsx({
    // Primary variant - yellow background
    'bg-[#FFFBC0] hover:bg-[#FFF8A0] text-[#000414] shadow-lg hover:shadow-xl focus:ring-[#FFFBC0]': 
      variant === 'primary' && !disabled,
    
    // Secondary variant - dark background with gray border
    'bg-[#1C1C1C] border border-[#4E4E4E] hover:bg-[#2A2A2A] text-[#FFFFF6] focus:ring-[#4E4E4E]': 
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
