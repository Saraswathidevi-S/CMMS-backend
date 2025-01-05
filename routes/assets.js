import express from 'express';
import Asset from '../models/Asset.js';

const router = express.Router();

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create asset
router.post('/', async (req, res) => {
  const asset = new Asset({
    ...req.body,
    lastMaintenance: req.body.lastMaintenance || null,
    nextMaintenance: req.body.nextMaintenance || null
  });
  
  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update asset
router.put('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete asset
router.delete('/:id', async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;