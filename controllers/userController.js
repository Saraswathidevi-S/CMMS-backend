import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Validate input
    if (!username || !password || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    // Validate input
    if (!username || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Fetch the role of the authenticated user
export const getUserRole = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `authenticateUser` sets `req.user`
    const user = await User.findById(userId, 'role'); // Only fetch the `role` field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user role', error: error.message });
  }
};
