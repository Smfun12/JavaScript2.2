/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var API = require('../API');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

$("#all").click(function () {
    filterPizza("all");
});

$("#meat").click(function () {
    filterPizza("meat");
});
$("#chicken").click(function () {
    filterPizza("chicken");
});
$("#seafood").click(function () {
    filterPizza("ocean");
});
$("#pineapple").click(function () {
    filterPizza("pineapple");
});
$("#mushroom").click(function () {
    filterPizza("mushroom");
});

$("#vega").click(function () {
    filterPizza("vega");
});


function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    console.log(filter);
    if (filter === 'all') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            pizza_shown.push(pizza);
        });
    } else if (filter === 'vega') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (!pizza.content.meat && !pizza.content.ocean) {
                pizza_shown.push(pizza);
            }
        });
    } else {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            for (const [key] of Object.entries(pizza.content)) {
                if (key === filter) {
                    pizza_shown.push(pizza);
                }
            }
        });
    }

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList(initPizzaList);
}

function initPizzaList(error, data) {
    if (error == null) {
        Pizza_List = data;
        showPizzaList(Pizza_List);
    }
}

function sendToBack(error, data) {

}

$("#orders").click(function(){
    console.log('hello');
});
$("#exampleInputName1").keyup(function(){
    if (this.value.match("^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")){
        $("#name").css("color","green");
        $("#nameError").text("");
        document.getElementById("submit-order").disabled = false;

    } else {
        $("#name").css("color","red");
        $("#nameError").text("ENTER VALID NAME");
        $("#nameError").css("color","red");
        document.getElementById("submit-order").disabled = true;


    }
});

$("#exampleInputPhone1").keyup(function(){
    if (!this.value.match("^([0|\\+[0-9]{1,5})?([7-9][0-9]{9})$")){
        $("#phone").css("color","red");
        $("#phoneError").text("ENTER VALID PHONE");
        $("#phoneError").css("color","red");

        document.getElementById("submit-order").disabled = true;

    }
    else {
        $("#phone").css("color","green");
        $("#phoneError").text("");
        document.getElementById("submit-order").disabled = false;

    }
});
$("#exampleInputAddress1").keyup(function(){
    if (this.value.match("^\\d+\\s[A-z]+\\s[A-z]+")){
        $("#address").css("color","green");
        $("#addressError").text("");

        document.getElementById("submit-order").disabled = false;

    } else {
        $("#address").css("color","red");
        $("#addressError").text("ENTER VALID ADDRESS");
        $("#addressError").css("color","red");

        document.getElementById("submit-order").disabled = true;
    }
});

$("#submit-order").click(function () {
    var phoneNumber = $("#exampleInputPhone1").val();
    var login = $("#exampleInputName1").val();
    var address = $("#exampleInputAddress1").val();
    if (phoneNumber === "" || login === "" || address === ""){
        return;
    }
    console.log(phoneNumber,login,address);
    var order_info = {
        phoneNumber: phoneNumber,
        login: login,
        address: address,
        pizzas: PizzaCart.getPizzaInCart()
    }
    API.createOrder(order_info, sendToBack);
});

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
