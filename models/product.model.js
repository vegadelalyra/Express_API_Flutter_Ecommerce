const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const Product = mongoose.model(
  'Product',
  mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
        unique: true,
      },
      category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
      },
      productShortDescription: {
        type: String,
        required: true,
      },
      productDescription: {
        type: String,
        required: false,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productSalePrice: {
        type: Number,
        required: true,
        default: 0,
      },
      productImage: {
        type: String,
        required: true,
      },
      productSKU: {
        type: String,
        required: false,
      },
      productType: {
        type: String,
        required: true,
        default: 'simple',
      },
      stockStatus: {
        type: String,
        default: 'IN',
      },
    },
    {
      toJSON: {
        transform: function (doc, ret) {
          ret.productId = ret._id.toString();
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  )
);

module.exports = {
  Product,
};
