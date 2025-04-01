
import React, { useState } from 'react';
import { submitContactForm } from '../services/api'; // Import the API function

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // To show submission status

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Submitting...');
    console.log('Attempting form submission:', { name, email, message });

    submitContactForm({ name, email, message })
      .then(() => {
        setStatus('Message sent successfully!');
        // Clear form on success
        setName('');
        setEmail('');
        setMessage('');
        // Optionally clear status message after a delay
        setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
      })
      .catch((error) => {
        console.error('Contact form submission error:', error);
        // Display the error message from the API call, or a generic fallback
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        setStatus(`Failed to send message: ${errorMessage}. Please try again.`);
        // Don't clear the form fields on error
        // Optionally clear status message after a longer delay on error
        setTimeout(() => setStatus(''), 8000); // Clear status after 8 seconds
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
           // Standardized button style (using indigo variant)
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          disabled={status === 'Submitting...'}
        >
          {status === 'Submitting...' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status && <p className={`mt-2 text-sm text-center ${status.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>{status}</p>}
    </form>
  );
};

export default ContactForm;
