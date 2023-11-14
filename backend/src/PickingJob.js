class PickingJob {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  // Picking job: Looping through the orders and calculating the number of items
  // per order by mapping with the child relation ship data model
  generatePickingList() {
    const pickingList = {};

    this.dataManager.getOrders().forEach((order) => {
      order.line_items.forEach((lineItem) => {
        const lineItemMappings = this.dataManager.getChildProductsForBox(lineItem.product_id);
        lineItemMappings.forEach((subItem) => {
            pickingList[subItem.name] = (pickingList[subItem.name] || 0) + lineItem.quantity;
        });
      });
    });

    return pickingList;
  }
}
module.exports = PickingJob;
