import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server and initialize database
const startServer = async () => {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`🚀 SaaS To-Do API Server running on port ${PORT}`);
    console.log(`📡 Endpoints available at http://localhost:${PORT}/api/tasks`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please terminate existing process or use another port.`);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer();
