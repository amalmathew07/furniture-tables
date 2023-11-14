const express = require('express');
const cors = require('cors');

const WarehouseAutomation = require('./warehouseManager.js');
const DataManager = require('./dataManager');

const app = express();
app.use(cors());

app.get('/api/warehouse', (req, res) => {
  const orderDate = req.query.orderDate;
  const warehouseAutomation = new WarehouseAutomation(new DataManager(), orderDate);
  const pickingList = warehouseAutomation.generatePickingList();
  const packingList = warehouseAutomation.generatePackingList();

  res.json({ pickingList, packingList });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is newly running on port ${PORT}`);
});
