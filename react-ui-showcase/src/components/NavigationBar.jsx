
import React from 'react';
import './NavigationBar.css';

/**
 * NavigationBar Component
 *
 * A responsive navigation bar with links for the UI showcase.
 * Includes accessibility features like ARIA roles.
 */
function NavigationBar() {
  // Active link highlighting is currently handled by CSS using [aria-current="page"].
  // State management (e.g., with React Router) would be needed for more complex scenarios.
  // Dropdown functionality would require additional state and component structure.

  return (
    <nav className="navigation-bar" aria-label="Main Navigation">
      <ul className="nav-links">
        <li>
          <a href="#buttons" aria-current="page">Buttons & CTAs</a>
        </li>
        <li>
          <a href="#cards">Cards</a>
        </li>
        <li>
          <a href="#forms">Form Elements</a>
        </li>
        <li>
          <a href="#modals">Modals</a>
        </li>
        <li>
          <a href="#carousels">Carousels</a>
        </li>
        <li>
          <a href="#widgets">Dashboard Widgets</a>
        </li>
        <li>
          <a href="#notifications">Notifications</a>
        </li>
        <li>
          <a href="#accordions">Accordions</a>
        </li>
        <li>
          <a href="#visualizations">Data Visualizations</a>
        </li>
        {/* Add more links here as needed */}
      </ul>
    </nav>
  );
}

export default NavigationBar;
