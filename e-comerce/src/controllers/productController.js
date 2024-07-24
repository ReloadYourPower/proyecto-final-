const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    
  const products = await Product.find();
  
   
    res.render('products', { products: products.map(product => product.toObject()), isAuthenticated: req.isAuthenticated() });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });

  try {
    await newProduct.save();
    req.flash('success_msg', 'Product added');
    res.redirect('/products');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/products');
  }
};

module.exports = {
  addProduct,getProducts
}