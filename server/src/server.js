// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import i18n from 'i18n';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Custom middleware for handling errors
import connectDB from './config/db.js'; // Function to connect to the database
import userRoutes from './routes/userRoutes.js'; // User-related routes
import messageRoutes from './routes/messageRoutes.js'; // Message-related routes
import postRoutes from './routes/postRoutes.js'; // Post-related routes
import { app, server } from './socket/socket.js'; // Socket.io configuration
import scheduleCronJobs from './cron/cronToken.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Internationalization (i18n) configuration
i18n.configure({
  locales: ['en', 'mk', 'al', 'tr'], // Supported languages
  directory: './locales', // Directory containing translation files
  defaultLocale: 'en', // Default language
  cookie: 'lang', // Name of the cookie to store the language preference
});

// Initialize i18n middleware
app.use(i18n.init);

// Middleware to make the i18n __() function available in all routes
app.use((req, res, next) => {
  res.locals.__ = res.__ = req.__;
  next();
});

// Route handlers
app.use('/api/users', userRoutes); // User routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/messages', messageRoutes); // Message routes

// Root route for testing server availability
app.get('/', (req, res) => {
  res.send('Hello');
});

// Custom middleware for handling 404 errors
app.use(notFound);

// Custom middleware for handling errors
app.use(errorHandler);

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

scheduleCronJobs();