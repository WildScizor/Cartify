import { Router } from 'express';
import { Cart } from '../models/index.js';

const router = Router();

/**
 * Robust User ID helper.
 * Now strictly requires an ID from the request object or body.
 */
const getUserId = (req) => {
    const id = req.user?.id || req.body?.userId;
    if (!id) throw new Error("User ID is missing.");
    return id;
};

// GET /api/cart
router.get('/', async (req, res) => {
    try {
        const userId = getUserId(req);
        
        // Safety check for language header strings
        const rawLang = req.headers['accept-language'] || 'en';
        const lang = rawLang.split(',')[0].split('-')[0].toLowerCase();

        const data = await Cart.getTranslatedCart(userId, lang);
        res.json(data);
    } catch (error) {
        console.error("GET Cart Error:", error.message);
        const status = error.message === "User ID is missing." ? 401 : 500;
        res.status(status).json({ message: error.message });
    }
});

// POST /api/cart/add
router.post('/add', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = getUserId(req);

        if (!itemId) return res.status(400).json({ message: "itemId is required" });

        const cart = await Cart.getOrCreateCart(userId);
        await cart.addItem(itemId, quantity || 1);
        
        res.json({ message: 'Item added successfully' });
    } catch (error) {
        console.error("ADD to Cart Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST /api/cart/update
router.post('/update', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = getUserId(req);

        const cart = await Cart.getOrCreateCart(userId);
        await cart.updateItemQuantity(itemId, quantity);
        res.json({ message: 'Quantity updated' });
    } catch (error) {
        console.error("UPDATE Cart Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST /api/cart/remove
router.post('/remove', async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = getUserId(req);

        const cart = await Cart.getOrCreateCart(userId);
        await cart.removeItem(itemId);
        res.json({ message: 'Item removed' });
    } catch (error) {
        console.error("REMOVE from Cart Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;