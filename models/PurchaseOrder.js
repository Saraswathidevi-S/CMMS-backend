import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  supplier: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'ordered', 'received'],
    default: 'draft'
  },
  items: [{
    part: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  requestedBy: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  expectedDelivery: {
    type: Date
  },
  notes: String
});

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);