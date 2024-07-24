const Product = require('../models/Product');



module.exports = {
  checkStock : async (req, res, next) => {
    try {
      const { products } = req.body; // Suponiendo que los productos estén en req.body.products
  
      // Recorre cada producto en el carrito y verifica el stock
      for (const product of products) {
        const { productId, quantity } = product;
  
        // Busca el producto en la base de datos por su ID
        const dbProduct = await Product.findById(productId);
  
        if (!dbProduct) {
          return res.status(404).send(`Producto con ID ${productId} no encontrado`);
        }
  
        // Verifica si hay suficiente stock
        if (dbProduct.stock < quantity) {
          return res.status(400).send(`No hay suficiente stock para el producto ${dbProduct.name}`);
        }
      }
  
      // Si todos los productos tienen suficiente stock, continúa con la compra
      next();
    } catch (error) {
      console.error('Error al verificar stock:', error);
      res.status(500).send('Error al verificar stock');
    }
  },
}
