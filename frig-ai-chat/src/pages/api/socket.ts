// This file acts as the entry point for the Socket.IO server.
// It ensures the server is initialized and attached to the Next.js HTTP server.
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { initializeSocketIO } from "@/server/socket"; // Adjust path if necessary

// Define a type for the response object that includes the socket server property
type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HttpServer & {
      io?: SocketIOServer;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server via API route...");
    const httpServer: HttpServer = res.socket.server as any;
    const io = initializeSocketIO(httpServer);
    res.socket.server.io = io;
    console.log("Socket.IO server initialized and attached.");
  } else {
    console.log("Socket.IO server already running.");
  }
  res.end();
}

// Important: Disable Next.js body parsing for this route
// Socket.IO handles its own request parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};
