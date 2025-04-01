
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClasses = "block md:inline-block px-3 py-2 md:py-0 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300 transition-colors";

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Oratio</Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMobileMenu}
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {/* Simple Hamburger Icon */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-1">
          <Link to="/" className={navLinkClasses}>Home</Link>
          <Link to="/transcribe" className={navLinkClasses}>Transcribe</Link>
          <Link to="/about" className={navLinkClasses}>About</Link>
          <Link to="/pricing" className={navLinkClasses}>Pricing</Link>
          <Link to="/contact" className={navLinkClasses}>Contact</Link>
        </nav>
      </div>

      {/* Mobile Navigation Menu (conditionally rendered) */}
      <div
        id="mobile-menu"
        className={`md:hidden mt-3 space-y-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
         <Link to="/" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
         <Link to="/transcribe" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Transcribe</Link>
         <Link to="/about" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
         <Link to="/pricing" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
         <Link to="/contact" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </div>
    </header>
  );
};

export default Header;
