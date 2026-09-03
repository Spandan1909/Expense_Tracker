/* ============================================================
   Expense Tracker - script.js
   Handles: adding, deleting, filtering, calculating totals,
   rendering expenses, and localStorage persistence.
   ============================================================ */

// ----- Grab references to DOM elements -----
const expenseForm = document.getElementById('expenseForm');
const nameInput = document.getElementById('expenseName');
const amountInput = document.getElementById('expenseAmount');
const categoryInput = document.getElementById('expenseCategory');
const nameError = document.getElementById('nameError');
const amountError = document.getElementById('amountError');

const expenseList = document.getElementById('expenseList');
const emptyMessage = document.getElementById('emptyMessage');
const totalAmountEl = document.getElementById('totalAmount');
const totalCountEl = document.getElementById('totalCount');
const categoryFilter = document.getElementById('categoryFilter');

// Key used to store expenses in localStorage
const STORAGE_KEY = 'expenseTrackerData';

// In-memory array of expenses, loaded from localStorage on start
let expenses = loadExpenses();

// ----- localStorage helpers -----

// Load expenses from localStorage (returns an empty array if none exist)
function loadExpenses() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save the current expenses array to localStorage
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// ----- Validation -----

// Validates form inputs and displays error messages if invalid.
// Returns true if the form is valid, false otherwise.
function validateForm(name, amount) {
  let isValid = true;

  // Reset previous error messages
  nameError.textContent = '';
  amountError.textContent = '';

  if (name === '') {
    nameError.textContent = 'Expense name cannot be empty.';
    isValid = false;
  }

  if (isNaN(amount) || amount <= 0) {
    amountError.textContent = 'Amount must be greater than 0.';
    isValid = false;
  }

  return isValid;
}

// ----- Core operations -----

// Adds a new expense to the array, saves it, and re-renders the list
function addExpense(name, amount, category) {
  const newExpense = {
    id: Date.now(),          // unique id based on timestamp
    name: name,
    amount: amount,
    category: category,
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  };

  expenses.push(newExpense);
  saveExpenses();
  renderExpenses();
}

// Removes an expense by id, saves the updated array, and re-renders the list
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpenses();
}

// Calculates the total amount spent from a list of expenses
function calculateTotal(list) {
  return list.reduce((sum, expense) => sum + expense.amount, 0);
}

// Returns the expenses filtered by the currently selected category
function getFilteredExpenses() {
  const selectedCategory = categoryFilter.value;
  if (selectedCategory === 'All') {
    return expenses;
  }
  return expenses.filter(expense => expense.category === selectedCategory);
}

// ----- Rendering -----

// Renders the expense list, summary totals, and empty-state message
function renderExpenses() {
  const filteredExpenses = getFilteredExpenses();

  // Clear the current list before re-rendering
  expenseList.innerHTML = '';

  if (filteredExpenses.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';

    // Show the most recent expenses first
    const sorted = [...filteredExpenses].sort((a, b) => b.id - a.id);

    sorted.forEach(expense => {
      const li = document.createElement('li');
      li.className = 'expense-item';

      li.innerHTML = `
        <div class="expense-info">
          <span class="expense-name">${escapeHTML(expense.name)}</span>
          <span class="expense-meta">
            <span class="expense-category">${expense.category}</span>${expense.date}
          </span>
        </div>
        <div class="expense-right">
          <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
          <button class="btn-delete" data-id="${expense.id}">Delete</button>
        </div>
      `;

      expenseList.appendChild(li);
    });
  }

  // Update summary cards based on the FULL list (not just the filtered view)
  totalAmountEl.textContent = `₹${calculateTotal(expenses).toFixed(2)}`;
  totalCountEl.textContent = expenses.length;
}

// Escapes HTML special characters to prevent broken markup from user input
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ----- Event listeners -----

// Handle form submission for adding a new expense
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!validateForm(name, amount)) {
    return; // stop here if validation fails
  }

  addExpense(name, amount, category);

  // Reset the form for the next entry
  expenseForm.reset();
  nameInput.focus();
});

// Handle delete button clicks using event delegation
expenseList.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete')) {
    const id = Number(event.target.getAttribute('data-id'));
    deleteExpense(id);
  }
});

// Re-render the list whenever the category filter changes
categoryFilter.addEventListener('change', renderExpenses);

// ----- Initial render on page load -----
renderExpenses();
