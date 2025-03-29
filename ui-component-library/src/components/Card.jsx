
import React from 'react';

/**
 * Card component for displaying content in a visually appealing box.
 * Accepts props for image, title, content, children, and theme.
 * @param {object} props - The component props.
 * @param {string} [props.image] - URL for the optional image at the top of the card.
 * @param {string} [props.title] - Optional title for the card.
 * @param {string} [props.content] - Optional text content for the card.
 * @param {React.ReactNode} [props.children] - Allows passing custom elements as content.
 * @param {'default' | 'primary' | 'secondary'} [props.theme] - Visual theme for the card. Defaults to 'default'.
 * @param {string} [props.className] - Additional CSS classes for the card container.
 */
function Card({ image, title, content, children, theme = 'default', className = '' }) {

  let themeStyles = '';
  switch (theme) {
    case 'primary':
      // Example: Add a colored top border
      themeStyles = 'border-t-4 border-blue-500';
      break;
    case 'secondary':
      // Example: Add a subtle background change
      themeStyles = 'bg-gray-50';
      break;
    case 'default':
    default:
      themeStyles = 'bg-white'; // Default background
      break;
  }

  return (
    // Added themeStyles and className prop
    <div className={`${themeStyles} rounded-lg shadow-md overflow-hidden m-4 ${className}`}>
      {image && (
        <img className="w-full h-48 object-cover" src={image} alt={title || 'Card image'} />
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        )}
        {content && (
          <p className="text-gray-700">{content}</p>
        )}
        {children && <div>{children}</div>} {/* Render children if provided */}
        {/* Theme customization added */}
      </div>
    </div>
  );
}

export default Card;
