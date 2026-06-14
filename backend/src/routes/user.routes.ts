import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/favorites/:eventId', authMiddleware, userController.toggleFavorite);
router.get('/favorites', authMiddleware, userController.getFavorites);

export default router;
