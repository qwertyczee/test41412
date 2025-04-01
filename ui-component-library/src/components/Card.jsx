import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * A reusable card component for displaying content sections.
 * Supports optional image, title, alt text for image, and footer content.
 */
function Card({
  children,
  className,
  title,
  imageUrl,
  imageAlt,
  footerContent,
}) {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';


  return (
    <div className={clsx(baseClasses, className)}>
      {imageUrl && (
        <img
          className="w-full h-48 object-cover" // Consider aspect ratio options
          src={imageUrl}
          alt={imageAlt || (title ? `${title} card image` : 'Card image')} // Improved default alt text
          loading="lazy" // Add lazy loading by default
        />
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        )}
        <div className="text-gray-600">{children}</div>
      </div>
      {footerContent && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
          {footerContent}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  /**
   * The main content of the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional additional CSS classes to apply to the card container.
   */
  className: PropTypes.string,
  /**
   * Optional title to display within the card content area.
   */
  title: PropTypes.string,
  /**
   * Optional URL for an image to display at the top of the card.
   */
  imageUrl: PropTypes.string,
  /**
   * Alt text for the image. Defaults to a generic description if not provided, but should ideally be meaningful. Required if imageUrl is present for accessibility.
   */
  imageAlt: PropTypes.string,
  /**
   * Optional content to display in a styled footer section.
   */
  footerContent: PropTypes.node,
};

Card.defaultProps = {
  className: '',
  title: null,
  imageUrl: null,
  imageAlt: '', // Provide a default, but a descriptive alt is better if image is meaningful
  footerContent: null,
};

export default Card;
