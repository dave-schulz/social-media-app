import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import path from 'path';
import logger from './utils/logger';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './utils/database';

import authRoutes from './modules/auth/auth.router';
import userRoutes from './modules/user/user.router';
import postRoutes from './modules/post/post.router';

// Configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(express.static('public'));
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Port & Database connection
const PORT = process.env.port || 6000;

app.listen(PORT, async () => {
  connectToDatabase();
  logger.info(`The Server is listening on port: ${PORT}`);
});
