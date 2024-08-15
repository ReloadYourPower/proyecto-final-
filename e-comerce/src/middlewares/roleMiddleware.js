const dotenv = require('dotenv') 
dotenv.config()
const adminJson = JSON.parse(process.env.JWT_SECRET);
const Product = require('../models/Product');
const Cart = require('../models/Cart');

module.exports = {
  ensureAdmin: (req, res, next) => {
    // Tiempo en milisegundos para 10 minutos
    const TEN_MINUTES = 10 * 60 * 1000;
  
    // Check if the admin verification has already been done in this session
    if (req.session.isAdminVerified && (Date.now() - req.session.adminVerifiedAt) < TEN_MINUTES) {
      return next();
    }
  
    const jsonData = req.body.jsonData;
    try {
      const parsedData = JSON.parse(jsonData);
      if (JSON.stringify(parsedData) === JSON.stringify(adminJson) || req.user.role === 'premium') {
        // Set the session flag to true and update the timestamp
        req.session.isAdminVerified = true;
        req.session.adminVerifiedAt = Date.now();
        return next();
      } else {
        req.flash('error_msg', 'You do not have permission to view this resource');
        res.redirect('/profile');
      }
    } catch (e) {
      req.flash('error_msg', 'Invalid JSON format.');
      res.redirect('/profile');
    }
  },
  
    

checkProductOwner : async (req, res, next) => {
  try {
    // Obtener el ID del producto desde los parámetros de la ruta
    const { productId } = req.params;

    // Obtener el producto
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    // Verificar si el usuario es premium
    if (req.user.role !== 'premium') {
      return next(); // Pasar al siguiente middleware si no es premium
    }

    // Obtener el carrito del usuario actual
    const cart = await Cart.findOne({ user: req.user._id });

    // Verificar si el producto pertenece al usuario
    if (product.owner.toString() === req.user._id.toString()) {
      return res.status(403).send('No puedes agregar tu propio producto al carrito');
    }

    // Pasar al siguiente middleware si no hay problemas
    next();
  } catch (error) {
    console.error('Error en checkProductOwner middleware:', error);
    res.status(500).send('Error en checkProductOwner middleware');
  }
}

  };

  



  

  