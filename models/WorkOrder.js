import mongoose from 'mongoose';

const workOrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  assignedTo: { type: String, required: true },
  asset: { type: String, required: true },
  locationName: { type: String, required: true },
  recurringSchedule: { type: String, default: null },
}, { timestamps: true });

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

export default WorkOrder;
