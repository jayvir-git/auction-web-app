import express from 'express';
import {
  getItems,
  addItem,
  updateItems,
  addUser,
  bkmItem,
} from '../controllers/itemsControllers.js';

const router = express.Router();

router.get('/', getItems);
router.post('/add', addItem);
router.post('/updateItems', updateItems);
router.post('/addUser', addUser);
router.post('/bkmItem', bkmItem);

export default router;
