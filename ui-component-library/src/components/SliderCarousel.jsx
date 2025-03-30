
import React from 'react';
import Slider from 'react-slick';

// Import slick-carousel css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderCarousel = ({ items = [] }) => {
  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Loop slides
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Automatically advance slides
    autoplaySpeed: 3000, // Delay between auto scrolls (ms)
    pauseOnHover: true, // Pause autoplay on hover
    fade: true, // Enable fade transition
    // Make it responsive
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // Medium screens (tablets)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1 // Start on the first slide
        }
      },
      {
        breakpoint: 480, // Small screens (mobiles)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false // Hide dots on very small screens
        }
      }
    ],
    // Use custom arrows
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  // Custom Arrow Components with Tailwind
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    // Remove !important overrides from default slick styles if present
    const cleanClassName = className?.replace('slick-arrow', '');
    return (
      <button
        className={`${cleanClassName} absolute top-1/2 -translate-y-1/2 right-0 z-10 flex items-center justify-center w-10 h-10 bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
        style={{ ...style, right: '10px' }} // Adjust position if needed
        onClick={onClick}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
        // Remove !important overrides from default slick styles if present
    const cleanClassName = className?.replace('slick-arrow', '');
    return (
      <button
        className={`${cleanClassName} absolute top-1/2 -translate-y-1/2 left-0 z-10 flex items-center justify-center w-10 h-10 bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
        style={{ ...style, left: '10px' }} // Adjust position if needed
        onClick={onClick}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    );
  }


  if (!items || items.length === 0) {
    return <div className="text-center p-4">No items to display in carousel.</div>;
  }

  return (
    // Ensure container has enough padding to prevent arrows overlapping content on narrow screens if needed
    <div className="slider-container px-4 py-2 relative mx-auto max-w-full">
      {/* Fade transition is enabled in settings. */}
      {/* Touch/swipe support is enabled by default in react-slick. */}
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-1"> {/* Adjusted padding slightly */}
            {/* Each item should be a renderable element like an image or a div */}
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCarousel;
