
// ./oratio-web/src/services/api.ts

// Read the base API URL from environment variables, with a default fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Uploads an audio file to the backend for transcription.
 * @param file - The audio file to upload.
 * @returns A promise that resolves with the job ID for the transcription task.
 */
export async function uploadFile(file: File): Promise<{ jobId: string }> {
  console.log('Uploading file:', file.name);
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'File upload failed with status ' + response.status }));
      throw new Error(errorData.detail || 'File upload failed');
    }

    const data = await response.json();
    if (!data.jobId) {
      throw new Error('Invalid response from server: missing jobId');
    }
    return data; // Assuming the backend returns { jobId: 'some-id' }
  } catch (error) {
    console.error('Error uploading file:', error);
    // Re-throw the error after logging, so the caller component can handle it
    throw error;
  }
}

/**
 * Fetches the transcription status and result for a given job ID.
 * @param jobId - The ID of the transcription job.
 * @returns A promise that resolves with the transcription status and data.
 */
export async function getTranscription(jobId: string): Promise<{ status: string; transcript?: string; error?: string }> {
  console.log('Fetching transcription for job ID:', jobId);

  try {
    const response = await fetch(`${API_BASE_URL}/transcriptions/${jobId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: `Failed to fetch transcription status for job ${jobId} with status ${response.status}` }));
      throw new Error(errorData.detail || `Failed to fetch transcription status for job ${jobId}`);
    }

    const data = await response.json();
    // Basic validation of the response structure
    if (!data.status) {
       throw new Error('Invalid response from server: missing status');
    }
    // Ensure expected fields are present based on status
    if (data.status === 'completed' && typeof data.transcript === 'undefined') {
        console.warn(`Transcription job ${jobId} completed but transcript is missing.`);
        // Decide if this should be an error or handled differently downstream
        // For now, return as is, but log a warning.
    }
    if (data.status === 'failed' && typeof data.error === 'undefined') {
        console.warn(`Transcription job ${jobId} failed but error message is missing.`);
        // Decide if this should be an error or handled differently downstream
    }

    return data; // Assuming backend returns { status: 'processing' | 'completed' | 'failed', transcript?: '...', error?: '...' }
   } catch (error) {
     console.error('Error fetching transcription:', error);
     // Re-throw the error after logging
     throw error;
   }
}

/**
 * Submits the contact form data to the backend.
 * @param formData - Object containing name, email, and message.
 * @returns A promise that resolves when the submission is successful.
 */
export async function submitContactForm(formData: { name: string; email: string; message: string }): Promise<void> {
    console.log('Submitting contact form:', formData);
    // In a real scenario, this would be a POST request to a backend endpoint.
    try {
        // Use environment variable for contact endpoint, fallback if needed
        const contactUrl = `${API_BASE_URL}/contact`;
        console.log(`Submitting contact form to: ${contactUrl}`);

        const response = await fetch(contactUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          // Try to parse error details from the response, or use a generic message
          let errorDetail = 'Contact form submission failed';
          try {
              const errorData = await response.json();
              errorDetail = errorData.detail || `Submission failed with status ${response.status}`;
          } catch (e) {
              // Response might not be JSON, use status text or generic message
              errorDetail = response.statusText || `Submission failed with status ${response.status}`;
          }
          throw new Error(errorDetail);
        }

        console.log('Contact form submitted successfully via API.');
        // No need to explicitly return Promise.resolve() in an async function if execution completes

    } catch (error) {
        console.error('Error submitting contact form:', error);
        // Re-throw the error for the component to handle
        // Ensure the error thrown is an actual Error object
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred during contact form submission.');
        }
    }
    // Note: The previous mock implementation is removed.
    // If the API endpoint doesn't exist or fails, this will throw an error caught above.
}
