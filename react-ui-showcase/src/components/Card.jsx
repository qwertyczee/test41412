
import React from 'react';
import './Card.css';

/**
 * Card Component
 * 
 * A versatile card component for displaying content.
 * Can be configured with props to show image, title, text, and actions.
 * 
 * @param {object} props - Component props
 * @param {string} [props.imageUrl] - URL for the card image (optional)
 * @param {string} props.title - Title of the card
 * @param {string} props.text - Main text content of the card
 * @param {React.ReactNode} [props.actions] - Action elements like buttons (optional)
 */
function Card({ imageUrl, title, text, actions }) {
  return (
    <div className="card">
      {/* Conditional rendering for image is implemented below */}
      {imageUrl && <img src={imageUrl} alt={title || ''} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{text}</p>
      </div>
      {/* Layout for actions section is implemented below */}
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
}

export default Card;
