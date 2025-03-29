
import React, { useState, useEffect } from 'react';

/**
 * Notification Component
 * Displays alerts, warnings, or info messages with optional auto-dismiss and animations.
 *
 * @param {string} type - The type of notification (e.g., 'success', 'error', 'warning', 'info'). Determines styling.
 * @param {string} message - The text content of the notification.
 * @param {function} [dismiss] - Optional function to call when the notification is dismissed (e.g., clicking a close button).
 * @param {number} [autoDismissDuration] - Optional duration in milliseconds after which the notification automatically dismisses.
 */
const Notification = ({ type = 'info', message, dismiss, autoDismissDuration }) => {
  const baseStyle = "p-4 rounded-md shadow-lg flex justify-between items-center transition-all duration-300 ease-in-out"; // Added transition
  let typeStyle = '';
  const [isVisible, setIsVisible] = useState(false); // Start invisible for fade-in
  const [isDismissed, setIsDismissed] = useState(false); // Controls final removal

  // Handle programmatic dismiss (e.g., auto-dismiss or button click)
  const handleDismiss = () => {
    setIsVisible(false); // Start fade-out/transform
    // Allow time for animation before calling external dismiss function and unmounting
    setTimeout(() => {
       setIsDismissed(true); // Mark as dismissed to stop rendering
      if (dismiss) {
        dismiss(); // Call external callback if provided
      }
    }, 300); // Match transition duration
  };

  // Auto-dismiss effect
  useEffect(() => {
    let timer;
    if (autoDismissDuration && autoDismissDuration > 0) {
      timer = setTimeout(() => {
        handleDismiss();
      }, autoDismissDuration);
    }
    // Clear timer on component unmount or if dismiss is called manually
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDismissDuration]); // Rerun only if duration changes

   // Effect to fade in the notification on mount
   useEffect(() => {
      // Trigger fade-in shortly after mount
      const timer = setTimeout(() => {
          setIsVisible(true);
      }, 50); // Small delay to ensure transition occurs
      return () => clearTimeout(timer);
   }, []); // Run only on mount

  if (isDismissed) {
     return null; // Don't render if fully dismissed
  }

  switch (type) {
    case 'success':
      typeStyle = 'bg-green-100 border border-green-400 text-green-700';
      break;
    case 'error':
      typeStyle = 'bg-red-100 border border-red-400 text-red-700';
      break;
    case 'warning':
      typeStyle = 'bg-yellow-100 border border-yellow-400 text-yellow-700';
      break;
    case 'info':
    default:
      typeStyle = 'bg-blue-100 border border-blue-400 text-blue-700';
      break;
  }

  return (
    <div
      // Apply transition classes based on visibility state
      className={`${baseStyle} ${typeStyle} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      role="alert"
      aria-live="polite" // Announce changes to screen readers
      aria-hidden={!isVisible}
    >
      <span>{message}</span>
      {dismiss && ( // Only show dismiss button if callback provided
        <button
          onClick={handleDismiss} // Use internal handler
          className="ml-4 px-2 py-1 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
          aria-label="Dismiss notification"
        >
          × {/* Simple close icon */}
        </button>
      )}
      {/* Auto-dismiss and animations are now implemented */}
    </div>
  );
};

export default Notification;
