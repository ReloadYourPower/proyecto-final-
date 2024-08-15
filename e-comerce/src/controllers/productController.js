const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', minPrice = 0, maxPrice = Infinity } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };

    // Construir el filtro de búsqueda
    const filter = {
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };

    const products = await Product.paginate(filter, options);

    // Verificar si la página solicitada está fuera del rango disponible
    if (page > products.totalPages) {
      req.flash('error_msg', 'Page not found');
      return res.redirect(`/products?page=${products.totalPages}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }

    res.render('products', {
      products: products.docs.map(product => product.toObject()),
      page: products.page,
      totalPages: products.totalPages,
      search,
      minPrice,
      maxPrice,
      user: req.user
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};


// const addToCart = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const userId = req.user._id;

//     // Logging for debugging
//     console.log('Received request to add product to cart:', { productId, userId });

//     // Find the product by ID to get its details
//     const product = await Product.findById(productId);
//     if (!product) {
//       console.log('Product not found:', productId);
//       req.flash('error_msg', 'Product not found');
//       return res.redirect('/products');
//     }

//     // Logging for debugging
//     console.log('Product found:', product);

//     // Find the user's cart or create a new one
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, products: [] });
//     }

//     // Logging for debugging
//     console.log('User cart before update:', cart);

//     // Check if the product already exists in the cart
//     const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
//     if (productIndex !== -1) {
//       // If it exists, update the quantity
//       cart.products[productIndex].quantity += 1;
//     } else {
//       // If it doesn't exist, add the new product with its details
//       cart.products.push({
//         productId: product._id,
//         productName: product.name,
//         quantity: 1
//       });
//     }

//     // Logging for debugging
//     console.log('Updated cart products:', cart.products);

//     await cart.save();
//     console.log('Cart saved successfully');
//     req.flash('success_msg', 'Product added to cart');
//     res.redirect('/profile/products');
//   } catch (err) {
//     console.error('Error adding product to cart:', err);
//     req.flash('error_msg', 'Server error');
//     res.redirect('/profile/products');
//   }
// };





module.exports = {
  getProducts
}