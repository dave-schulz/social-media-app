import express from 'express';
import { userRegisterSchema } from './../user/user.schema';
import { UserLoginSchema } from './auth.schema';
import { processRequestBody } from 'zod-express-middleware';
import { loginHandler } from './auth.controller';
import { registerHandler } from './auth.controller';
import { upload } from '../../utils/upload';

const router = express.Router();

router.post(
  '/register',
  [upload.single('picture'), processRequestBody(userRegisterSchema.body)],
  registerHandler,
);

router.post('/login', processRequestBody(UserLoginSchema.body), loginHandler);

export default router;
