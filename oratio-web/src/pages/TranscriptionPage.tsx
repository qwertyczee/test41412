
import React, { useState, useEffect, useRef } from 'react';
import FileUpload from '../components/transcription/FileUpload';
import TranscriptDisplay from '../components/transcription/TranscriptDisplay';
import { uploadFile, getTranscription } from '../services/api'; // Import API functions

const POLLING_INTERVAL = 3000; // Poll every 3 seconds

const TranscriptionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcriptText, setTranscriptText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null); // State to store job ID
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref for interval ID

  // Cleanup function to clear interval on unmount or when job completes/fails
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);


  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    setTranscriptText(null); // Reset transcript when a new file is chosen
    setError(null); // Reset error
    setJobId(null); // Reset job ID
    // Clear any existing polling interval if a new file is selected
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
     setIsLoading(false); // Ensure loading state is reset
  };

  const pollTranscriptionStatus = (currentJobId: string) => {
    // Clear previous interval before starting a new one
     if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
     }

    pollingIntervalRef.current = setInterval(async () => {
      console.log(`Polling status for job ID: ${currentJobId}`);
      try {
        const result = await getTranscription(currentJobId);

        if (result.status === 'completed') {
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          setTranscriptText(result.transcript || 'Transcription completed, but no text received.');
          setError(null);
          setIsLoading(false);
          setJobId(null); // Clear job ID once completed
        } else if (result.status === 'failed') {
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          setError(result.error || 'Transcription failed with an unknown error.');
          setTranscriptText(null);
          setIsLoading(false);
          setJobId(null); // Clear job ID on failure
        } else {
          // Still processing, update status message and continue polling...
          setTranscriptText(`Status: ${result.status || 'processing'}...`);
           // Keep isLoading true while processing
        }
      } catch (err) {
        console.error('Error polling transcription status:', err);
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        setError(err instanceof Error ? err.message : 'Failed to get transcription status.');
        setTranscriptText(null);
        setIsLoading(false);
        setJobId(null); // Clear job ID on polling error
      }
    }, POLLING_INTERVAL);
  };


  const handleStartTranscription = async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }
     // Clear previous interval if user clicks start again
     if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
     }

    setIsLoading(true);
    setError(null);
    setJobId(null); // Reset Job ID before new request
    setTranscriptText('Uploading file...'); // Initial status

    try {
      // Step 1: Upload the file
      const uploadResult = await uploadFile(selectedFile);
      const currentJobId = uploadResult.jobId;
      setJobId(currentJobId); // Store the new Job ID
      console.log(`File uploaded successfully. Job ID: ${currentJobId}`);
      setTranscriptText('File uploaded. Waiting for transcription to start...');

      // Step 2: Start polling for the transcription status
      pollTranscriptionStatus(currentJobId);

    } catch (err) {
      console.error('Error starting transcription:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upload.');
      setTranscriptText(null);
      setIsLoading(false);
      setJobId(null); // Clear job ID on initial upload error
      // Ensure polling stops if upload fails
       if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
       }
    }
    // Note: isLoading is now set to false only when polling completes or fails.
  };


  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Audio/Video Transcription</h1>

      <div className="max-w-lg mx-auto">
         <FileUpload onFileSelect={handleFileSelected} />
      </div>


      {selectedFile && (
        <div className="text-center mt-4">
          <button
            onClick={handleStartTranscription}
            disabled={isLoading || !selectedFile || !!jobId} // Also disable if a job is already in progress
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ${isLoading || !selectedFile || !!jobId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (jobId ? 'Transcribing...' : 'Uploading...') : 'Start Transcription'}
          </button>
        </div>
      )}

        {error && (
             // Slightly adjusted error styling
            <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow-sm">
                {error}
            </div>
        )}

      <div className="mt-8">
        <TranscriptDisplay transcript={transcriptText} />
      </div>
    </div>
  );
};

export default TranscriptionPage;
