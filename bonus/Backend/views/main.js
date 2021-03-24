var pivot = new WebDataRocks({
    container: "#wdr-component",
    toolbar: true,
    report: {
        data: [
            {
                "Product": "Apple",
                "Price": 2.50,
                "Country": "Ukraine"
            },
            {
                "Product": "Cherry",
                "Price": 5.25,
                "Country": "Spain"
            },
            {
                "Product": "Orange",
                "Price": 10.2,
                "Country": "Italy"
            },
            {
                "Product": "Lemon",
                "Price": 14.5,
                "Country": "Portugal"
            }
        ],
        // filename: "http://localhost:5050/api/get-pizza-list/"

    }
});