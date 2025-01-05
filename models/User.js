// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Optional email field
  role: { type: String, required: true, enum: ['Admin', 'Requester', 'Technician'], default: 'Requester' }, // Default role
});

export default mongoose.model('User', userSchema);
