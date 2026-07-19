const itemContainer = document.querySelector('#itemContainer')

let itemStorage = {
    vegetables: [
        { id: 'v1', name: 'Tomato', price: 10, stock: 24 },
        { id: 'v2', name: 'Cabbage', price: 15, stock: 20 },
        { id: 'v3', name: 'Broccoli', price: 8, stock: 15 },
        { id: 'v4', name: 'Carrot', price: 5, stock: 30 }
    ],

    snack: [
        { id: 's1', name: 'Takis', price: 10, stock: 14 },
        { id: 's2', name: 'Chocolate', price: 12, stock: 20 },
        { id: 's3', name: 'Ice Cream', price: 10, stock: 10 }
    ],

    toy: [
        { id: 't1', name: 'Doll', price: 20, stock: 20 },
        { id: 't2', name: 'Balloon', price: 8, stock: 30 },
        { id: 't3', name: 'Card', price: 10, stock: 18 }
    ]
};