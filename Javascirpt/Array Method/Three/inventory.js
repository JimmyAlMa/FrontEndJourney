// 1. STATE
let products = [
  { id: 501, name: "MacBook Pro M3", stock: 12 },
  { id: 502, name: "Logitech MX Master 3S", stock: 0 },
  { id: 503, name: "Dell UltraSharp 27\"", stock: 5 }
];

// DOM Elements
const inventoryContainer = document.getElementById('inventory-list');
const totalItemsText = document.getElementById('total-items');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterEmptyBtn = document.getElementById('filter-empty-btn');

// 2. RENDER FUNCTION
function renderInventory(dataToRender) {
  
  // TODO A: Use .map() to transform 'dataToRender' into HTML strings.
  // Requirement: If stock is 0, add the class "out-of-stock" to the div wrapper.
  // Inside the template, create 2 buttons: 
  // 1. Plus button: `<button class="btn-action" onclick="changeStock(${item.id}, 1)"> + </button>`
  // 2. Minus button: `<button class="btn-action" onclick="changeStock(${item.id}, -1)"> - </button>`
  const htmlItems = dataToRender.map(item => {
    if (dataToRender.stock === 0) {
        return `<div>${item.name}(${item.id}) Stock: Out of stock <button class="btn-action" onclick="changeStock(${item.id}, 1)"> + </button><button class="btn-action" onclick="changeStock(${item.id}, -1)"> - </button></div>`
    } else {
        return `<div>${item.name}(${item.id}) Stock: ${item.stock} <button class="btn-action" onclick="changeStock(${item.id}, 1)"> + </button><button class="btn-action" onclick="changeStock(${item.id}, -1)"> - </button></div>`
    }
    // WRITE YOUR .MAP CODE HERE
  });

  // TODO B: Join the array and insert it into inventoryContainer using innerHTML
  inventoryContainer.innerHTML = htmlItems.join('')
  // WRITE YOUR CODE HERE

  // Calculate statistics every time we render
  calculateTotalStock();
}

// 3. STATS FUNCTION (Using .reduce)
function calculateTotalStock() {
  // TODO C: Use .reduce() to calculate the total sum of ALL 'stock' in the 'products' array.
  const grandTotal = products.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.stock
    // WRITE YOUR .REDUCE CODE HERE
  }, 0);

  // TODO D: Display the grandTotal number inside totalItemsText innerText
  totalItemsText.innerText = grandTotal
  // WRITE YOUR CODE HERE
}

// 4. UPDATE STOCK FUNCTION (Using .map)
function changeStock(targetID, amount) {
  // TODO E: Use .map() on the main 'products' array.
  // If item.id matches targetID, update its stock by adding the 'amount' (can be +1 or -1).
  // Protection: Stock cannot go below 0! If item.stock + amount < 0, keep it 0.
  products = products.map(item => {
    if (item.id === targetID) {
        item.stock = item.stock + amount
        if (item.stock < 0) {
            item.stock = 0
        }
    } 
    return item
    // WRITE YOUR UPDATE LOGIC HERE
  });

  // TODO F: Re-render the dashboard with the updated 'products' state
  renderInventory(products)
  // WRITE YOUR CODE HERE
}

// 5. SEARCH FEATURE (Using .filter)
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  
  // TODO G: Use .filter() to find items where item.name contains the search query.
  // Hint: Use item.name.toLowerCase().includes(query)
  const filteredProducts = products.filter(item => {
    return item.name.toLowerCase().includes(query)
  })// WRITE YOUR .FILTER CODE HERE

  // Render the filtered results
  renderInventory(filteredProducts);
});

// 6. FILTER OUT OF STOCK
filterEmptyBtn.addEventListener('click', () => {
  // TODO H: Use .filter() to get only products where stock === 0
  const emptyStock = products.filter(item => {
    return item.stock === 0
  })// WRITE YOUR .FILTER CODE HERE

  renderInventory(emptyStock);
});


// Initial run on page load
renderInventory(products);