class PickingJob {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  // Picking job: Looping through the orders and calculating the number of items
  // per order by mapping with the child relationship data model
  generatePickingList() {
    const pickingList = {};

    this.dataManager.getOrders().forEach((order) => {
      order.line_items.forEach((lineItem) => {
        const lineItemMappings = this.dataManager.getChildProductsForBox(lineItem.product_id);
        lineItemMappings.forEach((subItem) => {
          const itemId = subItem.id;
          const itemName = subItem.name;

          if (!pickingList[itemId]) {
            pickingList[itemId] = { name: itemName, quantity: 0 };
          }

          pickingList[itemId].quantity += lineItem.quantity;
        });
      });
    });

    return pickingList;
  }
}

module.exports = PickingJob;
