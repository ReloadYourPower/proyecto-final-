const CartDAO = require('../dao/implementations/cartDAO');

class CartService {
  async addToCart(userId, productId) {
    return await CartDAO.addProductToCart(userId, productId);
  }

  async viewCart(userId) {
    return await CartDAO.getCartByUserId(userId);
  }
}

module.exports = new CartService();
