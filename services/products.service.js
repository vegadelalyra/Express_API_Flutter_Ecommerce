const { MONGO_DB_CONFIG } = require('../config/app.config');
const { Product } = require('../models/product.model');

async function createProduct(params, callback) {
  if (!params.productName) {
    return callback(
      {
        message: 'Product Name Required',
      },
      ''
    );
  }

  if (!params.category) {
    return callback(
      {
        message: 'Category Required',
      },
      ''
    );
  }

  const productModel = new Product(params);
  productModel
    .save()
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

async function getProducts(params, callback) {
  const productName = params.productName;
  const categoryId = params.categoryId;

  var condition = {};

  if (productName) {
    condition['productName'] = {
      $regex: new RegExp(productName),
      $options: 'i',
    };
  }

  if (categoryId) {
    condition['category'] = categoryId;
  }

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  Product.find(
    condition,
    'productName productShortDescription productPrice productSalePrice productImage productSKU productType stockStatus'
  )
    .populate('category', 'categoryName categoryImage')
    .limit(perPage)
    .skip(perPage * page)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

async function getProductById(params, callback) {
  const productId = params.productId;

  Product.findById(productId)
    .populate('category', 'categoryName categoryImage')
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

async function updateProduct(params, callback) {
  const productId = params.productId;

  Product.findByIdAndUpdate(productId, params, { useFindAndModify: false })
    .then(response => {
      if (!response) {
        callback(`Cannot update Product with ID ${productId}`);
      } else callback(null, response);
    })
    .catch(error => callback(error));
}

async function deleteProduct(params, callback) {
  const productId = params.productId;

  Product.findByIdAndDelete(productId)
    .then(response => {
      if (!response) callback('Not found Product with id', productId);
      else callback(null, response);
    })
    .catch(error => callback(error));
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
