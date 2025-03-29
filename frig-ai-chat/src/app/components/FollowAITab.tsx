
import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import MonacoEditor from './MonacoEditor'; // Import MonacoEditor

// Implement filtering or categorization of actions here
// Add potentially links to relevant files/code here
// Improve language detection for Monaco Editor here

// Define a more specific type based on expected server payload
interface AIAction {
  id: string; // Use a unique ID, maybe generated client-side or from server
  type: string; // Keep type flexible or define specific types if known
  timestamp: string;
  details: string; // Expect details to be a string (code, diff, message)
  language: string; // Add language for editor
}

// Helper to guess language from action details
const detectLanguage = (details: string): string => {
  const lowerDetails = details.toLowerCase();
  if (lowerDetails.startsWith('diff') || lowerDetails.includes('<<<<<<< search')) return 'diff';
  if (lowerDetails.includes('function') || lowerDetails.includes('const') || lowerDetails.includes('import')) return 'javascript'; // Basic JS check
  if (lowerDetails.includes('def ') || lowerDetails.includes('import ')) return 'python'; // Basic Python check
  if (lowerDetails.startsWith('{') && lowerDetails.endsWith('}')) return 'json';
  if (lowerDetails.startsWith('<') && lowerDetails.endsWith('>')) return 'html'; // Basic HTML/XML check
  return 'plaintext'; // Default
};


const FollowAITab: React.FC = () => {
  const [aiActions, setAiActions] = useState<AIAction[]>([]);
  const { socket } = useSocket('/'); // Connect to the socket server

  useEffect(() => {
    if (socket) {
      const handleAIAction = (payload: { action: string; details: any }) => {
        // Ensure details is a string, stringify if object/array
        let detailStr = payload.details?.content || payload.action; // Prefer content if available
        if (typeof detailStr !== 'string') {
            try {
                detailStr = JSON.stringify(detailStr, null, 2); // Pretty print JSON
            } catch {
                detailStr = String(detailStr); // Fallback to simple string conversion
            }
        }

        const lang = detectLanguage(detailStr);

        const newAction: AIAction = {
          id: `action-${Date.now()}-${Math.random()}`,
          type: payload.action.split(':')[0].toLowerCase().replace(/ /g, '_'),
          timestamp: new Date(payload.details?.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          details: detailStr,
          language: lang, // Store detected language
        };
        setAiActions(prev => [newAction, ...prev].slice(0, 100));
        // Consider performance for very long action lists - Added basic limit
      };

      socket.on('ai_action', handleAIAction);

      // Cleanup listener
      return () => {
        socket.off('ai_action', handleAIAction);
      };
    }
  }, [socket]);

  const getIconForType = (type: string) => {
    // Infer icon based on inferred type string
    if (type.includes('edit') || type.includes('writing')) return '📝';
    if (type.includes('file') || type.includes('reading')) return '📄';
    if (type.includes('web') || type.includes('search')) return '🔍';
    if (type.includes('reasoning') || type.includes('planning')) return '🧠';
    if (type.includes('command') || type.includes('executing')) return '💻';
    return '➡️'; // Default arrow
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Follow AI Actions</h2>
      <div className="space-y-2 text-sm">
        {aiActions.length > 0 ? (
          aiActions.map((action) => ( // Already newest first due to prepend
            <div key={action.id} className="flex items-start p-2 border-b border-gray-200 dark:border-gray-700">
              <span className="mr-2 text-lg">{getIconForType(action.type)}</span>
              <div className="flex-grow">
                {/* Display the full action detail string */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{action.timestamp}</span>
                <p className="text-gray-700 dark:text-gray-300">{action.details}</p>
                {/* Add expandable details (e.g., code diffs) here */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Waiting for AI actions...</p>
        )}
      </div>
      {/* Add controls for pausing/clearing the feed here */}
      {/* Improve visual distinction between action types here */}
      {/* Consider performance for very long action lists - Added basic limit */}
    </div>
  );
};

export default FollowAITab;
