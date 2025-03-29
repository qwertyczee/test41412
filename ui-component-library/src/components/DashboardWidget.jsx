
import React from 'react';

/**
 * DashboardWidget Component
 * Displays a key metric or summary within a styled card using Tailwind CSS.
 * Designed to be flexible, accommodating numerical data, text, and optional icons or small charts.
 *
 * Props:
 *  - title (string): The title displayed at the top of the widget.
 *  - value (string | number): The primary metric or data point shown prominently.
 *  - icon (React.Element): An optional React element (e.g., an SVG icon) displayed alongside the title/value.
 *  - children (React.Node): Optional additional content, intended for small charts or supplemental info.
 */
const DashboardWidget = ({ title, value, icon, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* Title and Value Section */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium text-gray-500 truncate">{title}</h3>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        {/* Optional Icon Section */}
        {icon && (
          <div className="flex-shrink-0 ml-4 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {icon}
          </div>
        )}
      </div>

      {/* Optional Children/Chart Area */}
      {children && (
        <div className="mt-4 border-t border-gray-200 pt-4">
           {/* Content passed as children (e.g., a small chart) will be rendered here */}
          {children}
        </div>
      )}
       {/* Placeholder div removed as conditional rendering handles the space */}
    </div>
  );
};

export default DashboardWidget;
