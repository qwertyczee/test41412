
import React from 'react';
import './DashboardWidget.css';

/**
 * DashboardWidget Component
 *
 * A reusable widget for displaying key information or statistics on a dashboard.
 *
 * Props:
 *  - title (string): The title displayed at the top of the widget.
 *  - value (string | number): The main data point or value to display.
 *  - description (string, optional): Additional context or description for the value.
 *  - icon (React.ReactNode, optional): An icon element to display alongside the title or value.
 *  - children (React.ReactNode, optional): Allows for custom content within the widget body.
 *  - isLoading (boolean, optional): Show loading state.
 *  - error (object | string, optional): Show error state.
 *  - footerContent (React.ReactNode, optional): Content for the footer area.
 */
function DashboardWidget({ title, value, description, icon, children, isLoading, error, footerContent }) {
  // Data fetching logic (e.g., using useEffect) would typically reside in a parent component or custom hook.
  // Interaction handlers (e.g., onClick) can be added to the main div or specific elements as needed.

  const widgetClasses = `dashboard-widget ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`;

  return (
    <div className={widgetClasses}>
      <div className="widget-header">
        {icon && <span className="widget-icon">{icon}</span>}
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-body">
        {/* Display loading or error state, or the actual content */}
        {isLoading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {typeof error === 'string' ? error : 'Failed to load'}</div>}
        {!isLoading && !error && (
          <>
            {value && <p className="widget-value">{value}</p>}
            {description && <p className="widget-description">{description}</p>}
            {children}
          </>
        )}
      </div>
      {/* Render footer content if provided */}
      {footerContent && (
          <div className="widget-footer">
              {footerContent}
          </div>
      )}
    </div>
  );
}

export default DashboardWidget;
