export const itemsRoute = (page) => page.route('http://localhost:8080/v1/item/items', route => {
  route.fulfill({
    body: JSON.stringify({
      items: [{
        Id: "0b670429-57c9-4164-bf71-c0ea8b196b23",
        Name: "food",
        Stock: 105,
        Price: 90,
        IsActive: true,
        Description: "nice",
        CreatedAt: 1660801303,
        UpdatedAt: 1660801303
      }, {
        Id: "81e03c13-c228-4432-8ebc-7d08c66f3bd0",
        Name: "snacks",
        Stock: 15,
        Price: 299,
        IsActive: true,
        Description: "nice",
        CreatedAt: 1660821339,
        UpdatedAt: 1660821339
      }]
    })
  })
});


export const addItemRoute = (page) =>
  page.route("http://localhost:8080/v1/item/add", (route) => {
    route.fulfill({
      body: JSON.stringify({
        id: "ggd55741-89e8-47d8-bf5a-1374703d2437",
        name: "surfExcel",
        stock: "1015",
        price: "299",
        isActive: true,
        description: "good product"
      },
      ),
    });
  });

