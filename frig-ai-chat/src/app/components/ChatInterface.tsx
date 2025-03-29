
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import useSocket from '../hooks/useSocket'; // Import the hook
import { saveState, loadState } from '../lib/sessionManager'; // Import session manager
import '../styles/chatInterface.css';

// Key for storing chat messages in localStorage
const CHAT_MESSAGES_KEY = 'chatMessages';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string; // Add timestamp
}

const ChatInterface: React.FC = () => {
  // Load initial messages from localStorage or default to empty array
  const [messages, setMessages] = useState<Message[]>(() => loadState<Message[]>(CHAT_MESSAGES_KEY) || []);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { isConnected, sendMessage, socket } = useSocket('/'); // Connect to the socket server

  // Effect to handle incoming messages
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (payload: { sender: string; text: string }) => {
        const newMessage: Message = {
          id: `msg-${Date.now()}-${Math.random()}`, // Simple unique ID
          // Determine sender based on socket ID. This is a basic check.
          // In a real app, the server should ideally provide user info.
          sender: payload.sender === socket.id ? 'user' : 'ai',
          text: payload.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        // Prevent adding own messages if server broadcasts back to sender
        // A better approach is for the server *not* to broadcast back to the original sender.
        // This check assumes the server might send it back.
        // Also check if the message text is exactly the same as the last sent user message
        // to prevent duplicates if the server echoes the message back immediately.
        if (payload.sender !== socket.id) {
           setMessages(prev => [...prev, newMessage]);
        }
      };

      socket.on('message', handleNewMessage);

      // Cleanup listener
      return () => {
        socket.off('message', handleNewMessage);
      };
    }
  }, [socket]);

  // Effect to save messages to localStorage whenever they change
  useEffect(() => {
    saveState(CHAT_MESSAGES_KEY, messages);
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === '' || !isConnected) return;

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random()}`, // Simple unique ID
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Send message to backend via socket
    sendMessage('message', { text: inputValue });

    // Clear input after sending
    setInputValue('');

    // No longer simulating AI response here, expect it via socket 'message' event
    // console.log('Sending message:', inputValue); // Keep for debugging if needed

  }, [inputValue, isConnected, sendMessage]);


  // Handle Enter key press in textarea (Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline behavior
      handleSendMessage(); // Submit form
    }
  };

  return (
    // Use flex, flex-col, h-full to make it fill space and manage children
    <div className="chat-interface flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Message List - Make it scrollable */}
      <div className="message-list flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          // Add max-w for messages and adjust alignment
          <div key={message.id} className={`message flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                {/* Optional: Sender Label */}
                {/* <span className="sender-label text-xs font-semibold mb-1 block">{message.sender === 'user' ? 'You' : 'AI'}</span> */}
                <p className="text-sm">{message.text}</p>
                {message.timestamp && <span className="timestamp text-xs opacity-70 block mt-1 text-right">{message.timestamp}</span>}
                {/* Add message actions (copy, edit, etc.) here */}
                {/* Implement message threading display here */}
             </div>
          </div>
        ))}\n        <div ref={messagesEndRef} /> {/* Anchor for scrolling */}\n      </div>\n      {/* Input Form - Stick to bottom */}
      <form className="message-input-form p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center space-x-2" onSubmit={handleSendMessage}>
         {/* Add Interrupt/Redirect AI button here */}
         {/* Basic styling for interrupt button */}
         <button
           type="button"
           onClick={() => alert('Interrupt/Redirect AI - Not Implemented')}
           className="interrupt-button p-2 rounded bg-red-500 hover:bg-red-600 text-white shrink-0"
           title="Interrupt AI Task" // Tooltip
         >
           {/* Use an icon here eventually */}
           Stop
         </button>
         {/* Textarea grows */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Add keydown handler
          placeholder="Type your message here... (Shift+Enter for newline)"
          rows={1} // Start with 1 row, auto-resize potentially needed via JS or CSS
          className="flex-1 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" // Basic styling
          disabled={!isConnected} // Disable input if not connected
        />
        {/* Send button */}
        <button
           type="submit"
           className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 shrink-0" // Basic styling
           disabled={!isConnected || inputValue.trim() === ''}
         >
           Send
         </button>
        {/* Add buttons for file upload, etc. here */}
      </form>
      {!isConnected && (
         <div className="connection-status error p-2 text-center bg-red-100 text-red-700 text-sm">Disconnected from server. Attempting to reconnect...</div>
      )}\n    </div>\n  );\n};\n\nexport default ChatInterface;\n
