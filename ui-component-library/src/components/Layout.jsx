import React from 'react';
import PropTypes from 'prop-types';
import ShowcaseSidebar from './ShowcaseSidebar'; // Import the new sidebar

function Layout({ children }) {
  // Determine if the current route is the showcase page to decide if sidebar should be shown
  // For simplicity here, we assume Layout is ONLY used for ShowcasePage or pages that need the sidebar.
  // In a real app, you might use react-router or context to conditionally render the sidebar.
  const showSidebar = true; // Assume we always show it when this Layout is used

  return (
    <div className="flex">
      {' '}
      {/* Flex container for sidebar and main content */}
      {showSidebar && <ShowcaseSidebar />} {/* Conditionally render sidebar */}
      {/* Adjust main content margin based on whether sidebar is shown */}
      <main className={`flex-1 ${showSidebar ? 'lg:ml-48' : ''} p-4 sm:p-8`}>
        {' '}
        {/* Add left margin on lg screens if sidebar exists */}
        {/* Removed max-w-7xl mx-auto as it might conflict with full-width elements like NavBar if applied here */}
        {/* Consider applying max-width constraints within specific page content containers if needed */}
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  /**
   * The main content to be rendered within the layout.
   */
  children: PropTypes.node.isRequired,
};

export default Layout;
