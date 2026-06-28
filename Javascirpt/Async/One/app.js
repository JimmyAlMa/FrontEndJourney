// 1. GLOBAL STATE (To store data from internet)
let fetchedData = [];

// DOM Elements
const storeContainer = document.getElementById('store-list');
const totalPriceText = document.getElementById('total-price');
const btnAll = document.getElementById('btn-all');
const btnCheap = document.getElementById('btn-cheap');

// 2. FETCH DATA FROM API (Using Async/Await)
async function fetchProducts() {
  try {
    // TODO A: Fetch data from 'https://fakestoreapi.com/products'
    // 1. Call fetch() and await the response
    // 2. Convert the response to JSON and save it into the global variable 'fetchedData'
    // WRITE YOUR FETCH CODE HERE
    const response = await fetch("https://fakestoreapi.com/products")

    const data = await response.json()

    fetchedData = data
    
    // After successfully fetching, render all products
    renderStore(fetchedData);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// 3. RENDER FUNCTION (Using .map)
function renderStore(productsArray) {
  // TODO B: Use .map() to transform 'productsArray' into HTML strings.
  // Properties available from API: item.title, item.price, item.category
  const htmlCards = productsArray.map(item => {
    // WRITE YOUR .MAP CODE HERE
    return `
        <div>
            <h3>Product: ${item.title}</h3>
            <h4>Price: ${item.price}</h4>
            <h4>Category: ${item.category}</h4>
        </div>
    `
  });

  storeContainer.innerHTML = htmlCards.join('')

  // Calculate total price for the currently displayed products
  calculateValuation(productsArray);
}

// 4. STATS FUNCTION (Using .reduce)
function calculateValuation(productsArray) {
  // TODO C: Use .reduce() to calculate the total sum of ALL 'price' in the 'productsArray'.
  const total = productsArray.reduce((accumulator, currentItem) => {
    return accumulator = currentItem.price + accumulator
    // WRITE YOUR .REDUCE CODE HERE
  }, 0);

  // TODO D: Display the fixed total price (2 decimal places) inside totalPriceText innerText
  // Hint: use total.toFixed(2)
  totalPriceText.innerText = total.toFixed(2);
}

// 5. EVENT LISTENERS
btnAll.addEventListener('click', () => {
  // Just render the original fetched data
  renderStore(fetchedData);
});

btnCheap.addEventListener('click', () => {
  // TODO E: Use .filter() on 'fetchedData' to get products where price is LESS THAN 50 (< 50)
  const cheapItems = fetchedData.filter(item => {
    return item.price < 50
  })// WRITE YOUR .FILTER CODE HERE

  // Render only the cheap items
  renderStore(cheapItems);
});

// Run fetch automatically when page loads
fetchProducts();