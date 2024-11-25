const form = document.getElementById('order-form');
const tableBody = document.querySelector('#order-table tbody');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('customer-name').value;
  const coffeeType = document.getElementById('coffee-type').value;
  const coffeeSize = document.getElementById('coffee-size').value;

  const order = { name, coffeeType, coffeeSize };

  // Save order to localStorage
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Add new order to the table
  addOrderToTable(order, orders.length - 1);

  // Reset form
  form.reset();
});

// Function to add an order row to the table
function addOrderToTable(order, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${order.name}</td>
    <td>${order.coffeeType}</td>
    <td>${order.coffeeSize}</td>
    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
  `;
  tableBody.appendChild(row);
}

// Load orders from localStorage when the page loads
window.onload = function () {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.forEach((order, index) => addOrderToTable(order, index));
};

// Handle the remove button click
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;

    // Remove from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Reload the table to reflect changes
    refreshTable();
  }
});

// Refresh table to update indices after removal
function refreshTable() {
  tableBody.innerHTML = ''; // Clear existing rows
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.forEach((order, index) => addOrderToTable(order, index));
}
