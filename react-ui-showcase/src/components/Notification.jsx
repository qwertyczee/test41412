
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

/**
 * Notification Component
 * Displays dismissible messages for success, error, or info states.
 */
function Notification({ type = 'info', message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss functionality could be implemented using useEffect and setTimeout if desired.

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // Callback when notification is closed
    }
  };

  if (!isVisible) {
    return null;
  }

  // Determine the appropriate ARIA role based on the notification type
  const role = type === 'error' ? 'alert' : 'status';
  // Use aria-live="polite" for status messages and aria-live="assertive" for alerts
  const ariaLive = type === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={`notification notification-${type}`}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <span className="notification-message">{message}</span>
      <button
        className="notification-close-btn"
        onClick={handleClose}
        aria-label="Close notification"
      >
        × {/* Unicode multiplication sign for 'x' */}
      </button>
      {/* Icon support can be added here based on the 'type' prop */}
      {/* Animations can be added via CSS transitions/animations */}
    </div>
  );
}

Notification.propTypes = {
  /** The type of notification (success, error, info) */
  type: PropTypes.oneOf(['success', 'error', 'info']),
  /** The message content to display */
  message: PropTypes.string.isRequired,
  /** Optional callback function when the notification is closed */
  onClose: PropTypes.func,
};

export default Notification;
