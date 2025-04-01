import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa'; // Using Font Awesome Times icon


const Modal = ({ isOpen, onClose, title, children, className }) => {
  const modalRef = useRef(); // Ref for the modal content div
  const modalRoot =
    typeof window !== 'undefined'
      ? document.getElementById('modal-root')
      : null;

  // Handle Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Basic focus management: Focus the modal container when opened
  // Note: Proper focus trapping is more involved.
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Setting focus to the container allows screen readers to announce the title
      // setTimeout helps ensure the element is fully ready in the DOM
      setTimeout(() => modalRef.current?.focus(), 0);
    }
  }, [isOpen]);

  if (!isOpen || !modalRoot) {
    return null;
  }

  // Stop propagation when clicking inside the modal content itself
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      role="dialog" // Identifies the element as a modal dialog
      aria-modal="true" // Indicates that interacting with elements outside the modal is prevented
      aria-labelledby="modal-title" // Points to the element containing the modal title (required)
      // aria-describedby="modal-description" // Optional: Points to the element containing the main modal description/content
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" // Slightly darker overlay with blur, added padding
      onClick={onClose} // Close modal when clicking overlay
      tabIndex={-1} // Allows the overlay itself to be focused if needed, though usually content is focused
    >
      <div
        ref={modalRef}
        tabIndex={-1} // Makes the modal content container focusable programmatically
        className={clsx(
          'bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-auto outline-none', // Base styles, added outline-none
          className // Allow custom classes
        )}
        onClick={handleModalContentClick} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          {' '}
          {/* Use items-start for alignment if title wraps */}
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {' '}
            {/* This ID is referenced by aria-labelledby */}
            {title}
          </h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-1 -mr-2 -mt-2" // Adjusted padding/margin for easier click target
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          {/* If content serves as description, add id="modal-description" here */}
          {/* <div id="modal-description"> */}
          {children}
          {/* </div> */}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  /**
   * Controls whether the modal is visible or hidden.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Callback function invoked when the modal is requested to be closed (e.g., clicking overlay, close button, or pressing Esc).
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The title displayed in the modal header. It's linked via `aria-labelledby`.
   */
  title: PropTypes.string.isRequired,
  /**
   * The content to be displayed within the modal body.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional additional CSS classes to apply to the modal content container for customization.
   */
  className: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
};

// Ensure a div with id="modal-root" exists in your public/index.html or equivalent
// Example:
// <body>
//   <noscript>You need to enable JavaScript to run this app.</noscript>
//   <div id="root"></div>
//   <div id="modal-root"></div> <!-- Portal target for modals -->
// </body>

export default Modal;
