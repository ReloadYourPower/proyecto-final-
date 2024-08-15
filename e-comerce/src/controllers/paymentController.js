const Payment = require('../models/Payment');
const Cart = require('../models/Cart');

const viewPaymentPage = async (req, res) => {
  
  const { paymentMethod } = req.body;
  try {
    // Busca el carrito del usuario y obtiene los detalles de los productos
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.productId');

    if (!cart) {
      req.flash('error_msg', 'No se encontró ningún carrito.');
      return res.redirect('/');
    }

    // Procesa los productos para calcular el total y otros detalles
    const productos = cart.products.map(item => ({
      productName: item.productName,
      quantity: item.quantity,
      price: item.productId.price, // Asegúrate de que 'productId' esté correctamente poblado
      total: item.quantity * item.productId.price,
    }));

    // Calcula el total del carrito
    const totalAmount = productos.reduce((acc, item) => acc + item.total, 0);
    
    
    // Renderiza la vista pasando todos los datos necesarios, incluyendo el método de pago
    res.render('payment', {
      productos,
      totalAmount,
      paymentMethod: paymentMethod || '', // Asegúrate de capturar el método de pago si ya está disponible
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

const processPayment = async (req, res) => {
  try {
    // Asegúrate de que el botón fue presionado y que se seleccionó un método de pago
    const { paymentMethod, proceedPayment } = req.body;

    if (!proceedPayment) {
      req.flash('error_msg', 'Debes proceder al pago para continuar.');
      return res.redirect('/profile/payment');
    }

    if (!paymentMethod) {
      req.flash('error_msg', 'Método de pago no seleccionado.');
      return res.redirect('/profile/payment');
    }

    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.productId');
    if (!cart || !cart.products || cart.products.length === 0) {
      req.flash('error_msg', 'No hay productos en el carrito.');
      return res.redirect('/profile/payment');
    }

    // Calcular el total de la compra
    const totalAmount = cart.products.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    // Crear el nuevo pago en la base de datos
    const newPayment = new Payment({
      amount: totalAmount,
      paymentMethod,
      user: req.user.id,
    });

    await newPayment.save();

    // Mostrar un mensaje de éxito y redirigir a la página de confirmación
    req.flash('success_msg', 'Pago realizado con éxito.');
    res.redirect('/profile/payment/success');
  } catch (err) {
    console.error('Error processing payment:', err);
    req.flash('error_msg', 'Error en el servidor.');
    res.redirect('/profile/payment');
  }
};


module.exports = {
  viewPaymentPage,processPayment
}