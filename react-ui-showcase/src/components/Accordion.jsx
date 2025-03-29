
import React, { useState } from 'react';
import './Accordion.css';

/**
 * AccordionItem Component
 * Represents a single collapsible section within the Accordion.
 */
const AccordionItem = ({ item, index, isOpen, onToggle }) => {
  const contentId = `accordion-content-${index}`;
  const headerId = `accordion-header-${index}`;

  return (
    <div className="accordion-item">
      <h2>
        <button
          className="accordion-button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headerId}
        >
          {item.title}
          <span className="accordion-icon" aria-hidden="true">
            {isOpen ? '-' : '+'}
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`accordion-content ${isOpen ? 'expanded' : ''}`}
      >
        {/* Performance optimization (e.g., React.memo) can be considered if the content is complex or updates frequently */}
        {item.content}
      </div>
    </div>
  );
};

/**
 * Accordion Component
 * Renders a list of collapsible sections.
 * @param {Array} items - Array of objects, each with 'title' and 'content'.
 */
const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null); // Index of the currently open item

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle or close others
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
