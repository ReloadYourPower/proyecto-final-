const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: { // Agregamos el campo quantity
    type: Number,
    required: true,
    default: 1 // Valor por defecto
  },
  date: {
    type: Date,
    default: Date.now,
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null // Por defecto es null
  }
});

// paginado plugin 
ProductSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
