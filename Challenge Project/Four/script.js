const itemContainer = document.querySelector('#itemContainer')
const navBar = document.querySelector('#navBar')

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

function loadDefault() {
    renderItem(itemStorage.vegetables, 'vegetable')
}

navBar.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('vegetable')) {
        renderItem(itemStorage.vegetables, 'vegetable')
    }

    if (target.classList.contains('snack')) {
        renderItem(itemStorage.snack, 'snack')
    }

    if (target.classList.contains('toy')) {
        renderItem(itemStorage.toy, 'toy')
    }
})

let userCart = []

itemContainer.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('addToCartButton')) {
        const itemID = target.dataset.itemId
        const itemName = target.dataset.itemName

        const itemExist = userCart.find(item => item.id === itemID)
        if (itemExist) {
            itemExist.total += 1
        } else {
            userCart.push({id: itemID, name: itemName, total: 1})
        }
        console.log(userCart)
    }
})

function renderItem(data, category) {
    itemContainer.innerHTML = ''
    let containerContent = ''

    if (data.length > 0) {
        if (data[0].id.startsWith('v')) {
            console.log('Get vegetable stock')
        } else if (data[0].id.startsWith('s')) {
            console.log('Get snack stock')
        } else if (data[0].id.startsWith('t')) {
            console.log('Get toy stock')
        }
    }

    data.forEach(item => {
        containerContent += `
            <div class="itemBox ${category}">
                <h2>${item.name}</h2>
                <h2>Price: ${item.price}$</h2>
                <h2>Stock: ${item.stock}</h2>
                <button class="addToCartButton" data-item-name="${item.name}" data-item-id="${item.id}">Add to cart</button>
            </div>
        `
    });
    itemContainer.innerHTML = containerContent
}
loadDefault()