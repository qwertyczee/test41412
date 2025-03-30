
import React from 'react';

const ExampleButton = ({ children }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      {children}
    </button>
  );
};

export default ExampleButton;
