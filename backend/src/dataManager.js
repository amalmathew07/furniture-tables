const fs = require("fs");

const path = require("path");

// Data manager class which loads the data and return based on the request
// Basically equivalent to a database connector
class DataManager {
  constructor() {
    this.orders = [];
    this.products = [];
    this.childParentProductMapping = {};
  }

  // Loads order data
  loadOrdersData(orderDate) {
    this.orders = orderDate
      ? this.filterOrdersByDate(orderDate)
      : JSON.parse(
          fs.readFileSync(path.join(__dirname, "../datamodels/orders.json"), "utf-8")
        );
  }

  // Loads product data
  loadProductsData() {
    this.products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../datamodels/products.json"), "utf-8")
    );
  }

  // Loads child parent mapping data
  loadChildParentProductMapping() {
    this.childParentProductMapping = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../datamodels/childParentProductMappings.json"),
        "utf-8"
      )
    );
  }

  getOrders() {
    return this.orders;
  }

  // Getting order by given date
  filterOrdersByDate(orderDate) {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "../datamodels/orders.json"), "utf-8")
    ).filter((ele) => ele.order_date === orderDate);
  }

  // getting child products
  getChildProductsForBox(id) {
    return this.childParentProductMapping.filter(
      (ele) => ele.product_id.includes(id)
    );
  }

  // Getting product by id
  getProductById(productId) {
    return this.products.find((product) => product.product_id === productId);
  }
}

module.exports = DataManager;
