import { upload } from './../../utils/upload';
import { verifyToken } from './../../middleware/auth';
import express from 'express';

import {
  getFeedPostsHandler,
  getUserPostsHandler,
  createPostHandler,
  likesPostHandler,
} from './post.controller';

const router = express.Router();

router.get('/', verifyToken, getFeedPostsHandler);
router.get('/:id', verifyToken, getUserPostsHandler);

router.post('/', verifyToken, upload.single('picture'), createPostHandler);

router.patch('/:id/like', verifyToken, likesPostHandler);

export default router;
