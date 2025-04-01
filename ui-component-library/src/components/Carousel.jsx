import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import clsx from 'clsx';

// Ensure slick-carousel CSS is imported globally (e.g., in main.jsx)
// You might need to adjust paths based on your setup:
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// Consider providing props for aria-labels on controls if using defaults.

/**
 * Carousel component using react-slick.
 * Wraps react-slick slider with basic configuration and PropTypes.
 */
const Carousel = ({ items, settings, className }) => {
  // Default settings - consider making more accessible defaults
  const defaultSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto-play slides
    autoplaySpeed: 4000, // Delay between auto-play slides
    pauseOnHover: true, // Pause autoplay on hover
    adaptiveHeight: true, // Adjust height based on slide content
    // Accessibility considerations for default settings:
    // - Ensure default arrows/dots are keyboard focusable and operable.
    // - Consider adding aria-live="polite" to the track if content changes dynamically in meaningful ways.
  };

  // Merge default settings with any custom settings provided via props
  const mergedSettings = { ...defaultSettings, ...settings };

  // Basic wrapper with provided className
  const wrapperClasses = clsx('carousel-wrapper relative', className);

  return (
    <div className={wrapperClasses}>
      <Slider {...mergedSettings}>
        {items.map((item, index) => (
          // Each direct child of Slider needs a key.
          // The inner div helps with styling/padding if needed per slide.
          <div key={index} className="carousel-slide px-1">
            {' '}
            {/* Add slight horizontal padding between slides */}
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  /**
   * Array of React nodes (components, elements) to display as slides.
   */
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  /**
   * Optional object to override default react-slick settings.
   * Refer to react-slick documentation for all available options.
   */
  settings: PropTypes.object,
  /**
   * Optional CSS class name to apply to the main wrapper div.
   */
  className: PropTypes.string,
};

Carousel.defaultProps = {
  items: [], // Default to empty array
  settings: {},
  className: '',
};

export default Carousel;
