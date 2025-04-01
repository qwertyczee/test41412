import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa';


const Accordion = ({ items, allowMultipleOpen = false, className }) => {
  // Use index for single open, array for multiple open
  const [openItems, setOpenItems] = useState(allowMultipleOpen ? [] : null);

  const toggleItem = (index) => {
    if (allowMultipleOpen) {
      setOpenItems(
        (prevOpenItems) =>
          prevOpenItems.includes(index)
            ? prevOpenItems.filter((itemIndex) => itemIndex !== index) // Remove index
            : [...prevOpenItems, index] // Add index
      );
    } else {
      // If already open, close it (set to null), otherwise open it (set to index)
      setOpenItems((prevOpenItem) => (prevOpenItem === index ? null : index));
    }
  };

  // Helper to check if an item is open based on the mode
  const isItemOpen = (index) => {
    return allowMultipleOpen ? openItems.includes(index) : openItems === index;
  };

  return (
    <div
      className={clsx(
        'border border-gray-200 rounded-md divide-y divide-gray-200',
        className
      )}
    >
      {items.map((item, index) => {
        const isOpen = isItemOpen(index);
        // Consistent ID generation for ARIA attributes
        const contentId = `accordion-content-${index}`;
        const headerId = `accordion-header-${index}`;

        return (
          <div
            key={index}
            className="bg-white first:rounded-t-md last:rounded-b-md overflow-hidden"
          >
            {/* Use heading for semantics, button inside for interaction */}
            <h3 className="text-lg font-medium m-0">
              {' '}
              {/* Removed id from h3 */}
              <button
                type="button"
                id={headerId} // ID is on the button now for aria-controls
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen} // State of the controlled region
                aria-controls={contentId} // Associates button with the content panel
                className="w-full flex justify-between items-center p-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <span className="font-medium">{item.title}</span>
                <FaChevronDown
                  aria-hidden="true" // Icon is decorative
                  className={clsx(
                    'w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out',
                    { 'transform rotate-180': isOpen } // Rotate icon when open
                  )}
                />
              </button>
            </h3>
            {/* Content Panel */}
            <div
              id={contentId} // ID for aria-controls
              role="region" // Defines a landmark region controlled by the button
              aria-labelledby={headerId} // Associates region with its controlling button/header
              hidden={!isOpen} // Use hidden attribute for better accessibility than max-height tricks
              className={clsx(
                'overflow-hidden transition-all duration-300 ease-in-out', // Basic transition (needs work for height)
                // Use max-height for transition effect, but rely on 'hidden' for accessiblity state
                isOpen ? 'max-h-screen' : 'max-h-0'
              )}
              style={{ transition: 'max-height 0.3s ease-in-out' }} // Inline transition for demo
            >
              {/* Add padding inside the content area */}
              <div className="p-4 pt-2 text-gray-700">
                {' '}
                {/* Reduced top padding */}
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  /**
   * Array of accordion items. Each object needs `title` (string) and `content` (string or node).
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    })
  ).isRequired,
  /**
   * If true, multiple items can be expanded simultaneously.
   */
  allowMultipleOpen: PropTypes.bool,
  /**
   * Optional CSS classes for the main accordion container.
   */
  className: PropTypes.string,
};

Accordion.defaultProps = {
  allowMultipleOpen: false,
  className: '',
};

export default Accordion;
