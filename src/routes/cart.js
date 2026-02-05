import { Router } from 'express';
import { Cart } from '../models/index.js';
import { requireAuth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const lang = req.headers['accept-language'] || 'en';
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.itemId');
    if (!cart) return res.json({ items: [], total: 0 });

    const translationDoc = await mongoose.connection.db.collection('translations').findOne({});

    const detailedItems = cart.items.map(ci => {
      if (!ci.itemId) return null;
      const product = ci.itemId.toObject();
      const dbTitle = product.title; 
      const localizedSet = translationDoc ? translationDoc[dbTitle] : null;

      return {
        quantity: ci.quantity,
        product: {
          ...product,
          title: (localizedSet && localizedSet[lang]) ? localizedSet[lang] : dbTitle,
          // FIX: Ensure 'id' exists for React keys
          id: product._id.toString(),
          _id: product._id
        }
      };
    }).filter(Boolean);

    const total = detailedItems.reduce((acc, it) => acc + (it.product.price * it.quantity), 0);
    res.json({ items: detailedItems, total });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;