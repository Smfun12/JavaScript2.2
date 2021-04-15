$('#edit_order').on('click', function (){
   window.location.href = 'http://localhost:5050';
});

console.log(window.location.href);

if (window.location.href==='http://localhost:5050/order.html'){
    console.log('order page');
    $('.minus').attr('disabled', true);
        $('.plus').attr('disabled', true);
    $('.cancel').attr('disabled', true);
    $('#clear').attr('disabled', true);
}