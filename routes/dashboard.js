import express from 'express';
import WorkOrder from '../models/WorkOrder.js';
import Asset from '../models/Asset.js';
import MaintenanceSchedule from '../models/MaintenanceSchedule.js';
import Part from '../models/Part.js';
import PurchaseOrder from '../models/PurchaseOrder.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalWorkOrders,
      pendingWorkOrders,
      completedWorkOrders,
      totalAssets,
      assetsDown,
      upcomingMaintenance,
      lowStockParts,
      pendingPurchaseOrders
    ] = await Promise.all([
      WorkOrder.countDocuments(),
      WorkOrder.countDocuments({ status: 'pending' }),
      WorkOrder.countDocuments({ status: 'completed' }),
      Asset.countDocuments(),
      Asset.countDocuments({ status: 'down' }),
      MaintenanceSchedule.countDocuments({
        nextDue: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      }),
      Part.countDocuments({
        $expr: { $lte: ['$currentStock', '$minStockLevel'] }
      }),
      PurchaseOrder.countDocuments({ status: { $in: ['draft', 'pending'] } })
    ]);

    res.json({
      totalWorkOrders,
      pendingWorkOrders,
      completedWorkOrders,
      totalAssets,
      assetsDown,
      upcomingMaintenance,
      lowStockParts,
      pendingPurchaseOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // ES6 default export
