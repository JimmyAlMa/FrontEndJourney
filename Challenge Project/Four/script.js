const itemContainer = document.querySelector('#itemContainer')
const navBar = document.querySelector('#navBar')
const cartContainer = document.querySelector('#cartContainer')

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
    itemContainer.innerHTML = ''

    renderItem(itemStorage.vegetables, 'vegetables')
}

navBar.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('vegetables')) {
        renderItem(itemStorage.vegetables, 'vegetables')
    }

    if (target.classList.contains('snack')) {
        renderItem(itemStorage.snack, 'snack')
    }

    if (target.classList.contains('toy')) {
        renderItem(itemStorage.toy, 'toy')
    }

    if (target.classList.contains('userCart')) {
        renderCart()
    }
})

let userCart = [] // Object inside this array

itemContainer.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('addToCartButton')) {
        const itemID = target.dataset.itemId
        const itemName = target.dataset.itemName
        const itemPrice = Number(target.dataset.itemPrice)
        const itemCategory = target.dataset.itemCategory

        const allItem = Object.values(itemStorage).flat()
        const targetItem = allItem.find(item => item.id === itemID)

        const itemExist = userCart.find(item => item.id === itemID)

        if (targetItem.stock <= 0) {
            console.log('Item out of stock')
            alert('Item is out of stock')
            return
        }

        targetItem.stock -= 1

        if (itemExist) {
            itemExist.total += 1
            itemExist.price += itemPrice
        } else {
            userCart.push({id: itemID, name: itemName, total: 1, price: itemPrice})
        }

        if (itemCategory) {
            renderItem(itemStorage[itemCategory], itemCategory)
        }
        console.log('User cart: ', userCart)
        console.log('Update item storage: ', itemStorage)
    }
})

function renderItem(data, category) {
    itemContainer.innerHTML = ''

    if (data.length > 0) {
        if (data[0].id.startsWith('v')) {
            console.log('Get vegetables stock')
        } else if (data[0].id.startsWith('s')) {
            console.log('Get snack stock')
        } else if (data[0].id.startsWith('t')) {
            console.log('Get toy stock')
        }
    }

    data.forEach(item => {
        const containerContent = `
            <div class="itemBox ${category}">
                <h2>${item.name}</h2>
                <h2>Price: ${item.price}$</h2>
                <h2>Stock: ${item.stock}</h2>
                <button class="addToCartButton" data-item-name="${item.name}" data-item-id="${item.id}" data-item-price="${item.price}" data-item-category="${category}">Add to cart</button>
            </div>
        `
        itemContainer.insertAdjacentHTML('beforeend', containerContent)
    });
}

function renderCart() {
    itemContainer.innerHTML = ''

    
}
loadDefault()