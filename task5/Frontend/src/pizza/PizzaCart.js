/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var LocalStorage = require('../LocalStorage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var sum = 0;

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
$("#clear").click(function (){
    console.log('clear');
    clearAll();
});
//HTML едемент куди будуть додаватися піци
var $cart = $(".list-group");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    //Приклад реалізації, можна робити будь-яким іншим способом
    if (!containsObject(pizza,size,Cart)){
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
    }
    else{
        console.log('exist');
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function containsObject(obj,obj2, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].pizza === obj && list[i].size === obj2) {
            list[i].quantity++;
            return true;
        }
    }

    return false;
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика

    let number = Cart.indexOf(cart_item);
    Cart.splice(number,1);

    //Після видалення оновити відображення
    updateCart();
}

function clearAll() {
    //Видалити піцу з кошика
    Cart.length = 0;
    sum = 0;
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
        Cart = LocalStorage.getPizzas();
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    sum = 0;

    for (let i = 0; i < Cart.length;i++){
        if (Cart[i].size === 'big_size'){
            sum += Cart[i].pizza.big_size.price * Cart[i].quantity;
        }
        else{
            sum += Cart[i].pizza.small_size.price * Cart[i].quantity;
        }
    }
    $("#total_sum").text(sum);
    $("#total-orders").text(Cart.length);
    LocalStorage.writePizzas();
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            if (cart_item.size === 'big_size'){
                sum += cart_item.pizza.big_size.price;
            }
            else{
                sum += cart_item.pizza.small_size.price;
            }
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if (cart_item.size === 'big_size'){
                sum -= cart_item.pizza.big_size.price;
            }
            else{
                sum -= cart_item.pizza.small_size.price;
            }
            if (sum < 0){
                sum = 0;
            }
            if (cart_item.quantity<1){
                removeFromCart(cart_item);}
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".cancel").click(function (){
            if (cart_item.size === 'big_size'){
                sum -= cart_item.pizza.big_size.price * cart_item.quantity;
            }
            else{
                sum -= cart_item.pizza.small_size.price * cart_item.quantity;
            }
            if (sum < 0){
                sum = 0;
            }
           removeFromCart(cart_item);
           updateCart();
        });
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
