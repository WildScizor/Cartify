import { Router } from 'express';
import { Item } from '../models/index.js';
import mongoose from 'mongoose';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const lang = req.headers['accept-language'] || 'en';
    const { search, category } = req.query;
    
    // 1. Fetch English items from 'items' collection
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const rawItems = await Item.find(query).lean(); 

    // 2. Fetch all translations from the 'translations' collection
    const db = mongoose.connection.db;
    const allTranslations = await db.collection('translations').find({}).toArray();

    // 3. Overwrite English titles with translations
    const items = rawItems.map(item => {
      // Find the translation object where the "en" field matches the DB title
      const translationEntry = allTranslations.find(t => t.en === item.title);
      
      return {
        ...item,
        // Use the requested language field from the translation entry, or fallback to English
        title: (translationEntry && translationEntry[lang]) ? translationEntry[lang] : item.title,
        id: item._id.toString()
      };
    });

    res.json({ items });
  } catch (error) {
    console.error("Translation Overwrite Failed:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;