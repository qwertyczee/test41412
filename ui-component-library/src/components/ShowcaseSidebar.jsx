import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

// Define links outside component if they don't depend on props/state
const sidebarLinks = [
  { href: '#buttons', label: 'Buttons' },
  { href: '#cards', label: 'Cards' },
  { href: '#forms', label: 'Forms' },
  { href: '#modal', label: 'Modal' },
  { href: '#accordion', label: 'Accordion' },
  { href: '#notification', label: 'Notification' },
  { href: '#carousel', label: 'Carousel' },
  { href: '#widgets', label: 'Widgets' },
  { href: '#charts', label: 'Charts' },
];

function ShowcaseSidebar() {
  return (
    // Improved styling: thicker border, slightly different background, explicit top padding matching potential NavBar height
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-48 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto shadow-sm z-20 hidden lg:block">
      {' '}
      {/* Hide on smaller screens, show on lg+, adjust top based on NavBar height */}
      <h3 className="text-base font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
        Components
      </h3>
      <nav aria-label="Component navigation">
        {' '}
        {/* Added aria-label */}
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.href} className="mb-1">
              <a
                href={link.href}
                className="block py-1.5 px-2 rounded text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-indigo-100 focus:text-indigo-700 transition-colors duration-150 text-sm font-medium" // Enhanced focus and hover styles
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// ShowcaseSidebar currently doesn't take props, but good practice to include if it might evolve.
// ShowcaseSidebar.propTypes = {};

// ShowcaseSidebar.defaultProps = {};

export default ShowcaseSidebar;
