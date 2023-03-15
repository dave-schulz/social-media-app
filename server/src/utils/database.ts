import mongoose from 'mongoose';
import logger from './logger';

const MONGO_URL_STRING = process.env.MONGO_URL || '';

export async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL_STRING);
    logger.info('Database is connected!');
  } catch (err) {
    logger.error(err, 'failed to connect to database.');
    process.exit();
  }
}
