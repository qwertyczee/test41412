
import React, { useState } from 'react';

/**
 * Accordion Component
 *
 * Displays a list of items where each item can be individually expanded or collapsed
 * to reveal its content. Uses Tailwind CSS for styling and includes ARIA attributes
 * for accessibility. Includes basic height and opacity transitions.
 *
 * @param {Object[]} items - Array of items to display in the accordion.
 *   Each item object should have:
 *   - {string} id - A unique identifier for the item.
 *   - {string} title - The header text for the accordion section.
 *   - {React.ReactNode} content - The content to display when the section is expanded.
 */
function Accordion({ items = [] }) {
  const [openSectionId, setOpenSectionId] = useState(null);

  const toggleSection = (id) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {items.map((item, index) => {
        // Ensure item has a unique ID, fallback if necessary (though providing unique IDs is best practice)
        const itemId = item.id || `accordion-item-${index}`;
        const isOpen = openSectionId === itemId;
        const headerId = `${itemId}-header`;
        const panelId = `${itemId}-panel`;

        return (
          <div key={itemId}>
            <h2>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleSection(itemId)}
                className="flex justify-between items-center w-full p-4 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span>{item.title}</span>
                <span className={`transform transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                  {/* Basic Chevron Down Icon */}
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} // Added opacity for fade effect
              style={{
                // Basic height and opacity transitions are applied via Tailwind classes.
                // For more advanced animations (e.g., libraries like framer-motion), further customization is needed.
              }}
            >
              {/* Added padding and border directly here */}
              <div className={`p-4 border-t border-gray-200 text-gray-600`}>
                 {item.content}
              </div>
            </div>
          </div>
        );
      })}
      {items.length === 0 && <p className="p-4 text-gray-500">No items to display.</p>}
    </div>
  );
}

export default Accordion;
