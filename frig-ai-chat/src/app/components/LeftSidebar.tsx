
import React, { useState, useEffect } from 'react'; // Import useEffect
import ExportArtifactsButton from './ExportArtifactsButton'; // Import the export button
// Removed: import '../styles/leftSidebar.css';
import { saveState, loadState } from '../lib/sessionManager'; // Import session manager

// Key for storing theme preference
const THEME_KEY = 'themePreference';

// Fetch actual chat history data here
// Implement user profile fetching and display here
// Develop project selection/management functionality here

const LeftSidebar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false); // State for mobile toggle
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light'); // Default to light

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = loadState<'light' | 'dark'>(THEME_KEY);
    // Check OS preference if no saved theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setCurrentTheme(initialTheme);
    // Apply the class to the html element for Tailwind's 'class' strategy
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Placeholder data and functions
  const chatHistory = [
    { id: '1', title: 'Chat about React Hooks' },
    { id: '2', title: 'Python script discussion' },
    { id: '3', title: 'Tailwind CSS setup' },
  ];
  const userName = 'Frig AI User';
  const currentProject = 'frig-ai-chat';

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    saveState(THEME_KEY, newTheme); // Save preference
    // Apply the class to the html element for Tailwind's 'class' strategy
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log(`Theme toggled to: ${newTheme}`);
  };

  return (
    // Use theme variables for background and border
    <aside className="left-sidebar flex flex-col h-full bg-background-secondary border-r border-border overflow-y-auto">
       {/* Mobile Toggle Button (visible only on small screens) - Use theme text color */}
       <button
         onClick={() => setIsMobileOpen(!isMobileOpen)}
         className="md:hidden p-2 text-text-primary" // Hide on medium screens and up
       >
         {isMobileOpen ? 'Close Menu' : 'Open Menu'}
       </button>

       {/* Sidebar Content (conditionally rendered or styled based on isMobileOpen) */}
       {/* Use `hidden md:flex` to hide on mobile by default and show as flex on md+ */}
       {/* Or use dynamic classes based on `isMobileOpen` */}
       {/* Use theme text color */}
       <div className={`${isMobileOpen ? 'block' : 'hidden'} md:flex md:flex-col md:flex-1 p-4 space-y-4 text-text-primary`}>
          {/* Project Selection/Management */}
          <div className="project-section">
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Project: {currentProject}</h3>
            {/* Add project switching dropdown or modal here */}
            {/* Use theme variables for button hover */}
            <button className="w-full text-left px-2 py-1 rounded hover:bg-background-tertiary">Switch Project</button>
          </div>

          {/* Chat History */}
          <div className="chat-history-section flex-1 overflow-y-auto"> {/* Allow history to scroll */}
            <h4 className="text-md font-semibold mb-2 text-text-primary">Chat History</h4>
            <ul className="space-y-1">
              {chatHistory.map((chat) => (
                 {/* Use theme variables for list item hover */}
                <li key={chat.id} className="px-2 py-1 rounded hover:bg-background-tertiary cursor-pointer">{chat.title}</li>
              ))}
            </ul>
            {/* Add functionality to load more chats or search history here */}
          </div>

          {/* User Profile & Preferences - Use theme variables */}
          <div className="user-profile-section border-t border-border pt-4">
            <h5 className="text-sm font-medium mb-1 text-text-primary">{userName}</h5>
            {/* Add link to user profile/settings page here */}
            <button className="w-full text-left px-2 py-1 rounded hover:bg-background-tertiary">Preferences</button>
          </div>

          {/* Theme Toggle - Use theme variables */}
          <div className="theme-toggle-section">
            <button
              onClick={handleThemeToggle}
              className="w-full text-left px-2 py-1 rounded hover:bg-background-tertiary"
            >
              Toggle Theme ({currentTheme === 'light' ? 'Dark' : 'Light'}) {/* Indicate next theme */}
            </button>
            {/* Visually indicate current theme (e.g., icon change) here */}
          </div>

          {/* Export Button - Ensure spacing */}
          <div className="export-section mt-2">
            <ExportArtifactsButton />
          </div>

          {/* Project Templates Placeholder - Use theme variables */}
          <div className="templates-section mt-2">
            {/* Implement project template selection UI here */}
            <button className="w-full text-left px-2 py-1 rounded hover:bg-background-tertiary">New from Template</button>
          </div>

          {/* History/Versioning Placeholder - Use theme variables */}
          <div className="history-section mt-2">
            {/* Implement project history/versioning UI here */}
            <button className="w-full text-left px-2 py-1 rounded hover:bg-background-tertiary">View History</button>
          </div>
       </div>
    </aside>
  );
};

export default LeftSidebar;
