
import { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@/server/socket'; // Assuming types are exported from server

// Define the hook
const useSocket = (uri: string, options?: Partial<Parameters<typeof io>[1]>) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null); // Store last received message of any type
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    // Use the custom path defined in the server setup
    const socket = io(uri, {
      path: '/api/socket', // Ensure this matches server config
      addTrailingSlash: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true, // Connect automatically
      ...options,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
      // Handle potential reconnection logic or cleanup here if needed
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      // Handle connection errors (e.g., show a notification to the user)
    });

    // Generic message handler to update last message state (can be customized)
    // Consider adding specific event listeners here or returning the socket instance
    // for components to add their own listeners.
    socket.onAny((eventName, ...args) => {
      setLastMessage({ eventName, args });
      console.log(`Received event [${eventName}]:`, args);
    });

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        console.log('Disconnecting socket...');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [uri, options]); // Re-run effect if URI or options change

  // Function to send messages/events to the server
  const sendMessage = useCallback((eventName: keyof ClientToServerEvents, ...args: any[]) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, ...args);
    } else {
      console.warn('Socket not connected. Cannot send message.');
      // Implement message queueing if needed for offline support
    }
  }, []);

  // Return connection status, last message, send function, and the socket instance itself
  // Be cautious returning the raw socket instance; prefer specific handlers/functions.
  return { isConnected, lastMessage, sendMessage, socket: socketRef.current };
};

export default useSocket;
