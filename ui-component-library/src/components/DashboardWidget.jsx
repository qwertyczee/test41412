import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * DashboardWidget Component
 *
 * A specialized card component designed to display key information or statistics
 * prominently, often used in dashboards. Icons passed are assumed decorative unless context implies otherwise.
 */
const DashboardWidget = ({ title, value, icon, description, className }) => {
  // Updated styling for better visual appeal and spacing
  const baseClasses =
    'bg-white rounded-lg shadow-lg p-5 border border-gray-100';
  const widgetClasses = clsx(baseClasses, className);

  return (
    <div className={widgetClasses}>
      <div className="flex items-start justify-between space-x-4">
        {' '}
        {/* Use justify-between */}
        {/* Content Section */}
        <div className="flex-grow">
          {title && (
            <h3 className="text-sm font-medium text-gray-500 truncate">
              {title}
            </h3>
          )}
          {value && (
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          )}{' '}
          {/* Slightly larger value */}
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}{' '}
          {/* Adjusted margin */}
        </div>
        {/* Icon Section - styled and aligned to the right */}
        {icon && (
          // Added styling wrapper + aria-hidden assuming icon is purely decorative here
          <div
            className="flex-shrink-0 p-3 rounded-full bg-indigo-100 text-indigo-600"
            aria-hidden="true"
          >
            {/* Clone the icon to ensure consistent sizing */}
            {React.cloneElement(icon, { className: 'h-6 w-6' })}
          </div>
        )}
      </div>
    </div>
  );
};

DashboardWidget.propTypes = {
  /**
   * The main title or label for the widget.
   */
  title: PropTypes.string.isRequired,
  /**
   * The primary value or metric to display. Can be a string, number, or other node.
   */
  value: PropTypes.node.isRequired,
  /**
   * An optional icon element (React component/SVG) to display. Assumed decorative.
   */
  icon: PropTypes.node,
  /**
   * Optional secondary information or context, like percentage change.
   */
  description: PropTypes.node,
  /**
   * Optional additional CSS classes to apply to the widget container.
   */
  className: PropTypes.string,
};

DashboardWidget.defaultProps = {
  icon: null,
  description: null,
  className: '',
};

export default DashboardWidget;
