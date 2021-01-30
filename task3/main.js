var LIST    =   $('.bl-list');
var ITEM_TEMPLATE   =   $('.bl-row').html();
var node = $(".bl-row");
var newNode = node.clone();     
            $(document).ready(function(){
   $(".placeholder-button").click(function(){
     var text = $(".placeholder input").val();
     if (text != ''){
           
     newNode.find('.bl-product').text(text);
     newNode.find('.bl-label').text(1);
     newNode.find('.bl-minus')
      .css("opacity", 0.5);
      newNode.find('.bl-minus')
      .css("cursor", "default");
     newNode.find('.bl-minus')
      .prop("disabled", true);
            $(".bl-list")
            .append("<hr>")
            .append
            ("<div class='bl-row'>"+newNode.html())
            .append('</div>');}
              });
});

function decrement(element){
      var counter = $(element).parent().find(".bl-label");
      var x = $(counter).text();
            if (x>1){
                  counter.fadeOut(250, function(){
                        counter.fadeIn(250);
                  
                  $(counter).text(x-1);
                  });
                  $(element).attr('disabled',false);
                  
            }
            x = $(counter).text();
            if(x==2){
            $(element).css("background-color", "#E13E3E");
               $(element).css("opacity", 0.5);
                $(element).attr('disabled',true);
               $(element).css("cursor", "context-menu");
            }
}
function increment(element){
      var counter = $(element).parent().find(".bl-label");
             var minus = $(element).parent().find(".bl-minus");
            var x = $(counter).text();
             counter.fadeOut(250, function(){
                        counter.fadeIn(250);
                  $(counter).text(+x+1);
                  });
                  $(minus).attr('disabled',false);
                  
              if (x+1>1){
                 
             $(minus).css("opacity", 1);
             $(minus).css("background-color", "#DA2E2E");
             $(minus).css("cursor", "pointer");
            }
      var text = $(element).parent().find(".bl-product").text();
            
}

function deleteProduct(element){
     $(element).parent().
     parent().parent().find('hr').remove();
     $(element).parent().parent()
     .remove();
}
