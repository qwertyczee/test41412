
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * A versatile button component with multiple variants and styles.
 * Supports primary, secondary, and call-to-action (CTA) styles.
 * Designed to be responsive with hover effects and accessible focus states.
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const buttonClasses = `btn btn-${variant} ${disabled ? 'btn-disabled' : ''}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {/* Icon support could be added here, e.g., by accepting 'iconLeft' and 'iconRight' props */}
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Button contents
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Which variant style to use?
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'cta']),
  /**
   * Button type attribute
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,
};

export default Button;
