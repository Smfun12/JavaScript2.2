var LIST    =   $('.bl-list');
var ITEM_TEMPLATE   =   $('.bl-row').html();
     
            $(document).ready(function(){
            $(".bl-plus").click(function(){
            var counter = $(this).parent().find(".bl-label");
             var minus = $(this).parent().find(".bl-minus");
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
            
  });
   $(".bl-minus").click(function(){
      var counter = $(this).parent().find(".bl-label");
      var x = $(counter).text();
            if (x>1){
                  counter.fadeOut(250, function(){
                        counter.fadeIn(250);
                  
                  $(counter).text(x-1);
                  });
                  $(this).attr('disabled',false);
                  
            }
            x = $(counter).text();
            if(x==2){
            $(this).css("background-color", "#E13E3E");
               $(this).css("opacity", 0.5);
                $(this).attr('disabled',true);
               $(this).css("cursor", "context-menu");
            }  
   });

   $(".placeholder-button").click(function(){
     var text = $(".placeholder input").val();
     if (text != ''){
           var node = $(".bl-row");
           var newNode = node.clone();
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
              
    $(".delete-button").click(function(){
     $(this).parent().
     parent().find('hr').remove();
     $(this).parent().parent()
     .css("display","none");
     
   });
});

function increment(){
      console.log('hello');
}
