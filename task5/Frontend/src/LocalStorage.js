var PizzaCard = require('./pizza/PizzaCart');


function writePizzas(){
    let Cart = PizzaCard.getPizzaInCart();
    for (let i = 0; i < Cart.length; i++) {
        localStorage.setItem(i + '', JSON.stringify(Cart[i]));
    }
}


function getPizzas() {
    let pizzaCard = []
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let pizza = JSON.parse(localStorage.getItem(key));
        pizzaCard.push(pizza);
    }
    return pizzaCard;
}

exports.getPizzas = getPizzas
exports.writePizzas = writePizzas
