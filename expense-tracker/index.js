// Get DOM elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transactionCount = document.getElementById("transactionCount");
const averageTransaction = document.getElementById("avgTransaction");
const text = document.getElementById("text");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const form = document.getElementById("form");
const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");
const  list = document.getElementById("list");
const clearAllBtn = document.getElementById("clearAll");

// Initialize empty array to store transaction items
let transactions = [];

// Load transactions from local storage
if (localStorage.getItem("transactions")) {
    transactions = JSON.parse(localStorage.getItem("transactions"));
}

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

    // Validate user inputs
    if (text.value.trim() === "" || category.value === "" || amount.value === "") {
        alert("Please fill in all fields");
        return;
    }

    // Validate amount
    const amountValue = parseFloat(amount.value);
    if (isNaN(amountValue) || amountValue === 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Create a transaction item
    const transaction = {
        id: generateID(),
        text: text.value.trim(),
        category: category.value,
        amount: amountValue,
        date: new Date().toISOString()
    }

    // Add created transaction to transaction array
    transactions.push(transaction);

    // Save to local storage
    updateLocalStorage();

    // Clear input fields
    text.value = "";
    category.value = "";
    amount.value = "";
    
    // Update the display
    init();
}

// Generate random number for each transaction created
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Filter and sort transaction according to user preference
function getFilteredTransaction(transactions) {

    // Create a copy to avoid mutating original array
    let filteredTransactions = [...transactions]; 

    // Filter transactions by category chosen by the user
    if (filterCategory.value !== "all") {
        filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === filterCategory.value); 
    }

    // Sort transactions 
    switch (sortBy.value) {
        case "newest":
            filteredTransactions.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case "oldest":
            filteredTransactions.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            break;
        case "highest":
            filteredTransactions.sort((a, b) => {
                return Math.abs(b.amount) - Math.abs(a.amount);
            });
            break;
        case "lowest":
            filteredTransactions.sort((a, b) => {
                return Math.abs(a.amount) - Math.abs(b.amount);
            });
            break;
        default: 
            console.log("Something went wrong. Please try again.");
            break;
    }
    
    return filteredTransactions;
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const li = document.createElement("li");

    // Format date
    const date = new Date(transaction.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // Add class based on value
    li.classList.add(transaction.amount < 0 ? "minus" : "plus");

    li.innerHTML = `
        <div class="transaction-content">
            <div class="transaction-main">
                <span class="transaction-text">${transaction.text}</span>
                <span class="transaction-amount ${transaction.amount < 0 ? 'minus' : 'plus'}">
                    ${categoryEmojis[transaction.category]} ${sign}$${Math.abs(transaction.amount)}
                </span>
            </div>
            <div class="transaction-date">${formattedDate}</div>
        </div>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">Delete</button>
    `;
    list.appendChild(li);
}

// Update balance, income, expense, transaction count and average transaction
function updateValues() {
    const amounts = transactions
    .map((transaction) => Number(transaction.amount));

    const total = amounts
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

    const totalIncome = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, count) => (acc += count), 0)
    .toFixed(2);

    const totalExpense = (amounts
        .filter((amount) => amount < 0)
        .reduce((acc, amount) => (acc += amount), 0) * -1)
        .toFixed(2);

    const count = transactions.length;
    const average = (total / count).toFixed(2);
    balance.innerText = `$${total}`;
    income.innerText = `$${totalIncome}`;
    expense.innerText = `$${totalExpense}`;
    transactionCount.innerText = count;
    averageTransaction.innerText = `$${isNaN(average) ? 0 : average}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    if (confirm("Are you sure you want to delete transaction? This action cannot be undone.")) {
        transactions = transactions.filter((transaction) => transaction.id !== id);
        updateLocalStorage();
        init();
    }
}

// Get transactions from local storage
function getTransactionsFromLocalStorage() {
    const localStorageTransactions = localStorage.getItem('transactions');
    return localStorageTransactions ? JSON.parse(localStorageTransactions) : [];
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Clear all transactions
function clearAllTransactions() {
    if (transactions.length === 0) {
        alert("No transactions to clear!");
        return;
    }
    
    if (confirm("Are you sure you want to clear all transactions? This action cannot be undone.")) {
        transactions = [];
        updateLocalStorage();
        init();
    }
}
// Initialize app
function init() {
    list.innerHTML = "";
    const filteredTransactions = getFilteredTransaction(transactions);
    
    if (filteredTransactions.length === 0) {
        // Show empty state
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <div>
                <p>No transactions found</p>
                <p style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                    ${transactions.length === 0 ? 'Add your first transaction above' : 'Try adjusting your filters'}
                </p>
            </div>
        `;
        list.appendChild(emptyState);
    } else {
        filteredTransactions.forEach(addTransactionDOM);
    }
    
    updateValues();
}
// Event listeners  
form.addEventListener("submit", addTransaction);
filterCategory.addEventListener("change", init);
sortBy.addEventListener("change", init);
clearAllBtn.addEventListener("click", clearAllTransactions);

amountInput.addEventListener("input", () => {
  const numericValue = parseFloat(amountInput.value);
  if (isNaN(numericValue) || numericValue === 0) {
    amountInput.setCustomValidity(
      "Please enter a valid number other than zero."
    );
  } else {
    amountInput.setCustomValidity("");
  }
  amountInput.reportValidity();
});

textInput.addEventListener("input", () => {
  if (textInput.value.trim() === "") {
    textInput.setCustomValidity("This field cannot be empty."); 
  } else {
    textInput.setCustomValidity("");
  }
  textInput.reportValidity();
});

categoryInput.addEventListener("input", () => {
  if (categoryInput.value === "") {
    categoryInput.setCustomValidity("Please select a category."); 
  } else {
    categoryInput.setCustomValidity("");
  } 
  categoryInput.reportValidity();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (text.value.trim() && category.value && amount.value) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear form
    if (e.key === "Escape") {
        text.value = "";
        category.value = "";
        amount.value = "";
        text.focus();
    }
});

init();