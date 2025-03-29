
import React, { useState } from 'react';

/**
 * SliderCarousel Component
 *
 * Displays a list of items (e.g., images, cards) in a carousel format.
 * Features navigation arrows and dot indicators for manual control. Includes fade transition.
 *
 * Props:
 *  - items: Array of items to display in the carousel. Each item should be renderable (e.g., JSX element, string, image URL).
 */
const SliderCarousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div className="text-center text-gray-500 p-4">No items to display.</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800"> {/* Changed bg slightly */}
      {/* Slider Content Wrapper for Transitions */}
      <div className="relative h-64"> {/* Container for slides */}
        {/* Map through items and apply transitions */}
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex items-center justify-center ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={currentIndex !== index}
            // Add role for accessibility if content is complex
            // role="tabpanel"
          >
            {item}
          </div>
        ))}
        {/* Smooth transition animation (fade) is implemented. */}
        {/* Advanced features like auto-play or sliding mechanics are deferred. */}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-20" // Adjusted styling
        aria-label="Previous slide"
      >
        {/* SVG Icon for Left Arrow */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-20" // Adjusted styling
        aria-label="Next slide"
      >
         {/* SVG Icon for Right Arrow */}
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              currentIndex === slideIndex ? 'bg-white scale-110' : 'bg-gray-400 bg-opacity-60 hover:bg-opacity-80' // Enhanced styling
            } focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50`}
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={currentIndex === slideIndex ? 'step' : undefined}
          />
        ))}
      </div>
       {/* Note: Sliding mechanics require more complex implementation */}
    </div>
  );
};

export default SliderCarousel;
