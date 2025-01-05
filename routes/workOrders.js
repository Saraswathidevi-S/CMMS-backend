import express from 'express';
import WorkOrder from '../models/WorkOrder.js';  // ES6 import

const router = express.Router();

// POST route to create a work order
router.post('/', async (req, res) => {
  try {
    // Destructure incoming data from the request body
    const { title, description, startDate, dueDate, priority, assignedTo, asset, locationName, recurringSchedule } = req.body;

    // Create a new work order document
    const newWorkOrder = new WorkOrder({
      title,
      description,
      startDate,
      dueDate,
      priority,
      assignedTo,
      asset,
      locationName,
      recurringSchedule,
    });

    // Save the work order
    await newWorkOrder.save();
    res.status(201).json({ message: 'Work Order created successfully', data: newWorkOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating work order', error: err.message });
  }
});

// GET route to fetch all work orders
router.get('/', async (req, res) => {
  try {
    // Fetch all work orders from the database
    const workOrders = await WorkOrder.find();

    // Return the work orders as a response
    res.status(200).json(workOrders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching work orders', error: err.message });
  }
});


export default router;
