
import React from 'react';

/**
 * A reusable dashboard widget component.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the widget.
 * @param {string|number} props.value - The main metric or data point to display.
 * @param {React.ReactNode} [props.icon] - An optional icon element.
 * @param {React.ReactNode} [props.children] - Optional children for more complex content.
 */
function DashboardWidget({ title, value, icon, children }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 transition-shadow duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          {icon && (
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 mr-2">{icon}</span>
          )}
          <h3 className="text-base font-normal text-gray-500">{title}</h3>
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{value}</span>
        </div>
        {/* Optional actions/links can be added here if needed */}
      </div>
      {children && (
        <div className="mt-4">
          {/* Child layout can be enhanced here */}
          {children}
        </div>
      )}
       {/* Future enhancements: Consider adding loading and error state handling */}
    </div>
  );
}

export default DashboardWidget;
