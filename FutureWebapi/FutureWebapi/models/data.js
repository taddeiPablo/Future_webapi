'use strict';
var request = require('request');

// metodo en el cual realizamos la busqueda de lo solicitado por el usuario
// y trabajamos la informacion para retornar resultados mas precisos
exports.get_data_site = function (params, callback) {
    try {
        var query = "https://api.mercadolibre.com/sites/MLA/search?q=" + params.product + "#json";
        request(query, function (err, body) {
            var list_items = {};
            var list_items_aux = [];
            var items = [];
            list_items = JSON.parse(body.body);
            items = list_items['results'];
            var results = [];
            
            for (var i = 0; i < items.length; i++) {
                // rango de precio entre min y max
                if (parseInt(items[i]["price"]) >= parseInt(params.price_min) &&
                    parseInt(items[i]["price"]) <= parseInt(params.price_max)) {
                    list_items_aux.push(items[i]);
                }
            }
            results = selectionSort(list_items_aux);
            callback(results);
        });
    } catch (e) {
        console.log(e.message);
    }
};

// funcion de ordenamiento por el siguiente criterio 
// menor precio + mayor rating y falta agregar los totales
var selectionSort = function (list) {
    var m, j = 0;
    var rating_average_m, rating_average_j = 0;
    var totals_m, totals_j = 0;
    for (var i = -1; ++i < list.length;) {
        for (var m = j = i; ++j < list.length;) {
            if (list[m]["reviews"]["rating_average"] != undefined)
                rating_average_m = parseFloat(list[m]["reviews"]["rating_average"]);
            if (list[j]["reviews"]["rating_average"] != undefined)
                rating_average_j = parseFloat(list[j]["reviews"]["rating_average"]);
            if (parseInt(list[m]["price"]) > parseInt(list[j]["price"]) &&
                rating_average_m > rating_average_j) {
                m = j;
            }
        }
        var item = list[m];
        list[m] = list[i];
        list[i] = item;
    }
    return list;
};