const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');

const TicketService = {
   purchase: async (cartId, userEmail) => {
    const cart = await Cart.findById(cartId).populate('products.productId');

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    let totalAmount = 0;
    const failedProducts = [];

    for (const item of cart.products) {
      const dbProduct = await Product.findById(item.productId);

      if (!dbProduct || dbProduct.quantity < item.quantity) {
        failedProducts.push({
          productId: item.productId,
          name: dbProduct ? dbProduct.name : 'Producto no encontrado',
        });
      } else {
        totalAmount += dbProduct.price * item.quantity;

        dbProduct.quantity -= item.quantity;
        await dbProduct.save();
      }
    }

    if (failedProducts.length > 0) {
      return { failedProducts };
    }

    const ticket = new Ticket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: userEmail,
    });

    await ticket.save();

    cart.products = [];
    await cart.save();

    return { success: true, ticket };
  }
};

module.exports = TicketService;
