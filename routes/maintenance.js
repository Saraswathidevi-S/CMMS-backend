import express from 'express';
import MaintenanceSchedule from '../models/MaintenanceSchedule.js';

const router = express.Router();

// Get all maintenance schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await MaintenanceSchedule.find()
      .populate('asset')
      .sort({ nextDue: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create maintenance schedule
router.post('/', async (req, res) => {
  const schedule = new MaintenanceSchedule({
    ...req.body,
    lastCompleted: req.body.lastCompleted || null
  });
  
  try {
    const newSchedule = await schedule.save();
    const populatedSchedule = await newSchedule.populate('asset');
    res.status(201).json(populatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update maintenance schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await MaintenanceSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('asset');
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete maintenance schedule
router.delete('/:id', async (req, res) => {
  try {
    await MaintenanceSchedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Maintenance schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;