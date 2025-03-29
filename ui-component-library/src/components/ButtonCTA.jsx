
import React from 'react';

/**
 * ButtonCTA Component
 * Renders a button with different visual styles (variants) like primary, secondary, danger, etc.
 * Supports loading state, icons, and accessibility features.
 *
 * @param {object} props - The component props.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The style variant.
 * @param {string} props.label - The text displayed on the button.
 * @param {function} props.onClick - Function to call when the button is clicked.
 * @param {boolean} [props.disabled=false] - If true, the button is disabled and non-interactive. Overrides isLoading for disabled state.
 * @param {React.ReactNode} [props.iconStart] - Optional icon element to display before the label.
 * @param {React.ReactNode} [props.iconEnd] - Optional icon element to display after the label.
 * @param {boolean} [props.isLoading=false] - If true, displays a loading state (disables button).
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 */
function ButtonCTA({
  variant = 'primary',
  label,
  onClick,
  disabled = false,
  iconStart,
  iconEnd,
  isLoading = false,
  className = ''
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150'; // Base styles

  let variantClasses = ''; // Classes specific to the variant and its states
  switch (variant) {
    case 'secondary':
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:text-red-100 disabled:cursor-not-allowed';
      break;
    case 'primary':
    default:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:text-blue-100 disabled:cursor-not-allowed';
      break;
  }

  // Button is disabled if explicitly set OR if it's loading
  const isEffectivelyDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantClasses} ${isLoading ? 'cursor-wait' : ''} ${className}`} // Apply base, variant, loading cursor, and custom classes
      onClick={!isEffectivelyDisabled ? onClick : undefined}
      disabled={isEffectivelyDisabled}
      aria-disabled={isEffectivelyDisabled}
      aria-busy={isLoading} // Indicate busy state for accessibility
    >
      {isLoading ? (
        <>
          {/* Simple SVG Spinner */}
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {iconStart && <span className={`mr-2 ${label ? '' : ''}`}>{iconStart}</span>} {/* Adjust margin if no label */}
          {label}
          {iconEnd && <span className={`ml-2 ${label ? '' : ''}`}>{iconEnd}</span>} {/* Adjust margin if no label */}
        </>
      )}
      {/* Loading indicator and icon support implemented */}
    </button>
  );
}

export default ButtonCTA;
