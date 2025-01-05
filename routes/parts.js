import express from 'express';
import Part from '../models/Part.js';

const router = express.Router();

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find().sort({ name: 1 });
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get low stock parts
router.get('/low-stock', async (req, res) => {
  try {
    const parts = await Part.find({
      $expr: {
        $lte: ['$currentStock', '$minStockLevel']
      }
    });
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create part
router.post('/', async (req, res) => {
  const part = new Part(req.body);
  try {
    const newPart = await part.save();
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update part
router.put('/:id', async (req, res) => {
  try {
    const part = await Part.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete part
router.delete('/:id', async (req, res) => {
  try {
    await Part.findByIdAndDelete(req.params.id);
    res.json({ message: 'Part deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;