import express from 'express';
import { getUsers, getUserConversations } from '../controllers/users';
const router = express.Router();

router.get('/', getUsers);
router.get('/:email/', getUserConversations);

export default router;