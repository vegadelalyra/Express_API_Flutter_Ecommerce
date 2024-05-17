const express = require('express');
const mongoose = require('mongoose');
const errors = require('./middleware/errors.js');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const { MONGO_DB_CONFIG } = require('./config/app.config');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_DB_CONFIG.DB).then(
  () => {
    console.log('Database connected');
  },
  error => {
    console.log("Database can't be connected", error);
  }
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/app.routes'));
app.use(errors.errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.port || 4000, function () {
  const port = process.env.port ? process.env.port : 4000;
  console.log('PORT', port, 'ready to Go!');
});
