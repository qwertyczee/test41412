import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      onClick,
      disabled = false,
      iconLeft,
      iconRight,
      className,
      type = 'button',
      'aria-label': ariaLabel, // Explicitly accept aria-label
      ...props // Pass remaining props like aria-describedby etc.
    },
    ref
  ) => {
    // Validate icon-only button accessibility
    if (!children && !ariaLabel) {
      console.warn(
        'Icon-only buttons require an aria-label prop for accessibility.'
      );
    }

    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 border border-transparent';

    // Variant styles
    const variantStyles = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary:
        'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 border-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      // Add other variants like outline, ghost here if needed
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm leading-5', // adjusted leading
      md: 'px-4 py-2 text-base leading-6',
      lg: 'px-6 py-3 text-lg leading-7',
    };

    // Styles for icon spacing
    const iconOnlyStyles = !children ? 'p-2' : ''; // Smaller padding for icon-only
    const iconLeftMargin = children ? 'mr-2 -ml-1' : '';
    const iconRightMargin = children ? 'ml-2 -mr-1' : '';
    const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'; // Smaller icon for sm button

    // Disabled styles
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    const combinedClassName = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      iconOnlyStyles,
      { [disabledStyles]: disabled },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel} // Apply passed aria-label
        {...props}
      >
        {iconLeft && (
          <span className={clsx(iconSize, iconLeftMargin)}>{iconLeft}</span>
        )}
        {children}
        {iconRight && (
          <span className={clsx(iconSize, iconRightMargin)}>{iconRight}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; // Add display name for React DevTools

Button.propTypes = {
  /**
   * Button content (text or elements). Required unless it's an icon-only button with an `aria-label`.
   */
  children: PropTypes.node,
  /**
   * Button style variant.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  /**
   * Button size.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Optional click handler.
   */
  onClick: PropTypes.func,
  /**
   * Disables the button.
   */
  disabled: PropTypes.bool,
  /**
   * Icon component placed before the children.
   */
  iconLeft: PropTypes.node,
  /**
   * Icon component placed after the children.
   */
  iconRight: PropTypes.node,
  /**
   * Additional CSS classes.
   */
  className: PropTypes.string,
  /**
   * Button type attribute.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Accessible label, required for icon-only buttons.
   */
  'aria-label': PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
};

export default Button;
