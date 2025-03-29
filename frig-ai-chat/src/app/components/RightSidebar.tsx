
'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import { saveState, loadState } from '../lib/sessionManager'; // Import session manager
import '../styles/rightSidebar.css';
import RoadmapTab from './RoadmapTab';
import TerminalTab from './TerminalTab';
import SearchTab from './SearchTab';
import ChatSettingsTab from './ChatSettingsTab';
import FollowAITab from './FollowAITab';

// Key for storing active tab in localStorage
const ACTIVE_RIGHT_TAB_KEY = 'activeRightSidebarTab';

type TabId = 'roadmap' | 'terminal' | 'search' | 'settings' | 'follow';

interface Tab {
  id: TabId;
  label: string;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { id: 'roadmap', label: 'Roadmap', component: RoadmapTab },
  { id: 'terminal', label: 'Terminal', component: TerminalTab },
  { id: 'search', label: 'Search', component: SearchTab },
  { id: 'settings', label: 'Chat Settings', component: ChatSettingsTab },
  { id: 'follow', label: 'Follow AI', component: FollowAITab },
];

const RightSidebar: React.FC = () => {
  // Load initial active tab from localStorage or default to 'roadmap'
  const [activeTab, setActiveTab] = useState<TabId>(() => {
      const savedTab = loadState<TabId>(ACTIVE_RIGHT_TAB_KEY);
      // Ensure the saved tab is a valid TabId, otherwise default
      return savedTab && tabs.some(tab => tab.id === savedTab) ? savedTab : 'roadmap';
  });

  // Effect to save active tab to localStorage whenever it changes
  useEffect(() => {
    saveState(ACTIVE_RIGHT_TAB_KEY, activeTab);
  }, [activeTab]);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  // Implement resizable split pane functionality here
  // Optimize tab content loading (e.g., lazy loading) here
  // Enhance responsiveness for different screen sizes here

  return (
    // Add flex, flex-col, h-full for proper structure and scrolling
    // Add responsive width/visibility if needed (e.g., hidden md:flex)
    <aside className="right-sidebar-container flex flex-col h-full bg-gray-50 dark:bg-gray-850 border-l border-gray-300 dark:border-gray-700">
       {/* Add mobile toggle if needed here */}
      {/* Tab Navigation - Allow horizontal scrolling on small screens if tabs overflow */}
      <nav className="right-sidebar-tabs flex shrink-0 overflow-x-auto border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="right-sidebar-content">
        {ActiveComponent ? <ActiveComponent /> : <div>Select a tab</div>}
      </div>
    </aside>
  );
};

export default RightSidebar;
