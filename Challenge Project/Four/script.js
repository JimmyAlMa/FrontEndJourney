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
    renderItem(itemStorage.vegetables)
}

navBar.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('vegetable')) {
        renderItem(itemStorage.vegetables)
    }

    if (target.classList.contains('snack')) {
        renderItem(itemStorage.snack)
    }

    if (target.classList.contains('toy')) {
        renderItem(itemStorage.toy)
    }
})

function renderItem(data) {
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
            <div class="itemBox">
                <h2>${item.name}</h2>
                <h3>Price: ${item.price}$</h3>
                <h3>Stock: ${item.stock}</h3>
            </div>
        `
    });
    itemContainer.innerHTML = containerContent
}
loadDefault()