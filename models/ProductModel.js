var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Product name must be at least 3 characters'],
    maxLength: 30
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Product price can not be negative'],
    max: 1000
  },
  image: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  }
});

var ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;