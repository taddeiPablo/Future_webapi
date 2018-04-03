'use strict';

var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/productsController');

router.get('/search_products', product_controller.getProducts);

module.exports = router;