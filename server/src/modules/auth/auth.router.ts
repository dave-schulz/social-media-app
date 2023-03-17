import express from 'express';
import { loginHandler } from './auth.controller';

const router = express.Router();

router.post('/login', loginHandler);

export default router;
