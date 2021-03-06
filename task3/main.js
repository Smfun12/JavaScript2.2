var LIST = $('.bl-list');
var ITEM_TEMPLATE = $('.bl-row').html();
var node = $(".bl-row");
var boughtNode = $(".bought-products");
var newNode = node.clone();
var arrayList = ["Помідори", "Печиво", "Сир"];
$(document).on('keypress', function(e) {
    if (e.which == 13) {
        var x = document.activeElement.tagName;
        if (x == "INPUT") {
            addProduct(this);
        }
    }
});

function addProduct(element) {
    var text = $(".placeholder input").val().replace(/\s/g, '');
    if (text != '') {
        if (arrayList.includes(text)) {
            alert("Exist!");
        } else {
            arrayList.push(text);

            newNode.find('#plc').text(text);
            newNode.find('.bl-label').text(1);
            newNode.find('.bl-minus').css("opacity", 0.5);
            newNode.find('.bl-minus').css("cursor", "default");
            newNode.find('.bl-minus').prop("disabled", true);
            $(".bl-list").append("<hr>").append("<div class='bl-row'>" + newNode.html()).append('</div>');
            $(".placeholder input").val("");
            $(".placeholder input").focus();
            boughtNode.append("<div class='product'>" + "<span>" + text + "</span>" + "<span id='one'>" + 1).append("</div>");
        }
    }

}

function editTitle(element) {
    if ($(element).attr('disabled') != 'disabled') {

        element.style.display = "none";
        input = document.createElement("input");

        text = $(element).text();

        input.type = "text";
        input.value = text;
        input.size = Math.max(text.length / 4 * 3, 4);
        element.parentNode.insertBefore(input, element);

        // Focus it, hook blur to undo
        input.focus();
        $(input).keyup(function() {
            // $("#tomato").text(input.value);
            var product1 = $("span").filter(function() {
                return $(element).text() === $(this).text();
            });
            $(product1).next().prev().text(input.value);
            $(element).text(input.value);
        });
        input.onblur = function() {
            // Remove the input
            element.parentNode.removeChild(input);
            var product1 = $("span").filter(function() {
                return $(element).text() === $(this).text();
            });
            // Update the span
            element.innerHTML = input.value == "" ? "noTitle" : input.value;

            // Show the span again
            element.style.display = "";
            if (input.value == '') {
                $(product1).next().prev().text("noTitle");

            }
            
        }

    }

}

function decrement(element) {
    var counter = $(element).parent().find(".bl-label");
    var x = $(counter).text();
    if (x > 1) {
        counter.fadeOut(250, function() {
            counter.fadeIn(250);

            $(counter).text(x - 1);
        });
        $(element).attr('disabled', false);
        var text = $(element).parent().parent().find(".bl-product").text().replace(/\s/g, '');
        $("span").filter(function() {
            return $(this).text() === text;
        }).next().text(x - 1);
    }
    x = $(counter).text();
    if (x == 2) {
        $(element).css("background-color", "#E13E3E");
        $(element).css("opacity", 0.5);
        $(element).attr('disabled', true);
        $(element).css("cursor", "context-menu");
    }
}
function increment(element) {
    var counter = $(element).parent().find(".bl-label");
    var minus = $(element).parent().find(".bl-minus");
    var x = $(counter).text();
    counter.fadeOut(250, function() {
        counter.fadeIn(250);
        $(counter).text(+x + 1);
    });
    $(minus).attr('disabled', false);

    if (x + 1 > 1) {

        $(minus).css("opacity", 1);
        $(minus).css("background-color", "#DA2E2E");
        $(minus).css("cursor", "pointer");
    }
    var text = $(element).parent().parent().find(".bl-product").text().replace(/\s/g, '');
    $("span").filter(function() {
        return $(this).text() === text;
    }).next().text(+x + 1);

}
function buyProduct(element) {
    var row = $(element).parent().parent();
    var text = $(element).parent().parent().find(".bl-product").text().replace(/\s/g, '');
    var boughtList = $(".bl-bought").find(".bought-products");
    var product = $(`span:contains(${text})`);
    var productClone = product.parent().clone();
    if (row.find(".bought-button").text() == 'Не куплено') {

        if (+row.find(".bl-label").text() > 1) {
            row.find(".bl-minus").css("opacity", "1");
        } else {
            row.find(".bl-minus").css("opacity", "0.5");
        }
        row.find(".bl-plus").css("opacity", "1");
        row.find(".bl-product").find('span').css("text-decoration", "none");
        row.find(".delete-button").css("display", "inline-block");
        row.find(".bl-label").css("margin", "auto");
        row.find(".bought-button").text("Куплено");
        product.parent().find("span").css("text-decoration", "none");
        $(".bought-products").append(productClone).find(".bl-product").remove();
        $(".bought-products").find("span").css('text-decoration', 'none');
        $(".bought-product").find(`.product:contains(${text})`).remove();

    } else {
        row.find(".bl-minus").css("opacity", "0");
        row.find(".bl-plus").css("opacity", "0");
        row.find(".bl-product").find('span').css("text-decoration", "line-through");
        row.find(".bl-product").find('span').css("color", "red");
        row.find(".bl-product").find('span').attr("disabled", true);
        row.find(".delete-button").css("display", "none");
        row.find(".bl-label").css("margin-right", "35px");
        row.find(".bought-button").text("Не куплено");
        product.parent().find("span").css("text-decoration", "line-through");
        $(".bought-product").append(productClone).find(".bl-product").remove();
        $(".bought-product").find("span").css('text-decoration', 'line-through');
        $(".bought-products").find(`.product:contains(${text})`).remove();
    }
}

function deleteProduct(element) {
    var previous = $(element).parent().parent().prev();
    previous.remove();
    $(element).parent().parent().parent().prev().remove();
    $(element).parent().parent().remove();
    var text = $(element).parent().parent().find(".bl-product").text().replace(/\s/g, '');
    $("span").filter(function() {
        return $(this).text() === text;
    }).parent().remove();
    var pos = arrayList.indexOf(text);
    arrayList.splice(pos, 1);
}
