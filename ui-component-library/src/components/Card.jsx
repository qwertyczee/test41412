
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  title, 
  description, 
  imageUrl, 
  onClick, 
  className = '',
  hoverEffect = true
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hoverEffect ? 'transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool
};

export default Card;
