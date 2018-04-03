'use strict';
var request = require('request');

/**
 * metodo por el cual traemos los datos de la fuente y los trabajamos 
 * para devolverlos mas optimos hacia el usuario.
 * @param {any} product
 */
exports.get_data_site = function (product, callback) {
    try {
        var query = "https://api.mercadolibre.com/sites/MLA/search?q=" + product + "#json";
        request(query, function (err, body) {
            // AQUI ARMAR TODA LA LOGICA PARA TRABAJAR LOS ITEMS ANTES DE SER DEVUELTOS 
            // PARA EL USUARIO
            var lista = {};
            lista = JSON.parse(body.body);
            callback(lista['results']);
        });
    } catch (e) {
        console.log(e.message);
    }
};