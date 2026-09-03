# Expense Tracker

A simple, clean, and fully responsive expense tracker web app built with vanilla HTML, CSS, and JavaScript. Add your daily expenses, categorize them, filter them, and track your total spending — all data is saved locally in your browser, so nothing is lost on refresh.

## Features

- Add expenses with a name, amount (₹), and category
- Categories: Food, Transport, Shopping, Entertainment, Education, Other
- View total amount spent and total number of transactions at a glance
- Each expense displays its name, amount, category, date, and a delete button
- Filter expenses by category (or view all)
- Data persists across page refreshes using `localStorage`
- Input validation (expense name required, amount must be greater than 0)
- Clean, modern, card-based UI that works on both desktop and mobile

## Technologies Used

- **HTML5** — page structure
- **CSS3** — styling, layout (Flexbox & Grid), and responsive design
- **Vanilla JavaScript (ES6)** — all app logic, DOM manipulation, and localStorage handling

No frameworks, libraries, backend, or database are used — this is a pure front-end project.

## How the Application Works

1. When you fill out the "Add Expense" form and submit it, JavaScript validates the inputs (name not empty, amount greater than 0).
2. If valid, a new expense object (with a unique ID and today's date) is created and added to an in-memory array.
3. That array is immediately saved to the browser's `localStorage`, so the data survives page refreshes.
4. The expense list, total spent, and transaction count are then re-rendered on the page.
5. You can filter the visible list by category using the dropdown — this only changes what's displayed, not the underlying data.
6. Clicking "Delete" on any expense removes it from the array, updates `localStorage`, and re-renders the list.

## How to Run It Locally

No build tools or installations are required.

1. Download or clone this repository:
   ```
   git clone https://github.com/Spandan1909/Expense-Tracker.git
   ```
2. Open the project folder.
3. Double-click `index.html` to open it in your browser (or right-click → "Open with" your preferred browser).

That's it — the app runs entirely in the browser.

## What I Learned From Building This

- How to structure a small front-end project cleanly across separate HTML, CSS, and JS files
- How to use `localStorage` to persist data without a backend or database
- How to perform CRUD-style operations (create and delete) on data stored purely in the browser
- How to use array methods like `reduce()` and `filter()` for calculating totals and filtering data
- How to build a responsive layout using CSS Grid and Flexbox
- The importance of basic input validation and giving users clear feedback
- How to organize JavaScript into small, single-purpose functions for readability and maintainability
