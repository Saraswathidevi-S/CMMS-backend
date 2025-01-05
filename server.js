// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import workOrderRoutes from './routes/workOrders.js';  // Import using ES6 import syntax

import assetRoutes from './routes/assets.js';
import maintenanceRoutes from './routes/maintenance.js';
import dashboardRoutes from './routes/dashboard.js';
import partsRoutes from './routes/parts.js';
import purchaseOrderRoutes from './routes/purchaseOrders.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/work-orders', workOrderRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/parts', partsRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
