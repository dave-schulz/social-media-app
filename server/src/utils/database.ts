import mongoose from 'mongoose';
import logger from './logger';

const DB_CONNECTION_STRING = process.env.MONGO_URL || '';

export async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info('Connected to database!');
  } catch (err) {
    logger.error(err, 'failed to connect to database.');
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info('Disconnected from database!');
  return;
}
