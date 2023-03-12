import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

import { register } from './controllers/auth';

// Configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Register route with upload function
app.post('/auth/register', upload.single('picture'), register);

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Mongoose setup
const PORT = process.env.PORT || 6001;

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server Port: ${PORT}`);
});

const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    await disconnectFromDatabase();

    // Disconnect from database connection
    logger.info('The work of the server is done!');
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) gracefulShutdown(signals[i]);
