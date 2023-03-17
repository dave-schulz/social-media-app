import express from 'express';
import { upload } from '../../utils/upload';
import { processRequestBody } from 'zod-express-middleware';
import { registerHandler } from './user.controller';
import { userRegisterSchema } from './user.schema';

const router = express.Router();

router.post(
  '/register',
  [upload.single('picture'), processRequestBody(userRegisterSchema.body)],
  registerHandler,
);

export default router;
