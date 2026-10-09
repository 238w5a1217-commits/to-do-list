import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import taskRoutes from '../features/tasks/server/task.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before handling API requests (vital for Vercel Serverless)
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
  } catch (err) {
    console.error('Failed to ensure database connection:', err);
  }
  next();
});

// Request logger for API calls
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.includes('/tasks') || req.originalUrl.includes('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoints
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount feature routes on both /api/tasks and /tasks for Vercel rewrite compatibility
app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

// Centralized error handler
app.use(errorHandler);

export default app;
