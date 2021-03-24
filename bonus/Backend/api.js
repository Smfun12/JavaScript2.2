/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var Products = require('./data/products.json')
exports.getPizzaList = function(req, res) {
    res.send(Products);
};