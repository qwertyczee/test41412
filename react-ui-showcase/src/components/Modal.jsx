
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

/**
 * A reusable modal dialog component.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls whether the modal is open or closed.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {string} props.title - The title of the modal, used for accessibility.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {string} [props.ariaLabelledBy] - ID of the element that labels the modal. If not provided, `title` is used with `aria-label`.
 * @param {string} [props.ariaDescribedBy] - ID of the element that describes the modal content.
 */
function Modal({ isOpen, onClose, title, children, ariaLabelledBy, ariaDescribedBy }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle focus trapping
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      firstElement?.focus();

      const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              event.preventDefault();
            }
          }
        } else if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previousFocusRef.current?.focus(); // Restore focus on close
      };
    }
  }, [isOpen, onClose]);

  // Handle clicks outside the modal to close
  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  // Determine ARIA labeling strategy
  const ariaLabelProps = ariaLabelledBy
    ? { 'aria-labelledby': ariaLabelledBy }
    : { 'aria-label': title };

  // Add 'open' class when isOpen is true for CSS transitions
  const overlayClasses = `modal-overlay ${isOpen ? 'open' : ''}`;

  return (
    <div
      className={overlayClasses} // Apply dynamic classes
      onClick={handleOverlayClick}
      role="presentation" // Use presentation role on overlay to prevent misinterpretation
    >
      <div
        className="modal-content" // CSS handles animation via .modal-overlay.open .modal-content
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        {...ariaLabelProps}
        aria-describedby={ariaDescribedBy}
        tabIndex="-1" // Make the dialog itself focusable if needed, but content should have focusable elements
      >
        {/* Animation/transition effects are handled by CSS classes 'modal-overlay' and 'modal-content' based on the 'open' class */}
        <button className="modal-close-button" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired, // Required for aria-label fallback
  children: PropTypes.node.isRequired,
  ariaLabelledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
};

export default Modal;
