import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register user
export const registerUser = async (req, res) => {
  const { username, password, email, role = 'Requester' } = req.body; // Default role is 'Requester'
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role, // Assign the role
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, role: newUser.role }); // Include role in the response
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role }); // Include role in the response
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
