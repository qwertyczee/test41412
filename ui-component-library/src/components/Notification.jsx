import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa'; // Using specific icons


const icons = {
  success: <FaCheckCircle aria-hidden="true" />,
  error: <FaExclamationCircle aria-hidden="true" />,
  warning: <FaExclamationTriangle aria-hidden="true" />,
  info: <FaInfoCircle aria-hidden="true" />,
};

function Notification({
  message,
  type = 'info',
  duration = 5000, // Default duration
  onClose,
  position = 'top-right',
  className,
}) {
  const [isVisible, setIsVisible] = useState(false);

  // Effect to show notification when message prop changes
  useEffect(() => {
    if (message) {
      setIsVisible(true);
    } else {
      setIsVisible(false); // Hide immediately if message becomes falsy
    }
  }, [message]);

  // Auto-close timer effect
  useEffect(() => {
    let timerId;
    if (isVisible && duration > 0 && onClose) {
      // Only set timeout if duration is positive
      timerId = setTimeout(() => {
        onClose(); // Call the provided close handler
      }, duration);
    }
    // Cleanup timeout if component unmounts, message changes, or visibility changes
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isVisible, duration, onClose, message]); // Include message dependency

  // Manual close handler
  const handleManualClose = () => {
    setIsVisible(false); // Hide immediately
    if (onClose) {
      onClose(); // Call the provided close handler
    }
  };

  // Don't render if not visible or no message
  if (!isVisible || !message) {
    return null;
  }

  // --- Styling ---
  const baseClasses =
    'fixed p-4 rounded-md shadow-lg flex items-start z-[100] max-w-sm border'; // Increased z-index, added border

  const typeClasses = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const iconColorClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  // --- ARIA Attributes ---
  // Use 'alert' for critical messages (error, warning), 'status' for others
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status';
  // Use 'assertive' politeness for alerts so they interrupt, 'polite' for status messages
  const ariaLive =
    type === 'error' || type === 'warning' ? 'assertive' : 'polite';

  return (
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true" // Ensures the entire notification is read out by screen readers
      className={clsx(
        baseClasses,
        typeClasses[type],
        positionClasses[position],
        className // Allow external override/addition
      )}
    >
      {/* Icon */}
      <div
        className={clsx('flex-shrink-0 mr-3 text-xl', iconColorClasses[type])}
      >
        {' '}
        {/* Slightly larger icon */}
        {icons[type]}
      </div>

      {/* Message */}
      <div className="flex-grow mr-4 text-sm font-medium">
        {' '}
        {/* Adjusted text style */}
        {message}
      </div>

      {/* Close Button */}
      <div className="flex-shrink-0 ml-auto -mr-1">
        {' '}
        {/* Use ml-auto */}
        <button
          type="button" // Explicitly set type
          onClick={handleManualClose}
          aria-label="Close notification"
          className={clsx(
            'p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
            // Adjust focus ring color and hover based on type for contrast
            type === 'success' &&
              'text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
            type === 'error' &&
              'text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
            type === 'warning' &&
              'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
            type === 'info' &&
              'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50'
          )}
        >
          <FaTimes className="w-5 h-5" /> {/* Use FaTimes icon */}
        </button>
      </div>
    </div>
  );
}

Notification.propTypes = {
  /**
   * The message content (string or React node).
   */
  message: PropTypes.node, // Can be null/undefined to hide
  /**
   * Notification type, affecting style, icon, and ARIA role.
   */
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  /**
   * Auto-close duration (ms). Set to 0 or less to disable auto-close.
   */
  duration: PropTypes.number,
  /**
   * Callback executed when notification should close (manual or auto). MUST be provided to handle closing logic (e.g., setting message to null).
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Screen position.
   */
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center',
  ]),
  /**
   * Additional CSS classes for the container.
   */
  className: PropTypes.string,
};

Notification.defaultProps = {
  message: null,
  type: 'info',
  duration: 5000,
  position: 'top-right',
  className: '',
};

export default Notification;
