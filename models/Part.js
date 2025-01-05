import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  currentStock: {
    type: Number,
    required: true,
    default: 0
  },
  minStockLevel: {
    type: Number,
    required: true,
    default: 0
  },
  unitPrice: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  lastRestocked: {
    type: Date
  }
});

export default mongoose.model('Part', partSchema);