
import React from 'react';

interface TranscriptDisplayProps {
  transcript: string | null;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[200px] max-h-[500px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Transcript</h3>
      {transcript ? (
        <pre className="whitespace-pre-wrap text-gray-800 text-sm">{transcript}</pre>
      ) : (
        <p className="text-gray-500 italic">No transcript available yet. Upload a file to begin.</p>
      )}
    </div>
  );
};

export default TranscriptDisplay;
