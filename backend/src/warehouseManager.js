const PackingTeamAutomation = require("./PackingJob");
const PickingTeamAutomation = require("./PickingJob");

class WarehouseAutomation {
  constructor(dataManager, orderDate) {
    this.dataManager = dataManager;
    this.orderDate = orderDate;

    this.dataManager.loadOrdersData(orderDate);
    this.dataManager.loadChildParentProductMapping();
    this.dataManager.loadProductsData();
  }

  generatePackingList() {
    const packingTeamAutomation = new PackingTeamAutomation(this.dataManager);
    const packingList = packingTeamAutomation.generatePackingList();
    return packingList;
  }

  generatePickingList() {
    const pickingTeamAutomation = new PickingTeamAutomation(this.dataManager);
    const pickingList = pickingTeamAutomation.generatePickingList();
    return pickingList;
  }
}

module.exports = WarehouseAutomation;
