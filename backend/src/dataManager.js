// dataManager.js

const fs = require("fs");

const path = require("path");

class DataManager {
  constructor() {
    this.orders = [];
    this.products = [];
    this.childParentProductMapping = {};
  }

  loadOrdersData(orderDate) {
    this.orders = orderDate
      ? this.filterOrdersByDate(orderDate)
      : JSON.parse(
          fs.readFileSync(path.join(__dirname, "orders.json"), "utf-8")
        );
  }

  loadProductsData() {
    this.products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
    );
  }

  loadChildParentProductMapping() {
    this.childParentProductMapping = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "childParentProductMappings.json"),
        "utf-8"
      )
    );
  }

  getOrders() {
    return this.orders;
  }

  filterOrdersByDate(orderDate) {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "orders.json"), "utf-8")
    ).filter((ele) => ele.order_date === orderDate);
  }

  getChildProductsForBox(box) {
    return this.childParentProductMapping.filter(
      (ele) => ele.product_id === box
    );
  }

  getProductById(productId) {
    return this.products.find((product) => product.product_id === productId);
  }
}

module.exports = DataManager;
