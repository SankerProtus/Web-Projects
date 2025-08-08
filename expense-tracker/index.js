// Select elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transactionCount = document.getElementById("transactionCount");
const avgTransaction = document.getElementById("avgTransaction");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");

// Get transactions from memory or initialize empty
let transactions = [];

// Category emojis
const categoryEmojis = {
  food: "🍔",
  transport: "🚗",
  entertainment: "🎬",
  shopping: "🛍️",
  bills: "💡",
  salary: "💼",
  freelance: "💻",
  investment: "📈",
  other: "❓",
};

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (
    text.value.trim() === "" ||
    amount.value.trim() === "" ||
    category.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
    category: category.value,
    date: new Date().toISOString(),
  };

  transactions.push(transaction);
  updateDisplay();

  text.value = "";
  amount.value = "";
  category.value = "";
}

// Generate random ID
function generateID() {
  return Date.now() + Math.random();
}

// Get filtered and sorted transactions
function getFilteredTransactions() {
  let filtered = transactions;

  // Filter by category
  if (filterCategory.value !== "all") {
    filtered = filtered.filter((t) => t.category === filterCategory.value);
  }

  // Sort transactions
  switch (sortBy.value) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "highest":
      filtered.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      break;
    case "lowest":
      filtered.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      break;
  }

  return filtered;
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    <div class="transaction-info">
        <div class="transaction-text">${transaction.text}</div>
        <div class="transaction-category">${
          categoryEmojis[transaction.category]
        } ${transaction.category}</div>
    </div>
    <div class="transaction-amount ${
      transaction.amount < 0 ? "minus" : "plus"
    }">${sign}$${Math.abs(transaction.amount).toFixed(2)}</div>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">Delete</button>
`;

  list.appendChild(item);
}

// Update all values and display
function updateDisplay() {
  updateValues();
  updateTransactionList();
  updateStats();
}

// Update income, expense, and balance
function updateValues() {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const incomeTotal = amounts
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expenseTotal = (
    amounts.filter((val) => val < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `+$${incomeTotal}`;
  expense.innerText = `-$${expenseTotal}`;
}

// Update stats
function updateStats() {
  const count = transactions.length;
  const avgAmount =
    count > 0
      ? (
          transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0) / count
        ).toFixed(2)
      : "0.00";

  transactionCount.innerText = count;
  avgTransaction.innerText = `$${avgAmount}`;
}

// Update transaction list
function updateTransactionList() {
  list.innerHTML = "";
  const filtered = getFilteredTransactions();

  if (filtered.length === 0) {
    list.innerHTML =
      '<div class="empty-state"><div>📝</div><p>No transactions found</p></div>';
  } else {
    filtered.forEach(addTransactionDOM);
  }
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateDisplay();
}

// Event listeners
form.addEventListener("submit", addTransaction);
filterCategory.addEventListener("change", updateTransactionList);
sortBy.addEventListener("change", updateTransactionList);

// Initial render
updateDisplay();
