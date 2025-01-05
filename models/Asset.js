import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['operational', 'down', 'maintenance'],
    default: 'operational'
  },
  lastMaintenance: {
    type: Date
  },
  nextMaintenance: {
    type: Date
  },
  specifications: {
    type: Map,
    of: String
  }
});

export default mongoose.model('Asset', assetSchema);