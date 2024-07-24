const ProductDAO = require('../dao/implementations/productDAO');

class ProductService {
  async getProducts() {
    return await ProductDAO.getAllProducts();
  }

  async addProduct(productData) {
    return await ProductDAO.addProduct(productData);
  }
}

module.exports = new ProductService();
