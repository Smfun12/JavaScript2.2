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
    $("#all-pizza").text(pizza_shown.length);
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
        $("#address-field").text(this.value);
        document.getElementById("submit-order").disabled = false;

    } else {
        $("#address").css("color","red");
        $("#addressError").text("ENTER VALID ADDRESS");
        $("#addressError").css("color","red");

        document.getElementById("submit-order").disabled = true;
    }
});
function initialize() {
            //Тут починаємо працювати з картою

            var mapProp = {
                center: new google.maps.LatLng(50.464379,30.519131),
                zoom: 16
            };
            var html_element = document.getElementById("googleMap");
            var map = new google.maps.Map(html_element,mapProp);
            var point = new google.maps.LatLng(50.464379,30.519131);
            var marker = new google.maps.Marker({
                position: point,
                //map	- це змінна карти створена за допомогою new
                //google.maps.Map(...)
                map: map,
                icon: "assets/images/map-icon.png"
            });
            function geocodeLatLng(latlng, callback) {
                //Модуль за роботу з адресою
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'location': latlng
                }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results[1]) {
                        var adress = results[1].formatted_address;
                        callback(null, adress);
                    } else {
                        callback(new Error("Can't	find	adress"));
                    }
                });
            }
            function geocodeAddress(adress, callback) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results[0]) {
                        var coordinates = results[0].geometry.location;
                        callback(null, coordinates);
                    } else {
                        callback(new Error("Can	not	find	the	adress"));
                    }
                });
            }
            function calculateRoute(A_latlng, B_latlng, callback) {
                var directionService = new google.maps.DirectionsService();
                directionService.route({
                    origin: A_latlng,
                    destination: B_latlng,
                    travelMode: google.maps.TravelMode["DRIVING"]
                }, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        varleg = response.routes[0].legs[0];
                        callback(null, {
                            duration: leg.duration
                        });
                    } else {
                        callback(new Error("Can'	not	find	direction"));
                    }
                });
            }
            google.maps.event.addListener(map, 'click', function(me) {
                var coordinates = me.latLng;
                geocodeLatLng(coordinates, function(err, adress) {
                    if (!err) {
                        //Дізналися адресу
                        calculateRoute(coordinates,point.LatLng, function(err,));
                        console.log(adress);
                    } else {
                        console.log("Немає адреси")
                    }
                })
            });


            //Карта створена і показана
        }
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,	 'load',	initialize);

$("#submit-order").click(function () {
    var phoneNumber = $("#exampleInputPhone1").val();
    var login = $("#exampleInputName1").val();
    var address = $("#exampleInputAddress1").val();
    if (phoneNumber === "" || login === "" || address === ""){
        return;
    }
    console.log(phoneNumber,login,address);
    var pizza = [];
    PizzaCart.getPizzaInCart().forEach(element =>
        pizza.push(element.pizza));
        var order_info = {
        phoneNumber: phoneNumber,
        login: login,
        address: address,
        pizzas: pizza
    }
    API.createOrder(order_info, sendToBack);
});

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
