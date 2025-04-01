
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    // Slightly adjusted padding and margin-top removed (handled by Layout's main padding)
    <footer className="bg-gray-200 text-gray-600 text-center py-6 px-4 mt-auto"> 
      <div className="container mx-auto">
        © {currentYear} Oratio. All rights reserved.
        {/* Placeholder for potential future links */}
        {/* <div className="mt-2"> <a href="#" className="hover:text-gray-800">Privacy Policy</a> | <a href="#" className="hover:text-gray-800">Terms of Service</a> </div> */}
      </div>
    </footer>
  );
};

export default Footer;
