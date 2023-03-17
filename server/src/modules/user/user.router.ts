import express from 'express';
import { verifyToken } from '../../middleware/auth';
import {
  getUserHandler,
  getUserFriendsHandler,
  addRemoveFriendHandler,
} from './user.controller';

const router = express.Router();

router.get('/:id', verifyToken, getUserHandler);
router.get('/:id/friends', verifyToken, getUserFriendsHandler);

router.patch('/:id/:friendId', verifyToken, addRemoveFriendHandler);

export default router;
