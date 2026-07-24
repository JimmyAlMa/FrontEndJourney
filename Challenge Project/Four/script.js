const itemContainer = document.querySelector('#itemContainer')
const navBar = document.querySelector('#navBar')
const cartText = document.querySelector('.userCartNav')
const cartContainer = document.querySelector('#cartContainer')
const mainContainer = document.querySelector('#main')

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

let userCart = [] // Object inside this array

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

    if (target.classList.contains('userCartNav')) {
        renderCart(userCart)
    }
})

function renderCartText() {
    const grandTotalItem = userCart.reduce((sum, item) => sum + item.total, 0)
    cartText.textContent = `Your cart +${grandTotalItem}`
}

mainContainer.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('addToCartButton')) {
        const itemID = target.dataset.itemId
        const itemName = target.dataset.itemName
        const itemCategory = target.dataset.itemCategory

        const allItem = Object.values(itemStorage).flat()
        const targetItem = allItem.find(item => item.id === itemID)
        const targetItemPrice = targetItem.price

        const itemExist = userCart.find(item => item.id === itemID)

        if (targetItem.stock <= 0) {
            console.log('Item out of stock')
            alert('Item is out of stock')
            return
        }

        targetItem.stock -= 1

        if (itemExist) {
            itemExist.total += 1
            itemExist.price += targetItemPrice
        } else {
            userCart.push({id: itemID, name: itemName, total: 1, price: targetItemPrice})
        }

        if (itemCategory) {
            renderItem(itemStorage[itemCategory], itemCategory)
        }

        renderCartText()

        console.log('User cart: ', userCart)
        console.log('Update item storage: ', itemStorage)
    }

    if (target.classList.contains('addButton')) {
        const targetID = target.dataset.itemId
        const targetTotal = Number(target.dataset.itemTotal)

        const allItem = Object.values(itemStorage).flat()
        const targetItem = allItem.find(item => item.id === targetID)
        const targetItemPrice = targetItem.price

        const totalElement = target.closest('.itemCart').querySelector('.cartItemTotal')
        const priceElement = target.closest('.itemCart').querySelector('.cartItemPrice')

        const itemExist = userCart.find(item => item.id === targetID)

        if (targetItem.stock <= 0) {
            console.log('Item out of stock')
            alert('Item is out of stock')
            return
        }

        targetItem.stock -= 1

        if (itemExist) {
            itemExist.total += 1
            itemExist.price += targetItemPrice
        }

        if (totalElement && priceElement) {
            totalElement.textContent = `(${itemExist.total})`
            priceElement.textContent = `$${itemExist.price}`
        }

        console.log('User cart: ', userCart)
        console.log('Update item storage: ', itemStorage)
    }

    if (target.classList.contains('lessButton')) {
        const targetID = target.dataset.itemId
        const targetTotal = Number(target.dataset.itemTotal)

        const allItem = Object.values(itemStorage).flat()
        const targetItem = allItem.find(item => item.id === targetID)
        const targetItemPrice = targetItem.price

        const itemExist = userCart.find(item => item.id === targetID)

        targetItem.stock += 1
    
        if (itemExist) {
            itemExist.total -= 1
            itemExist.price -= targetItemPrice
        }


        const itemCartCard = target.closest('.itemCart')
        if (itemExist.total <= 0) {
            const index = userCart.findIndex(item => item.id === targetID)
            if (index !== -1) {userCart.splice(index, 1)}

            if (itemCartCard) {itemCartCard.remove()}
        } else {
            const totalElement = target.closest('.itemCart').querySelector('.cartItemTotal')
            const priceElement = target.closest('.itemCart').querySelector('.cartItemPrice')

            if (totalElement && priceElement) {
                totalElement.textContent = `(${itemExist.total})`
                priceElement.textContent = `$${itemExist.price}`
            }
        }

        renderCartText()

        console.log('User cart: ', userCart)
        console.log('Update item storage: ', itemStorage)
    }

    if (target.classList.contains('deleteButton')) {
        const targetID = target.dataset.itemId
        const targetTotal = Number(target.dataset.itemTotal)

        const allItem = Object.values(itemStorage).flat()
        const targetItem = allItem.find(item => item.id === targetID)

        targetItem.stock += targetTotal

        const itemCartCard = target.closest('.itemCart')
        const index = userCart.findIndex(item => item.id === targetID)
        if (index !== -1) {userCart.splice(index, 1)}
        if (itemCartCard) {itemCartCard.remove()}

        renderCartText()
    }
})

function renderItem(data, category) {
    itemContainer.innerHTML = ''
    cartContainer.innerHTML = ''

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

function renderCart(data) {
    itemContainer.innerHTML = ''
    cartContainer.innerHTML = ''
    let cartContent = ''

    if (data.length <= 0) {
        cartContainer.innerHTML = '<h1>Cart Empty...</h1>'
        return
    }

    data.forEach(item => {
        cartContent = `
            <div class="itemCart">
                <div class="cartBox-1">
                    <h2>${item.name}</h2>
                    <h2 class="cartItemTotal">(${item.total})</h2>
                    <h2 class="cartItemPrice">$${item.price}</h2>
                    <button class="deleteButton" data-item-total="${item.total}" data-item-id="${item.id}">Delete</button>
                </div>
                <div class="cartBox-2">
                    <button class="addOrLessButton addButton" data-item-total="${item.total}" data-item-id="${item.id}">+</button>
                    <button class="addOrLessButton lessButton" data-item-total="${item.total}" data-item-id="${item.id}">-</button>
                </div>
                <hr>
            </div>
        `

        cartContainer.insertAdjacentHTML('beforeend', cartContent)
    })
}
loadDefault()