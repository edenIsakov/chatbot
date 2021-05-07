import express from 'express';
import { getUsers, getUserMessages } from '../controllers/users';
const router = express.Router();

router.get('/', getUsers);
router.get('/:email', getUserMessages);

export default router;