import mongoose from 'mongoose';

const maintenanceScheduleSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    required: true
  },
  lastCompleted: {
    type: Date
  },
  nextDue: {
    type: Date,
    required: true
  },
  tasks: [{
    type: String
  }],
  assignedTo: {
    type: String,
    required: true
  }
});

export default mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);