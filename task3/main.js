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
     var node = $(".bl-row").html();
     $(node).find($(".bl-product")).text(text);
            $(".bl-list")
            .append("<hr>")
            .append
            ("<div class='bl-row'>" + node
            )
            .append("</div>");
   });
    $(".delete-button").click(function(){
     $(".delete-button").parent().parent()
     .css("display","none");
   });
});
