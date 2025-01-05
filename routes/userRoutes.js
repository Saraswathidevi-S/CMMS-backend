import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUserRole } from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper function to check if the user is an admin
const checkAdminRole = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }
  next();
};

// Protect the routes with authentication middleware
router.get('/users', authenticateUser, checkAdminRole, getUsers); // Admin can view users
router.post('/users', authenticateUser, checkAdminRole, createUser); // Admin can create users
router.put('/users/:id', authenticateUser, checkAdminRole, updateUser); // Admin can update users
router.delete('/users/:id', authenticateUser, checkAdminRole, deleteUser); // Admin can delete users

// Get the role of the authenticated user
router.get('/role', authenticateUser, getUserRole);

export default router;
