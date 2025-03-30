
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import PropTypes from 'prop-types';

const Notification = ({ type = 'info', message, onClose, autoDismissDelay = null }) => {
  const [visible, setVisible] = useState(true);

  // Wrap handleClose in useCallback to prevent re-creating it on every render
  const handleClose = useCallback(() => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Auto-dismiss feature
  useEffect(() => {
    let timer;
    if (visible && autoDismissDelay && typeof autoDismissDelay === 'number' && autoDismissDelay > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, autoDismissDelay);
    }
    // Cleanup timer on component unmount or if visibility/delay changes
    return () => clearTimeout(timer);
  }, [visible, autoDismissDelay, handleClose]); // Add handleClose to dependency array

  if (!visible) {
    return null;
  }

  // Define base styles
  const baseStyles = "fixed top-5 right-5 p-4 rounded-lg shadow-lg flex items-center justify-between max-w-sm z-50";

  // Define styles based on notification type
  let typeStyles = '';
  switch (type) {
    case 'success':
      typeStyles = 'bg-green-100 border border-green-400 text-green-700';
      break;
    case 'error':
      typeStyles = 'bg-red-100 border border-red-400 text-red-700';
      break;
    case 'warning':
      typeStyles = 'bg-yellow-100 border border-yellow-400 text-yellow-700';
      break;
    case 'info':
    default:
      typeStyles = 'bg-blue-100 border border-blue-400 text-blue-700';
      break;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`${baseStyles} ${typeStyles}`}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="ml-4 text-xl font-semibold leading-none hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
      >
        × {/* HTML entity for 'x' symbol */}
      </button>
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  autoDismissDelay: PropTypes.number, // Delay in milliseconds, null or 0 to disable
};

export default Notification;
