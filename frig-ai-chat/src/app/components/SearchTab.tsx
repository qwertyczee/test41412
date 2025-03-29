
import React from 'react';

// Fetch actual search history data (e.g., from state management or API) here
// Implement pagination or infinite scroll for long history here
// Add functionality to clear search history here

interface SearchResult {
  id: string;
  query: string;
  timestamp: string;
  summary: string; // Or link to results
}

const SearchTab: React.FC = () => {
  // Placeholder data
  const searchHistory: SearchResult[] = [
    { id: '1', query: 'React best practices 2024', timestamp: '2024-07-27 10:30:00', summary: 'Found articles on hooks, state management...' },
    { id: '2', query: 'Tailwind CSS responsive design', timestamp: '2024-07-27 11:15:00', summary: 'Official docs and tutorials...' },
    { id: '3', query: 'Socket.io vs WebSockets', timestamp: '2024-07-27 14:00:00', summary: 'Comparison of features and use cases...' },
  ];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">AI Search History</h2>
      {/* Add a search input to filter history here */}
      <div className="space-y-3">
        {searchHistory.length > 0 ? (
          searchHistory.map((item) => (
            <div key={item.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-blue-600 dark:text-blue-400">{item.query}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.summary}</p>
              {/* Implement preview functionality (e.g., modal with search results) here */}
              {/* Add action buttons (e.g., rerun search, copy query) here */}
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No search history yet.</p>
        )}
      </div>
      {/* Enhance UI for better readability and interaction here */}
    </div>
  );
};

export default SearchTab;
