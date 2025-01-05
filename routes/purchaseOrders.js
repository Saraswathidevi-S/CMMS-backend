import express from 'express';
import PurchaseOrder from '../models/PurchaseOrder.js';

const router = express.Router();

// Get all purchase orders
router.get('/', async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('items.part')
      .sort({ requestDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create purchase order
router.post('/', async (req, res) => {
  const order = new PurchaseOrder({
    ...req.body,
    orderNumber: `PO-${Date.now()}`,
    requestDate: new Date()
  });
  
  try {
    const newOrder = await order.save();
    const populatedOrder = await newOrder.populate('items.part');
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update purchase order
router.put('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('items.part');
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete purchase order
router.delete('/:id', async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;