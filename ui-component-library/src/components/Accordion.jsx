
import React, { useState } from 'react';

/**
 * Accordion component that allows toggling the visibility of content.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title displayed in the accordion header.
 * @param {React.ReactNode} props.children - The content to be displayed within the accordion panel.
 * @param {string} props.id - A unique ID prefix for ARIA attributes.
 */
function Accordion({ title, children, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const panelId = `${id}-panel`;
  const headerId = `${id}-header`;

  return (
    <div className="border border-gray-200 rounded mb-2">
      <h3 id={headerId} className="m-0 text-lg font-medium"> {/* Using h3, adjust aria-level if needed */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggleOpen}
          className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-t" // Added focus styles
        >
          <span>{title}</span>
          <span className="ml-4 transform transition-transform duration-200 ease-in-out" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            {/* Simple SVG Arrow - Replace with a better icon if needed */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
        </button>
      </h3>
      {/* Panel with smooth transition using max-height and opacity */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        // Use classes for conditional styling for transition
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`} // Use Tailwind max-h class
        style={{
          // Set transition properties explicitly if needed, though Tailwind's 'transition-all' should cover it
          // transitionProperty: 'max-height, opacity',
        }}
        // hidden attribute is removed as visibility is handled by max-height/opacity
      >
        <div className="p-4 border-t border-gray-200 bg-white rounded-b">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
