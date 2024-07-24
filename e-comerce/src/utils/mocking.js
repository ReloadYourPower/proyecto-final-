const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const Product = require('../models/Product'); // Ajusta la ruta según tu estructura de proyecto

const createMockProducts = async () => {
  try {
    // Verifica si ya existen productos en la base de datos
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const productsData = [];
      for (let i = 0; i < 15; i++) {
        productsData.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            date: faker.date.recent(),
            owner: null,
        });
      }

      // Inserta los productos
      await Product.insertMany(productsData);
      console.log('Productos iniciales creados');
    } else {
      console.log('Productos ya existen en la base de datos');
    }
  } catch (error) {
    console.error('Error inicializando productos:', error);
  }
};

module.exports = {createMockProducts}
