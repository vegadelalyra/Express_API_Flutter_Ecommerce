const { MONGO_DB_CONFIG } = require('../config/app.config');
const { product } = require('../models/product.model');

async function createProduct(params, callback) {
  if (!params.productName) {
    return callback(
      {
        message: 'Product Name Required',
      },
      ''
    );
  }

  const model = new product(params);
  model
    .save()
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

async function getProducts(params, callback) {
  const productName = params.productName;

  var condition = productName
    ? { productName: { $regex: new RegExp(productName), $options: 'i' } }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  product
    .find(condition, 'productName productImage')
    .limit(perPage)
    .skip(perPage * page)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

async function getProductById(params, callback) {
  const productId = params.productId;

  product
    .findById(productId)
    .then(response => {
      if (!response) callback('Not found Product with id', productId);
      else callback(null, response);
    })
    .catch(error => callback(error));
}

async function updateProduct(params, callback) {
  const productId = params.productId;

  product
    .findByIdAndUpdate(productId, params, { useFindAndModify: false })
    .then(response => {
      if (!response) callback('Not found Product with id', productId);
      else callback(null, response);
    })
    .catch(error => callback(error));
}

async function deleteProduct(params, callback) {
  const productId = params.productId;

  product
    .findByIdAndDelete(productId)
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
