import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js'; // Assume middleware checks for admin permissions
import { User } from '../models/User.js'; // Assume you have a User model

const router = express.Router();

// Endpoint for assigning roles
router.post('/assign-role', verifyToken, isAdmin, async (req, res) => {
  const { userId, role } = req.body;

  if (!['Admin', 'Requester', 'Technician'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Role assigned successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning role', error: error.message });
  }
});

// Endpoint for fetching user's role
router.get('/role', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming the user's ID is in the token
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error: error.message });
  }
});

export default router;
