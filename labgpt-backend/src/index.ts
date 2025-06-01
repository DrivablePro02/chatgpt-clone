import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { requireAuth } from './middleware/auth';
import chatRoutes from './routes/chat';
import { logger } from './utils/logger';
import { ensureDirs } from './utils/ensureDirs';
import { connectDB } from './utils/db';

// Ensure required directories exist
ensureDirs();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Routes
app.use('/api/chat', requireAuth, chatRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDB().then(() => {
  // Start server
  const PORT = config.port;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}).catch(error => {
  logger.error('Failed to start server:', error);
  process.exit(1);
}); 