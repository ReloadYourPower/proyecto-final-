
const Cart = require('../../models/Cart');

class CartDAO {
  async getCartByUserId(userId) {
    return await Cart.findOne({ user: userId }).populate('products');
  }

  async addProductToCart(userId, product) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }
    cart.products.push(product);
    return await cart.save();
  }

  async removeProductFromCart(userId, productId) {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.products = cart.products.filter(product => product._id.toString() !== productId);
      return await cart.save();
    }
    return null;
  }

  async clearCart(userId) {
    return await Cart.findOneAndUpdate({ user: userId }, { products: [] });
  }
}

module.exports = new CartDAO();
