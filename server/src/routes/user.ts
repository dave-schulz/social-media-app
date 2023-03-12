import express from 'express';
import { getUser, getUserFriends, AddRemoveFriend } from '../controllers/users';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// READ
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

// UPDATE
router.patch('/:id/:friendId', verifyToken, AddRemoveFriend);

export default router;
