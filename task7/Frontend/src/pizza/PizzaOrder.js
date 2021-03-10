function doSmth(){
    console.log('hello');
}

var order	=	{
    version: 3,
    public_key:	'i60257707072',
    action:	"pay",
    amount:	$("#total_sum").text(),
    currency:	"UAH",
    description: 'Description',
    order_id:	Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
    sandbox:	1
};