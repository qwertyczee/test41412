
import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const accordionRef = useRef(null);

  // Swipe handlers for touch devices
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleNext(),
    onSwipedDown: () => handlePrev(),
    trackMouse: true
  });

  const handleNext = () => {
    if (activeIndex === null || activeIndex >= items.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex === null || activeIndex <= 0) {
      setActiveIndex(items.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleKeyDown = (e, index) => {
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        handleNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        handlePrev();
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      default:
        break;
    }
  };

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div 
      className="w-full max-w-md mx-auto"
      {...swipeHandlers}
      ref={accordionRef}
      role="region"
      aria-label="Accordion controls"
    >
      {items.map((item, index) => (
        <div 
          key={index}
          className="border-b border-gray-200"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => toggleItem(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-content-${index}`}
            id={`accordion-header-${index}`}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            {activeIndex === index ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <div
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-header-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
          >
            <div className="p-4 text-gray-600">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired
    })
  ).isRequired
};

export default Accordion;
