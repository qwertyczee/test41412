
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    // Use bg-gray-50 here if not set in index.css body, otherwise can remove
    <div className="flex flex-col min-h-screen"> 
      <Header />
      {/* Increased vertical padding for main content area */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8"> 
        {/* Child routes will be rendered here */}
        <Outlet /> 
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;
