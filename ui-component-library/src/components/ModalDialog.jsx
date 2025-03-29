
import React, { useState, useEffect, useRef } from 'react';

/**
 * ModalDialog Component
 *
 * Renders a modal dialog that can be toggled.
 * Includes accessibility features like focus trapping and ARIA attributes.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Callback function to close the modal
 * @param {string} [props.title] - Optional title for the modal header
 * @param {React.ReactNode} props.children - Content to be displayed inside the modal
 */
function ModalDialog({ isOpen, onClose, title, children }) {
  // Modal with transitions, focus trapping, and accessibility features.
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls opacity/transform for transition
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
        if (!isMounted) previousFocusRef.current = document.activeElement; // Store focus only on first mount when opening
        setIsMounted(true);
        requestAnimationFrame(() => setIsVisible(true)); // Apply visible styles after mount
    } else {
        setIsVisible(false); // Start fade out
        const timer = setTimeout(() => {
            setIsMounted(false); // Unmount after transition
            if (previousFocusRef.current) {
                previousFocusRef.current.focus(); // Restore focus
                previousFocusRef.current = null;
            }
        }, 300); // Match transition duration
        return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]); // isMounted dependency ensures focus is stored correctly


  // Handle closing the modal (called by button click or Escape key)
  const handleClose = () => {
    if (onClose) {
      onClose(); // Trigger the state change in the parent via isOpen prop
    }
  };

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) { // Only close if open
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]); // Re-run if isOpen changes or onClose handler changes


  // Focus Trapping Logic
  useEffect(() => {
    if (isVisible && modalRef.current) { // Trap focus only when fully visible
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the first element when modal becomes visible
       if(isOpen) firstElement.focus(); // Focus only when intended to be open

      const handleTabKeyPress = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      const currentModalRef = modalRef.current; // Capture ref value
      currentModalRef.addEventListener('keydown', handleTabKeyPress);
      return () => {
        currentModalRef?.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [isVisible, isOpen]); // Depend on isVisible and isOpen


  if (!isMounted) {
    return null; // Don't render anything if not mounted
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`} // Added pointer-events-none
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby="modal-content-desc" // aria-describedby added
    >
      {/* Transition effects added */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Modal Header */}
        {title && (
          <h2 id="modal-title" className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          aria-label="Close dialog"
        >
           {/* Using SVG for better alignment and scaling */}
           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>

        {/* Modal Content */}
        <div id="modal-content-desc" className="modal-content pt-2 pb-4"> {/* Added some padding */}
          {children}
        </div>

        {/* Optional Modal Footer (Example) - Render children passed for footer is more flexible */}
        {/* <div className="mt-6 flex justify-end space-x-2"> */}
        {/*   <button onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button> */}
        {/*   <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm</button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default ModalDialog;
