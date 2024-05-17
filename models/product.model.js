const mongoose = require('mongoose');

const product = mongoose.model(
  'Product',
  mongoose.Schema({
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productDescription: {
      type: String,
      required: false,
    },
    productImage: {
      type: String,
    },
  })
);

module.exports = {
  product,
};
