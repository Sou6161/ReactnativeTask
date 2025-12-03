import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import pool, { testConnection } from './config/database';
import categoriesRouter from './routes/categories';
import eventsRouter from './routes/events';
import offersRouter from './routes/offers';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint with database status
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      database: dbConnected ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      database: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// API Routes - Connected to PostgreSQL database
app.use('/api/categories', categoriesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/offers', offersRouter);

// Get users (for "Where is Everyone" feature)
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, username, full_name, avatar_url
      FROM users
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 20
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server - listen on all network interfaces (0.0.0.0)
const startServer = async () => {
  try {
    // Test database connection before starting server
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.warn('⚠️  Database connection failed, but server will start anyway');
      console.warn('⚠️  Make sure to create the database and run the schema.sql file');
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 Server is running on:`);
      console.log(`   - Local:   http://localhost:${PORT}`);
      console.log(`   - Network: http://192.168.1.10:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📝 Next steps:`);
      console.log(`   1. Create database 'sawa_app' in pgAdmin`);
      console.log(`   2. Run backend/database/schema.sql in pgAdmin`);
      console.log(`   3. Set DB_PASSWORD in backend/.env file\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
