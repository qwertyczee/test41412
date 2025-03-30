
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const ButtonCTA = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  size = 'md',
  type = 'button',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center rounded-md border border-transparent
        bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

ButtonCTA.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default ButtonCTA;
