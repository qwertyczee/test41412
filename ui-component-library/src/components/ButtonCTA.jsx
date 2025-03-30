
import React from 'react';

/**
 * ButtonCTA Component
 * Renders a button styled with Tailwind CSS, suitable for primary and secondary actions.
 *
 * @param {object} props - Component props
 * @param {'primary' | 'secondary'} [props.type='primary'] - The type of button (primary or secondary style).
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {function} [props.onClick] - Function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content of the button (text, icons, etc.).
 * @param {string} [props.className] - Additional Tailwind classes to apply.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.htmlType='button'] - The native type attribute for the button element.
 */
function ButtonCTA({
  type = 'primary',
  size = 'md',
  onClick,
  children,
  className = '',
  disabled = false,
  htmlType = 'button',
  ...rest // Pass through any other standard button attributes
}) {
  // Base styles - common to all buttons
  const baseStyles = `
    font-semibold
    rounded-md
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    transition
    duration-150
    ease-in-out
    inline-flex
    items-center
    justify-center
    border
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg', // Large size
  };

  // Type styles - Colors can be customized via Tailwind theme configuration
  const typeStyles = {
    primary: `
      bg-indigo-600 text-white border-transparent
      hover:bg-indigo-700
      focus:ring-indigo-500
      disabled:bg-indigo-300 disabled:cursor-not-allowed
    `, // Primary action style
    secondary: `
      bg-white text-indigo-700 border-indigo-300
      hover:bg-indigo-50
      focus:ring-indigo-500
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
    `, // Secondary action style
  };

  const combinedClasses = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${typeStyles[type]}
    ${disabled ? 'cursor-not-allowed' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim(); // Combine and clean up whitespace

  return (
    <button
      type={htmlType}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest} // Spread remaining props (like aria-label, etc.)
    >
      {children}
    </button>
  );
}

export default ButtonCTA;
