import mongoose from 'mongoose';
import dns from 'node:dns';

// Fix DNS querySrv ECONNREFUSED for MongoDB Atlas SRV lookups on certain cloud environments & Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported in environment
}

let cachedConnection = null;

export const connectDatabase = async () => {
  // If connection is already open, reuse it immediately (critical for Vercel Serverless)
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (cachedConnection) {
    await cachedConnection;
    return true;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables. Make sure it is added in your Vercel Project Settings.');
    return false;
  }

  try {
    cachedConnection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    const conn = await cachedConnection;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    cachedConnection = null;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};
