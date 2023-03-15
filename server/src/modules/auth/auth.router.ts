import express from 'express';
import { registerHandler } from './auth.controller';
import { upload } from '../../utils/upload';

const router = express.Router();

router.post('/', upload.single('picture'), registerHandler);

export default router;
