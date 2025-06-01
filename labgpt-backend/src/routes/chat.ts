import { Router } from 'express';
import { sendMessage, getConversations, getConversation } from '../controllers/chatController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// Chat routes
router.post('/message', sendMessage);
router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);

export default router;