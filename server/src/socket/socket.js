import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

// Initialize Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'], // Allow requests from this origin
        methods: ["GET", "POST"], // Allow these HTTP methods
    }
});

// Function to get the socket ID of a receiver by their user ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// Map to store user IDs and their corresponding socket IDs
const userSocketMap = {}; // { userId: socketId }

// Event listener for new connections
io.on("connection", (socket) => {
    // Extract user ID from the query parameters
    const userId = socket.handshake.query.userId;

    // If user ID is valid, store the socket ID in the map
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // Emit an event to all clients with the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Event listener for disconnections
    socket.on("disconnect", () => {
        // Remove the user from the map on disconnect
        delete userSocketMap[userId];

        // Emit an event to all clients with the updated list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the Express app, HTTP server, and Socket.IO server
export { app, server, io };
