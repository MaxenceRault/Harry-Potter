
import express from 'express';
import CardController from '../controllers/cardController.js';

const router = express.Router();

router.get('/users/:userId/cards', CardController.getCardsByUserId);
router.post('/users/:userId/cards', CardController.addCardsToUser);

export default router;
