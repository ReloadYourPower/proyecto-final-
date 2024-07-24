const Cart = require('../models/Cart');
const Product = require('../models/Product');

const TicketService = require('../services/ticketService');

// const purchaseCart = async (req, res) => {
//   try {
//       const { cid } = req.params; // Se obtiene el ID del carrito desde los parámetros
//       const result = await TicketService.purchase(cid, req.user.email); // Se llama al método purchase del servicio de tickets, pasando el ID del carrito y el correo del usuario
//       if (result.failedProducts && result.failedProducts.length > 0) {
//           return res.status(400).send({ 
//               message: 'No se pudieron procesar algunos productos.',
//               failedProducts: result.failedProducts
//           });
//       }
//       res.send(result); // Se envía el resultado de la compra como respuesta
//   } catch (error) {
//       res.status(400).send({ error: error.message }); // Si ocurre un error, se envía un mensaje de error con el código 400
//   }
// };
const purchaseAndFilterCart = async (req, res) => {
  try {
      const { cid } = req.params; // Obtener el ID del carrito desde los parámetros
      const result = await TicketService.purchase(cid, req.user.email); // Llamar al servicio de compra
      if (result.failedProducts && result.failedProducts.length > 0) {
          // Filtrar los IDs de los productos que no pudieron comprarse
          const failedProductIds = result.failedProducts.map(product => product._id);

          // Obtener el carrito del usuario
          let cart = await Cart.findOne({ user: req.user._id });

          if (!cart) {
              return res.status(404).send('Carrito no encontrado');
          }

          // Filtrar los productos que no se pudieron comprar
          cart.products = cart.products.filter(productId => failedProductIds.includes(productId));

          // Guardar los cambios en el carrito
          await cart.save();

          // Devolver respuesta exitosa
          return res.send({
              message: 'Compra finalizada. Carrito actualizado correctamente.',
              failedProducts: result.failedProducts
          });
      }

      // En caso de que todos los productos se hayan comprado correctamente
      return res.send({
          message: 'Todos los productos se compraron exitosamente.',
          result
      });
  } catch (error) {
      res.status(400).send({ error: error.message }); // Manejar errores
  }
};


const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Buscar el producto por su ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    // Buscar el carrito del usuario actual
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Si no hay un carrito para este usuario, crear uno nuevo
      cart = new Cart({
        user: req.user._id,
        products: [{
          productId: product._id,
          productName: product.name // Agregar el nombre del producto al carrito
        }]
      });
    } else {
      // Verificar si el producto ya está en el carrito
      const productExists = cart.products.some(item => item.productId.equals(product._id));
      if (productExists) {
        return res.status(400).send('El producto ya está en el carrito');
      }

      // Agregar el nuevo producto al carrito
      cart.products.push({
        productId: product._id,
        productName: product.name // Agregar el nombre del producto al carrito
      });
    }

    // Guardar los cambios en el carrito
    await cart.save();
    res.redirect('/cart'); // Redirigir al carrito después de agregar el producto
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
};

const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products');
    res.render('cart', { cart });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

const updateCart = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Verificar si el producto está en el carrito
    const cartProduct = cart.products.find(item => item.product.toString() === req.params.productId);

    if (!cartProduct) {
      return res.status(404).send('Producto no encontrado en el carrito');
    }

    // Actualizar la cantidad del producto
    cartProduct.quantity = quantity;
    await cart.save();

    res.redirect('/cart'); // Redirigir al carrito después de modificar
  } catch (error) {
    console.error('Error al modificar la cantidad del producto en el carrito:', error);
    res.status(500).send('Error al modificar la cantidad del producto en el carrito');
  }
}

const deleteCart =  async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Filtrar los productos para excluir el que se quiere eliminar
    cart.products = cart.products.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();

    res.redirect('/cart'); // Redirigir al carrito después de eliminar
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).send('Error al eliminar el producto del carrito');
  }
};


module.exports = {
  addToCart, viewCart,updateCart,deleteCart,purchaseAndFilterCart
}
