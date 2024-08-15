const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/mockingproducts', async (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push(new Product({
            name: `Product${i}`,
            description: `Description for product${i}`,
            price: Math.random() * 100,
            stock: Math.floor(Math.random() * 100)
        }));
    }
    await Product.insertMany(products);
    res.send(products);
});

module.exports = router;
