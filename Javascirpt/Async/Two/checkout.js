// DOM Elements
const loadingText = document.getElementById('loading');
const customerContainer = document.getElementById('customer-info');
const itemsContainer = document.getElementById('items-list');
const totalContainer = document.getElementById('checkout-total');
const payBtn = document.getElementById('pay-btn');

// MAIN ASYNC FUNCTION
async function loadCheckoutPage() {
  try {
    // TODO A: Fetch Customer Data
    // 1. Fetch from 'https://fakestoreapi.com/users/1'
    // 2. Convert to JSON and save to a variable named 'user'
    // WRITE CODE HERE
    const userResponse = await fetch("https://fakestoreapi.com/users/1")
    const userData = await userResponse.json()
    const user = userData


    // TODO B: Fetch Products Data
    // 1. Fetch from 'https://fakestoreapi.com/products?limit=3'
    // 2. Convert to JSON and save to a variable named 'products'
    // WRITE CODE HERE
    const productResponse = await fetch("https://fakestoreapi.com/products?limit=3")
    const productData = await productResponse.json()
    const products = productData


    // Hide loading text once data arrives
    loadingText.style.display = 'none';

    // DISPLAY DATA
    renderCustomer(user);
    renderItems(products);

  } catch (error) {
    loadingText.innerText = "Error loading checkout data. Please refresh.";
    console.error("Transaction failed:", error);
  }
}

// 2. RENDER CUSTOMER INFO
function renderCustomer(userData) {
  // TODO C: Display the customer details inside customerContainer.innerHTML
  // Properties available from API: 
  // - userData.username
  // - userData.email
  // - userData.name.firstname and userData.name.lastname
  // WRITE CODE HERE
  customerContainer.innerHTML = 
    `
        <div>
            <h2>Username: ${userData.username}</h2>
            <h3>Email: ${userData.email}</h3>
            <h4>First name: ${userData.name.firstname}</h4>
            <h4>last name: ${userData.name.lastname}</h4>
        </div>
    `
}

// 3. RENDER ITEMS & CALCULATE TOTAL
function renderItems(productsArray) {
  // TODO D: Use .map() to loop through 'productsArray' and display each product item
  // Properties available: item.title, item.price
  const htmlItems = productsArray.map(item => {
      return `
        <div>
              <h2>Item: ${item.title}</h2>
              <h2>Price: ${item.price}</h2>
        </div>
        `
      
    // WRITE YOUR .MAP CODE HERE
  });
  
  itemsContainer.innerHTML = htmlItems.join('');

  // TODO E: Use .reduce() to calculate the grand total price of all items
  const grandTotal = productsArray.reduce((accumulator, currentItem) => {
    return accumulator = currentItem.price + accumulator
  }, 0)// WRITE YOUR .REDUCE CODE HERE

  // TODO F: Display the grand total fixed to 2 decimal places inside totalContainer.innerHTML
  // Example output format: `<div class="total-section">Grand Total: $123.45</div>`
  // WRITE CODE HERE
  totalContainer.innerHTML = `<div class="total-section">Grand Total: ${grandTotal.toFixed(2)}</div>`


  // Show the payment button after everything is loaded
  payBtn.style.display = 'block';
}

// 4. SIMULATE PAYMENT (Bonus Logic)
function processPayment() {
  alert("🎉 Payment Successful! Thank you for shopping with Jim's Store.");
}

// Run the application safely using DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  loadCheckoutPage();
});