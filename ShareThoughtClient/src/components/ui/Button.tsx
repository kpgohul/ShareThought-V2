import React from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type ButtonVariant = 'outline' | 'filled' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  // Allows the user to omit the prop, or explicitly pass null to remove the icon.
  Icon?: LucideIcon | null; 
  variant?: ButtonVariant; 
  iconLeft?: boolean;
}

// Function to select Tailwind classes based on the variant
const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'filled':
      // Primary filled button
      return `
        bg-blue-600 text-white border border-blue-600 
        hover:bg-blue-700 hover:border-blue-700
      `;
    case 'ghost':
      // Minimal, text-only button
      return `
        bg-transparent text-gray-700 border border-transparent 
        hover:bg-gray-100
      `;
    case 'outline':
    default:
      // Outline button (Matches the visual style requested)
      return `
        bg-white text-gray-700 border border-gray-400 
        hover:border-blue-500 hover:text-blue-500
      `;
  }
};

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'outline',
  Icon, // Icon is now only the prop provided by the user (or undefined)
  iconLeft = false,
  className = '',
  ...props
}) => {
  
  // --- FIX: Resolve the Icon component and check for existence ---
  // The icon to use. If Icon prop is omitted, default to ChevronRight.
  // If Icon prop is explicitly null, FinalIcon will be null.
  const IconToRender = Icon === undefined ? ChevronRight : Icon;
  const hasIcon = IconToRender !== null;

  // Base classes applied to all variants
  const baseClasses = `
    inline-flex items-center 
    px-5 py-2.5
    text-base font-medium 
    rounded-full 
    transition-colors duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `;

  // Combine base classes with variant-specific classes
  const fullClasses = `${baseClasses} ${getVariantClasses(variant)} ${className}`;
  
  // Create the actual icon element
  const iconElement = hasIcon && <IconToRender className="h-4 w-4 flex-shrink-0" />;

  // Create the text element with conditional spacing
  const textElement = (
    <span className={hasIcon ? (iconLeft ? 'ml-2' : 'mr-2') : ''}>
      {text}
    </span>
  );

  return (
    <button className={fullClasses} {...props}>
      {/* Renders icon first if iconLeft is true */}
      {iconLeft && iconElement} 
      
      {textElement}
      
      {/* Renders icon last if iconLeft is false (default) */}
      {!iconLeft && iconElement}
    </button>
  );
};