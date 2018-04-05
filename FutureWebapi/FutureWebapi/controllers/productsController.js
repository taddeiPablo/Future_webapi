'use strict';

var data = require('../models/data');

/**
 * CALLBACK ROUTE PRODUCTS
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
exports.getProducts = function (req, res, next) {
    var params = {
        product: req.query.var,
        price_min: req.query.var1,
        price_max: req.query.var2,
        raiting: req.query.var3
    };

    data.get_data_site(params, function (body) {
        res.json(body);
    });
};