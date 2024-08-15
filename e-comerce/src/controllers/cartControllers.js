const Cart = require('../models/Cart');
const Product = require('../models/Product');
const TicketService = require('../services/ticketService');
// funcion complementaria para buscar el valor de los productos
const getProductValueById = async (productId) => {
  try {
    // Busca el producto por su ID
    const product = await Product.findById(productId);
    if (!product) {
      console.warn(`Producto no encontrado con ID: ${productId}`);
      return 0; // Retorna 0 si el producto no se encuentra
    }

    // Asegúrate de que el precio sea un número
    const price = parseFloat(product.price);
    if (isNaN(price)) {
      console.warn(`Precio no válido para el producto con ID: ${productId}, valor: ${product.price}`);
      return 0; // Retorna 0 si el precio no es un número válido
    }

    return price; // Retorna el precio del producto
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return 0; // Retorna 0 en caso de error
  }
};


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
// const purchaseAndFilterCart = async (req, res) => {
//   try {
//       const { cid } = req.params; // Obtener el ID del carrito desde los parámetros
//       const result = await TicketService.purchase(cid, req.user.email); // Llamar al servicio de compra
//       if (result.failedProducts && result.failedProducts.length > 0) {
//           // Filtrar los IDs de los productos que no pudieron comprarse
//           const failedProductIds = result.failedProducts.map(product => product._id);

//           // Obtener el carrito del usuario
//           let cart = await Cart.findOne({ user: req.user._id });

//           if (!cart) {
//               return res.status(404).send('Carrito no encontrado');
//           }

//           // Filtrar los productos que no se pudieron comprar
//           cart.products = cart.products.filter(productId => failedProductIds.includes(productId));

//           // Guardar los cambios en el carrito
//           await cart.save();

//           // Devolver respuesta exitosa
//           return res.send({
//               message: 'Compra finalizada. Carrito actualizado correctamente.',
//               failedProducts: result.failedProducts
//           });
//       }

//       // En caso de que todos los productos se hayan comprado correctamente
//       res.redirect('/profile/payment');
//   } catch (error) {
//       res.status(400).send({ error: error.message }); // Manejar errores
//   }
// };
const purchaseAndFilterCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await TicketService.purchase(cid, req.user.email);

    if (Array.isArray(result.failedProducts) && result.failedProducts.length > 0) {
      const failedProductIds = result.failedProducts.map(product => product.productId.toString());

      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).send('Carrito no encontrado');
      }

      if (Array.isArray(cart.products)) {
        cart.products = cart.products.filter(item => !failedProductIds.includes(item.productId.toString()));

        cart.products.forEach(product => {
          const { quantity, productId } = product;
          if (isNaN(quantity) || typeof quantity !== 'number') {
            console.error(`Invalid quantity detected:`, {
              productId,
              quantity,
              product,
              user: req.user._id
            });
            throw new Error(`Invalid quantity value for product ${productId}: ${quantity}`);
          }
        });

        await cart.save();
        return res.send({
          message: 'Compra finalizada. Carrito actualizado correctamente.',
          failedProducts: result.failedProducts
        });
      } else {
        throw new Error('Cart products is not an array');
      }
    }

    res.redirect('/profile/payment');
  } catch (error) {
    const { cid } = req.params;
    console.error('Error during purchase:', {
      message: error.message,
      stack: error.stack,
      user: req.user._id,
      cartId: cid
    });
    res.status(400).send({ error: error.message });
  }
};



const addToCart = async (req, res) => {
  
  try {
    const userId = req.user._id; // Asegúrate de que req.user._id esté disponible y correctamente asignado
    const productId = req.body.productId;

   
    // Verifica si ya existe un carrito para el usuario
    let cart = await Cart.findOne({ user: userId }).populate('products.productId');
  

    if (!cart) {
      // Si no existe, crea un nuevo carrito
      cart = new Cart({ user: userId, products: [] })
    }

    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, podrías actualizar la cantidad
      cart.products[existingProductIndex].quantity += 1;
    } else {
      // Si no está, agrega el nuevo producto
      const product = await Product.findById(productId);
     

      if (product) {
        cart.products.push({
          productId: product._id,
          productName: product.name,
          quantity: 1, // Establece la cantidad inicial
        });

      } else {
        req.flash('error_msg', 'Product not found');

        return res.redirect('/profile/products');
      }
    }

    // Guarda el carrito actualizado
    await cart.save();

    req.flash('success_msg', 'Product added to cart');
    
    res.redirect('/profile/products');
  } catch (err) {
    req.flash('error_msg', 'Error adding product to cart');
    res.redirect('/profile/products');
  }
};

const viewCart = async (req, res) => {
  try {
    
    const userId = req.user._id; // Asegúrate de que req.user._id está disponible y correctamente asignado
    
    const cart = await Cart.findOne({ user: userId }).populate('products.productId');

    if (!cart || cart.products.length === 0) {
      req.flash('error_msg', 'No items in the cart');
      return res.redirect('/profile/products');
    }

    // Mapea los productos para extraer sus detalles desde `productId`
    const productsWithDetails = cart.products.map(item => {
      return {
        productId: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
      };
    });


    // Renderiza la vista con los productos detallados
    res.render('cart', { cart: { ...cart.toObject(), products: productsWithDetails } });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

const updateCart = async (req, res) => {
  
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    let { quantity } = req.body;
    const value = await getProductValueById(productId);
    console.log("-------------------",value);
    

    // Asegúrate de que quantity esté definido
    if (quantity === undefined || quantity === null) {
      console.log(
      'La cantidad proporcionada no es válida o está ausente.'
      );
    }

    // Convertir quantity a número
    const quantity1 = +quantity;

    // Verificar si la conversión fue exitosa y que quantity sea un número válido
    if (isNaN(quantity1) || typeof quantity1 !== 'number' || quantity1 <= 0) {
      return res.status(400).json({
        error: 'La cantidad proporcionada no es un número válido.'
      });
    }

    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ user: userId });
    console.log('Found cart:', cart);

    if (!cart) {
      req.flash('error_msg', 'Cart not found');
      console.log('Cart not found for user:', userId);
      return res.redirect('/profile/cart');
    }

    // Buscar el producto en el carrito
    const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    console.log('Product index in cart:', productIndex);

    if (productIndex === -1) {
      req.flash('error_msg', 'Product not found in cart');
      console.log('Product not found in cart:', productId);
      return res.redirect('/profile/cart');
    }

    // Actualizar la cantidad y el precio
    cart.products[productIndex].quantity = quantity1;
    cart.products[productIndex].value = value;
    await cart.save();
    console.log('Updated cart:', cart);

    req.flash('success_msg', 'Product quantity updated');
    res.redirect('/profile/cart');
  } catch (err) {
    console.error('Error updating cart:', err);
    req.flash('error_msg', 'Error updating cart');
    res.redirect('/profile/cart');
  }
};



const deleteCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    console.log('Deleting product from cart for user:', userId);
    console.log('Product ID to delete:', productId);
    console.log('Request body:', req.body); // Log del cuerpo de la solicitud

    const cart = await Cart.findOne({ user: userId });
    console.log('Found cart:', cart);

    if (!cart) {
      console.log('Cart not found for user:', userId);
      console.console.error();
    
      res.redirect('/profile/cart');
    }

    // Filtrar los productos para excluir el que se quiere eliminar
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
    console.log('Updated cart after deletion:', cart.products);

    await cart.save();
    res.redirect('/profile/cart'); // Redirigir al carrito después de eliminar
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).send('Error al eliminar el producto del carrito');
  }
};


module.exports = {
  addToCart, viewCart,updateCart,deleteCart,purchaseAndFilterCart
}
