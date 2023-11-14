class PickingTeamAutomation {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  generatePickingList() {
    const pickingList = {};

    this.dataManager.getOrders().forEach((order) => {
      order.line_items.forEach((lineItem) => {
        const lineItemMappings = this.dataManager.getChildProductsForBox(lineItem.product_id);
        lineItemMappings.forEach((subItem) => {
            const key = subItem.name; // Assuming 'name' is the property you want to use
            pickingList[key] = (pickingList[key] || 0) + lineItem.quantity;
        });
      });
    });

    return pickingList;
  }
}
module.exports = PickingTeamAutomation;
