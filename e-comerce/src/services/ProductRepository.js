const ProductDAO = require('../daos/ProductDAO');

class ProductRepository {
    async getAllProducts() {
        return await ProductDAO.getAll();
    }

    // Otros métodos de negocio
}

module.exports = new ProductRepository();
