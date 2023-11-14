class PackingTeamAutomation {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  generatePackingList() {
    const packingList = [];

    this.dataManager.getOrders().forEach((order) => {
      const orderDetails = {
        orderNumber: order.order_id,
        orderDate: order.order_date,
        lineItems: [],
        customerName: order.customer_name,
        shippingAddress: order.shipping_address,
      };

      order.line_items.forEach((lineItem) => {
        const product = this.dataManager.getProductById(lineItem.product_id);
        const lineItemDetails = {
          parentItem: product.product_name,
          childItems: [],
        };

        const lineItemMappings = this.dataManager.getChildProductsForBox(
          product.product_id
        );
        lineItemMappings.forEach((subItem) => {
          lineItemDetails.childItems.push({
            name: subItem.name,
            quantity: lineItem.quantity * subItem.quantity,
          });
        });

        orderDetails.lineItems.push(lineItemDetails);
      });

      packingList.push(orderDetails);
    });

    return packingList;
  }
}

module.exports = PackingTeamAutomation;
