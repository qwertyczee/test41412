
import React, { useState } from 'react';

// Load initial settings from user preferences or global state here
// Implement logic to save settings changes here

const ChatSettingsTab: React.FC = () => {
  // Placeholder state for settings
  const [techStack, setTechStack] = useState('React, Node.js, Tailwind');
  const [docStyle, setDocStyle] = useState('JSDoc');
  const [codingPref, setCodingPref] = useState('Functional Components');
  const [outputPref, setOutputPref] = useState('Concise');
  const [aiPersonality, setAiPersonality] = useState('Helpful Assistant');

  return (
    <div className="p-4 h-full overflow-y-auto space-y-6">
      <h2 className="text-lg font-semibold mb-4">Chat Settings</h2>

      {/* Tech Stack Configuration */}
      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Preferred Tech Stack
        </label>
        <input
          type="text"
          id="techStack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          placeholder="e.g., React, TypeScript, Python"
        />
        {/* Add suggestions or presets here */}
      </div>

      {/* Documentation Style */}
      <div>
        <label htmlFor="docStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Documentation Style
        </label>
        <select
          id="docStyle"
          value={docStyle}
          onChange={(e) => setDocStyle(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option>JSDoc</option>
          <option>TSDoc</option>
          <option>Google Style</option>
          <option>None</option>
        </select>
        {/* Add more style options here */}
      </div>

      {/* Coding Preferences */}
      <div>
        <label htmlFor="codingPref" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Coding Preferences
        </label>
        <select
          id="codingPref"
          value={codingPref}
          onChange={(e) => setCodingPref(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option>Functional Components</option>
          <option>Class Components</option>
          <option>Arrow Functions</option>
          <option>Standard Functions</option>
        </select>
         {/* Allow multiple selections or more granular preferences here */}
      </div>

       {/* Output Preferences */}
      <div>
        <label htmlFor="outputPref" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          AI Output Preference
        </label>
        <select
          id="outputPref"
          value={outputPref}
          onChange={(e) => setOutputPref(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option>Concise</option>
          <option>Detailed</option>
          <option>Step-by-step</option>
        </select>
         {/* Add more output control options here */}
      </div>

      {/* AI Personality */}
      <div>
        <label htmlFor="aiPersonality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          AI Personality
        </label>
        <select
          id="aiPersonality"
          value={aiPersonality}
          onChange={(e) => setAiPersonality(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option>Helpful Assistant</option>
          <option>Formal Expert</option>
          <option>Creative Collaborator</option>
          <option>Sarcastic Bot (Use with caution!)</option>
        </select>
        {/* Add custom personality input here */}
      </div>

      {/* Add button to save settings here */}
      {/* Enhance UI with better grouping and descriptions here */}
    </div>
  );
};

export default ChatSettingsTab;
