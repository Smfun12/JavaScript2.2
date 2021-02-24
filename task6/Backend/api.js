/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var LocalStorage = require('./LocalStorage');
exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    var list = LocalStorage.getPizzas();
    order_info['pizzas'] = list;
    console.log("Creating Order", order_info);
    res.send(order_info);
};
