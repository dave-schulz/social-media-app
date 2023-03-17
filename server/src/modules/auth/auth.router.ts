import { verifyToken } from './../../middleware/auth';
import express from 'express';
import { loginHandler } from './auth.controller';

const router = express.Router();

router.post('/login', verifyToken, loginHandler);

export default router;
