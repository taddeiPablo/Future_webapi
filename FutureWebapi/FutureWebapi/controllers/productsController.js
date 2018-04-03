'use strict';

var layerdata = require('../models/data');

/**
 * CALLBACK ROUTE PRODUCTS
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
exports.getProducts = function (req, res, next) {
    var product = req.query.var;
    layerdata.get_data_site(product, function (body) {
        res.json(body);
    });
};