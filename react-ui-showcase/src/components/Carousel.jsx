
import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay feature would require useEffect and setInterval/clearInterval.
  // Pause on hover would involve adding onMouseEnter/onMouseLeave handlers to the carousel container.

  return (
    <div className="carousel">
      <div className="carousel-track-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div className="carousel-slide" key={index}>
              {/* Render item content here - assuming item is a renderable element or has properties */}
              {item.content ? item.content : <div>Slide {index + 1}</div>}
            </div>
          ))}
        </div>
      </div>

      <button onClick={prevSlide} className="carousel-button prev">
        ❮ {/* Left arrow */}
      </button>
      <button onClick={nextSlide} className="carousel-button next">
        ❯ {/* Right arrow */}
      </button>

      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
