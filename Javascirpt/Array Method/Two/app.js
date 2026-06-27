// 1. STATE
let employees = [
  { id: 1, name: "Alice Smith", department: "Engineering", active: true },
  { id: 2, name: "Bob Johnson", department: "Design", active: false },
  { id: 3, name: "Charlie Brown", department: "Marketing", active: true }
];

// DOM Elements
const listContainer = document.getElementById('employee-list');
const totalActiveText = document.getElementById('total-active');
const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const filterActiveBtn = document.getElementById('filter-active-btn');

// 2. RENDER FUNCTION
function renderDashboard(dataToRender) {
  
  // TODO A: Use .map() to transform 'dataToRender' into HTML strings.
  // Requirement: If the employee is active, add class "active-staff". If not, add class "fired-staff".
  // Inside the template, create a button to fire/toggle status: `<button onclick="toggleStatus(${item.id})">Fire/Hire</button>`
  const htmlCards = dataToRender.map(item => {
    // WRITE YOUR .MAP CODE HERE
    if (item.active === true) {
        return `<div class="active-staff"> ${item.name}(${item.id}) department of ${item.department}</div>
        <button onclick="toggleStatus(${item.id})">Fire/Hire</button>`
    } else {
        return `<div class="fired-staff"> ${item.name}(${item.id}) department of ${item.department}</div>
        <button onclick="toggleStatus(${item.id})">Fire/Hire</button>`
    }
  });

  // TODO B: Join the array and insert it into listContainer using innerHTML
  // WRITE YOUR CODE HERE
  listContainer.innerHTML = htmlCards.join('')

  // Calculate statistics every time we render
  calculateActiveStaff();
}

// 3. STATS FUNCTION (Using .reduce)
function calculateActiveStaff() {
  // TODO C: Use .reduce() to count how many employees have 'active: true'.
  // Hint: If item.active is true, add 1 to the accumulator. If false, add 0.
  const totalActive = employees.reduce((accumulator, currentItem) => {
    // WRITE YOUR .REDUCE CODE HERE
    if (currentItem.active === true) {
        return accumulator + 1
    } else {
        return accumulator + 0
    }
  }, 0);

  // TODO D: Display the totalActive number inside totalActiveText innerText
  // WRITE YOUR CODE HERE
  totalActiveText.innerText = `Total actice staff: ${totalActive}`
}

// 4. TOGGLE STATUS FUNCTION (Using .map to update state)
function toggleStatus(targetID) {
  // TODO E: Use .map() on the main 'employees' array. 
  // If item.id matches targetID, flip the 'active' boolean value (true to false, or false to true).
  // Otherwise, return the item as it is.
  employees = employees.map(item => {
    // WRITE YOUR TOGGLE LOGIC HERE
    if (item.id === targetID) {
        item.active = !item.active; // Membalik nilai boolean (true jadi false, vice versa)
    }
    return item;
    })

  // TODO F: Re-render the dashboard with the updated 'employees' state
  // WRITE YOUR CODE HERE
  renderDashboard(employees)
}

// 5. ADD NEW EMPLOYEE (BONUS CHALLENGE)
addBtn.addEventListener('click', () => {
  if (nameInput.value === "") return;

  const newEmployee = {
    id: Date.now(),
    name: nameInput.value,
    department: "General",
    active: true
  };

  employees.push(newEmployee);
  nameInput.value = "";
  renderDashboard(employees);
});

// 6. FILTER ACTIVE BUTTON
filterActiveBtn.addEventListener('click', () => {
  // TODO G: Use .filter() to filter only employees where active === true
  const activeOnly = employees.filter(item => {
    return item.active === true
  })// WRITE YOUR .FILTER CODE HERE
  
  // Render only the filtered data
  renderDashboard(activeOnly);
});


// Initial run on page load
renderDashboard(employees);