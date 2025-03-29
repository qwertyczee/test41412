
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

// Define a type for the response object that includes the socket server property
export type NextApiResponseWithSocket = NextApiResponse & { // Export for use in API route
  socket: {
    server: HttpServer & {
      io?: SocketIOServer;
    };
  };
};

// Define events the server sends to the client
export interface ServerToClientEvents {
  message: (payload: { sender: string; text: string }) => void;
  terminal_output: (payload: { output: string }) => void;
  ai_action: (payload: { action: string; details: any }) => void;
  // Add other client-side events here
}

// Define events the client sends to the server
export interface ClientToServerEvents {
  message: (payload: { text: string }) => void;
  terminal_command: (payload: { command: string }) => void;
  // Add other server-side events here
}

// Define events for server-to-server communication (if needed)
export interface InterServerEvents {
  // Add inter-server events here
}

interface SocketData {
  // Add custom socket data types here
  userId?: string;
}

export const initializeSocketIO = (httpServer: HttpServer) => {
  const io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    path: "/api/socket", // Custom path for Socket.IO
    addTrailingSlash: false,
    cors: {
      origin: "http://localhost:3000", // Restrict origin in production (adjust as needed)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Example: Handle a 'message' event from the client
    socket.on("message", (msg: string) => {
      console.log(`Message from ${socket.id}: ${msg}`);
      // Broadcast the message to all other clients
      socket.broadcast.emit("message", `User ${socket.id} says: ${msg}`);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id}, Reason: ${reason}`);
    });

    // --- Chat Event Handlers ---
    socket.on('message', (payload) => {
      console.log(`Message received from ${socket.id}: ${payload.text}`);
      // Broadcast to other clients
      socket.broadcast.emit('message', { sender: socket.id, text: payload.text });
      // Add logic to process message, potentially interact with AI model
    });

    // --- Terminal Event Handlers ---
    socket.on('terminal_command', (payload) => {
      console.log(`Terminal command from ${socket.id}: ${payload.command}`);
      // Implement secure command execution logic here
      // For now, just echo back a simulated output
      const output = `Executing: ${payload.command}\\n...done.\\n`;
      socket.emit('terminal_output', { output });
      // Broadcast relevant terminal state changes if needed
      // Add security checks before executing any command
    });

    // --- Follow AI Event Handlers ---
    // Example: Simulate an AI action being broadcast
    const sendAIAction = () => {
        const actions = ['Reading file: /src/app.js', 'Writing code snippet', 'Searching web: \"React hooks best practices\"'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const actionPayload = { action: randomAction, details: { timestamp: Date.now() } };
        console.log('Broadcasting AI action:', actionPayload);
        io.emit('ai_action', actionPayload); // Broadcast to all clients
        // Replace simulation with actual AI action triggers
    };
    // Send a simulated action periodically for demonstration
    const intervalId = setInterval(sendAIAction, 15000);


    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${socket.id}, Reason: ${reason}`);
      clearInterval(intervalId); // Clean up interval on disconnect
    });
  });

  console.log("Socket.IO server initialized with event handlers");
  return io;
};

// API route handler to integrate Socket.IO with Next.js API routes
// This allows Next.js to manage the HTTP server while Socket.IO attaches to it.
export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");
    // Adapt the existing HTTP server from Next.js
    const httpServer: HttpServer = res.socket.server as any;
    const io = initializeSocketIO(httpServer);
    res.socket.server.io = io;
  } else {
    console.log("Socket.IO server already running.");
  }
  res.end();
}
