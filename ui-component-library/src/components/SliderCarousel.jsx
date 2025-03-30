
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const SliderCarousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Swipe gesture support for touch devices
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrev(),
    trackMouse: true
  });

  // ARIA attributes for accessibility
  const sliderProps = {
    role: "region",
    "aria-label": "Image carousel",
    "aria-live": "polite",
    ...handlers
  };

  return (
    <div className="relative w-full overflow-hidden" {...sliderProps}>
      <div className="flex transition-transform duration-300 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button 
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 shadow-md transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default SliderCarousel;
