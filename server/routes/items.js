import express from 'express';
import {
  getItems,
  addItem,
  updateItems,
} from '../controllers/itemsControllers.js';

const router = express.Router();

router.get('/', getItems);
router.post('/add', addItem);
router.post('/updateItems', updateItems);

export default router;
