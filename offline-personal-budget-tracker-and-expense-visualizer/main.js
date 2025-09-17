// DOM Elements
const budgetForm = document.getElementById("budget-form");
const expenseForm = document.getElementById("expense-form");
const budgetAmount = document.getElementById("budget-amount");
const expenseDescription = document.getElementById("expense-description");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseList = document.getElementById("expenses-list");
const totalBudget = document.getElementById("total-budget");
const totalExpenses = document.getElementById("total-expenses");
const remainingBudget = document.getElementById("remaining-budget");
const expenseChart = document.getElementById("expense-chart");

// Array for storing expenses
let expenses = [];
let budget = 0; 

// Load expenses from local storage
if(localStorage.getItem("expenses")) {
    expenses = JSON.parse(localStorage.getItem("expenses"));
}

// Load budget from local storage
if(localStorage.getItem("budget")) {
    budget = parseFloat(localStorage.getItem("budget")) || 0; 
};

// Generate random id
const generateID = () => {
    return Math.floor(Math.random() * 1000000);
}

// Expense Constructor function
function expenseGenerator(id, description, amount, category, date) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.date = date;
}

//  Handle budget form submission
function setBudget(e) {
    e.preventDefault();
    
    if(budgetAmount.value === "") {
        alert("Please this field cannot be empty");
        return;
    };

    const budgetValue = parseFloat(budgetAmount.value);
    if(isNaN(budgetValue) || budgetValue <= 0) {
        alert("Please enter a valid amount greater than zero");
        return;
    };

    // Store budget as single number
    budget = budgetValue;

    // Clear
    budgetAmount.value = "";
    updateLocalStorage();
    updateSummarySection();
    
    alert("Budget set successfully!");
}

// Sum all expenses
function calculateTotalExpenses() {
    const totalExpenses = expenses
        .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
        .toFixed(2);

    return parseFloat(totalExpenses);
}

// Get current budget
function getCurrentBudget() {
    return budget;
}

// Remaining Budget
function calculateRemainingBudget() {
    const totalExpenses = calculateTotalExpenses();
    const currentBudget = getCurrentBudget();
    const remainingBudget = (currentBudget - totalExpenses).toFixed(2);
    
    return parseFloat(remainingBudget);
};

// Update all summary numbers
function updateSummarySection() {
    totalBudget.innerText = getCurrentBudget().toFixed(2);
    totalExpenses.innerText = calculateTotalExpenses().toFixed(2);
    remainingBudget.innerText = calculateRemainingBudget().toFixed(2);
}

// Add to DOM
function addExpense(e) {
    e.preventDefault();

    // Validate inputs
    if(expenseDescription.value === "" || expenseAmount.value === "" || expenseCategoryInput.value === "") {
        alert("Please fill out all fields");
        return;
    };

    // Validate for numeric inputs
    const expenseValue = parseFloat(expenseAmount.value);

    if(isNaN(expenseValue) || expenseValue <= 0) {
        alert("Please enter a valid amount greater than zero");
        return;
    };

    // Create expense item with correct parameter order
    const expense = new expenseGenerator(
        generateID(), 
        expenseDescription.value, 
        expenseValue, 
        expenseCategoryInput.value, 
        new Date().toISOString()
    );

    // Add to the expense array
    expenses.push(expense);

    // Show on the DOM
    addExpenseDom(expense);
    updateLocalStorage();
    updateSummarySection();

    // Clear expense form
    expenseDescription.value = "";
    expenseAmount.value = "";
    expenseCategoryInput.value = "";

    alert("Expense added successfully!");
}

// Load data from localStorage on page load
function loadData() {
    if(expenses.length > 0) {
        expenses.forEach(expense => {
            addExpenseDom(expense);
        });
    }
    updateSummarySection();
}

// Add expense to DOM
function addExpenseDom(expense) {
    // Format the date
    const date = new Date(expense.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // Create li
    const expenseItemHTML = document.createElement("li");

    expenseItemHTML.classList.add("expense-item");
    expenseItemHTML.setAttribute("data-id", expense.id);
    expenseItemHTML.setAttribute("data-category", expense.category);

    expenseItemHTML.innerHTML = `
        <div class="expense-header">
            <span class="expense-description">${expense.description}</span>
            <span class="expense-amount">$${parseFloat(expense.amount).toFixed(2)}</span>
        </div>
        <div class="expense-details">
            <span class="expense-category">${expense.category}</span>
            <span class="expense-date">${formattedDate}</span>
            <div class="expense-actions">
                <button class="edit-btn" data-id="${expense.id}" onclick="editExpense(${expense.id})">Edit</button>
                <button class="delete-btn" data-id="${expense.id}" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        </div>
    `;

    expenseList.appendChild(expenseItemHTML);
}

// Delete expense
function deleteExpense(id) {
    // Find the expense to delete
    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    
    if(expenseIndex !== -1) {
        // Remove from array
        expenses.splice(expenseIndex, 1);
        
        // Remove from DOM
        const expenseElement = document.querySelector(`[data-id="${id}"]`);
        if(expenseElement) {
            expenseElement.remove();
        }
        
        // Update storage and summary
        updateLocalStorage();
        updateSummarySection();
        
        alert("Expense deleted successfully!");
    }
}

// Edit expense
function editExpense(id) {
    // Find the expense to edit
    const expense = expenses.find(expense => expense.id === id);
    
    if(expense) {
        // Populate form with current values
        expenseDescription.value = expense.description;
        expenseAmount.value = expense.amount;
        expenseCategoryInput.value = expense.category;
        
        // Delete the old expense
        deleteExpense(id);
        
        // Focus on the form
        expenseDescription.focus();
        
        alert("Edit the details and submit to update the expense");
    }
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("budget", budget.toString());
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

// Validation event listeners
budgetAmount.addEventListener("input", () => {
    const value = parseFloat(budgetAmount.value);
    
    if(budgetAmount.value !== "" && (isNaN(value) || value <= 0)) {
        budgetAmount.setCustomValidity("Please enter a valid number greater than zero.");
    } else {
        budgetAmount.setCustomValidity("");
    }
    
    budgetAmount.reportValidity();
});

expenseAmount.addEventListener("input", () => {
    const value = parseFloat(expenseAmount.value);
    
    if(expenseAmount.value !== "" && (isNaN(value) || value <= 0)) {
        expenseAmount.setCustomValidity("Please enter a valid number other than zero.");
    } else {
        expenseAmount.setCustomValidity("");
    };

    expenseAmount.reportValidity();
})

expenseCategoryInput.addEventListener("input", () => {
  if (expenseCategoryInput.value === "") {
    expenseCategoryInput.setCustomValidity("Please select a category."); 
  } else {
    expenseCategoryInput.setCustomValidity("");
  } 

  expenseCategoryInput.reportValidity();
});

expenseForm.addEventListener("submit", addExpense);
budgetForm.addEventListener("submit", setBudget);