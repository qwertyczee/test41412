import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaBars, FaTimes } from 'react-icons/fa'; // Using react-icons for menu icons

const NavBar = ({ logo, navLinks = [], ctaButton, className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={clsx('bg-white shadow-sm relative', className)}
      aria-label="Main Navigation"
    >
      {' '}
      {/* Added relative positioning */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {' '}
            {/* Ensure logo aligns if it's an icon/element */}
            {typeof logo === 'string' ? (
              <a href="/" className="text-xl font-bold text-gray-800">
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" // Added focus styling
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block ml-4 flex-shrink-0">
            {' '}
            {/* Added flex-shrink-0 */}
            {ctaButton}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile CTA Button - Place it consistently before hamburger */}
            {ctaButton && (
              <div className="ml-auto mr-2 flex-shrink-0">{ctaButton}</div>
            )}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu" // Points to the menu panel ID
              aria-expanded={isMobileMenuOpen} // State reflects if the menu is open
              aria-label={
                isMobileMenuOpen ? 'Close main menu' : 'Open main menu'
              } // Label changes based on state
            >
              <span className="sr-only">Toggle main menu</span>{' '}
              {/* Screen reader text */}
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-20 border-t border-gray-200"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1" // Added focus styling
              >
                {link.label}
              </a>
            ))}
            {/* Render CTA inside mobile menu - Placed at the bottom for clarity */}
            {ctaButton && (
              <div className="mt-3 pt-3 border-t border-gray-100 px-3">
                {ctaButton}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  /**
   * Logo element or string to display on the left side.
   */
  logo: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  /**
   * Array of navigation link objects. Each object should have `href` and `label`.
   */
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * Optional Call To Action button or element displayed on the right (or in mobile menu).
   */
  ctaButton: PropTypes.node,
  /**
   * Optional additional CSS classes to apply to the nav container.
   */
  className: PropTypes.string,
};

NavBar.defaultProps = {
  navLinks: [],
  ctaButton: null,
  className: '',
};

export default NavBar;
