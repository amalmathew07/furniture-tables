const PackingJob = require("./PackingJob");
const PickingJob = require("./PickingJob");

// An automation class which initiates picking and packing
class WarehouseAutomation {
  // Inject datamanager as dependency
  constructor(dataManager, orderDate) {
    this.dataManager = dataManager;
    this.orderDate = orderDate;

    this.dataManager.loadOrdersData(orderDate);
    this.dataManager.loadChildParentProductMapping();
    this.dataManager.loadProductsData();
  }

  // Generate packing list
  generatePackingList() {
    const packingJob = new PackingJob(this.dataManager);
    const packingList = packingJob.generatePackingList();
    return packingList;
  }

  // Generate picking list
  generatePickingList() {
    const pickingJob = new PickingJob(this.dataManager);
    const pickingList = pickingJob.generatePickingList();
    return pickingList;
  }
}

module.exports = WarehouseAutomation;
