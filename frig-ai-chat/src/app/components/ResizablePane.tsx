
'use client';

import React, { useState, useEffect } from 'react';
import SplitPane, { SplitPaneProps } from 'react-split-pane';

// Import the CSS for the resizer styles
// Create and import a dedicated CSS file for ResizablePane styles if needed, or integrate into globals/tailwind
// import './resizablePane.css'; // Assuming you create this file based on documentation

interface ResizablePaneProps extends SplitPaneProps {
  children: React.ReactNode[];
  storageKey?: string; // Optional key to persist size in localStorage
}

const ResizablePane: React.FC<ResizablePaneProps> = ({
  children,
  split = 'vertical', // Default split direction
  minSize = 50, // Default minimum size
  storageKey,
  defaultSize: initialDefaultSize, // Rename prop to avoid conflict
  onChange,
  ...rest
}) => {
  const [size, setSize] = useState<number | string | undefined>(initialDefaultSize);

  // Load size from localStorage if key is provided
  useEffect(() => {
    if (storageKey) {
      const storedSize = localStorage.getItem(storageKey);
      if (storedSize) {
        setSize(parseInt(storedSize, 10));
      } else if (initialDefaultSize) {
        setSize(initialDefaultSize); // Use initial default if nothing stored
      }
    } else if (initialDefaultSize) {
        setSize(initialDefaultSize); // Use initial default if no storage key
    }
    // Add validation for storedSize if needed
  }, [storageKey, initialDefaultSize]);

  const handleOnChange = (newSize: number) => {
    setSize(newSize);
    if (storageKey) {
      localStorage.setItem(storageKey, newSize.toString());
      // Consider debouncing localStorage writes for performance
    }
    if (onChange) {
      onChange(newSize); // Call original onChange if provided
    }
  };

  // Ensure exactly two children are passed
  if (React.Children.count(children) !== 2) {
    console.error('ResizablePane requires exactly two children.');
    // Provide better error feedback or fallback UI here
    return <div>Error: ResizablePane requires exactly two children.</div>;
  }

  // Add custom styling for the resizer element (see react-split-pane docs) here
  // Consider adding maximum size constraints (maxSize prop) here
  // Explore using react-split-pane v2 if more features are needed here

  return (
    <SplitPane
      split={split}
      minSize={minSize}
      defaultSize={size} // Use state for defaultSize to handle persistence
      onChange={handleOnChange}
      {...rest}
      // Add resizerClassName or style props for custom appearance
      // resizerClassName="Resizer" // Example class name
    >
      {children}
    </SplitPane>
  );
};

export default ResizablePane;
