
import React from 'react';

/**
 * Card Component
 *
 * A reusable card component with basic styling using Tailwind CSS.
 * Provides a container with padding, rounded corners, and shadow effects.
 * Includes hover state for enhanced interactivity.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the card container.
 * @returns {JSX.Element} The rendered card component.
 */
function Card({ children, className = '' }) {
  return (
    <div
      className={`
        bg-white          # Card background color
        rounded-lg        # Rounded corners
        shadow-md         # Default shadow effect
        p-6               # Padding inside the card (adjust as needed, e.g., p-4)
        transition-shadow # Smooth transition for shadow changes
        duration-300      # Transition duration
        ease-in-out       # Transition timing function
        hover:shadow-lg   # Larger shadow on hover
        ${className}      # Allows for adding custom classes
      `}
    >
      {/* Content Section: Place header, body, footer, or any other content here */}
      {children}
    </div>
  );
}

export default Card;
