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
    updateExpenseChart(); // Update chart when summary changes
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

// Add expense to DOM
function addExpenseDom(expense) {
    // Format the date
    const date = new Date(expense.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
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

// ===== EXPENSE DISTRIBUTION CHART FUNCTIONALITY =====

let expenseChartInstance = null;

// Initialize chart on page load
function initializeChart() {
    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet, retrying...');
        setTimeout(initializeChart, 100);
        return;
    }
    
    console.log('Chart.js loaded, initializing chart...');
    updateExpenseChart();
}

// Calculate category totals for chart
function calculateCategoryTotals() {
    const categoryTotals = {};
    
    if (!expenses || expenses.length === 0) {
        console.log('No expenses found for chart');
        return categoryTotals;
    }
    
    expenses.forEach(expense => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);
        
        if (!isNaN(amount)) {
            if (categoryTotals[category]) {
                categoryTotals[category] += amount;
            } else {
                categoryTotals[category] = amount;
            }
        }
    });
    
    console.log('Category totals calculated:', categoryTotals);
    return categoryTotals;
}

// Update expense distribution chart
function updateExpenseChart() {
    console.log('Updating expense chart...');
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not available, skipping chart update');
        return;
    }
    
    const categoryTotals = calculateCategoryTotals();
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    
    console.log('Chart data - Categories:', categories, 'Amounts:', amounts);
    
    const canvas = document.getElementById('expense-chart');
    if (!canvas) {
        console.error('Chart canvas not found');
        return;
    }
    
    // Destroy existing chart if it exists
    if (expenseChartInstance) {
        console.log('Destroying existing chart');
        expenseChartInstance.destroy();
        expenseChartInstance = null;
    }
    
    // If no expenses, show empty state
    if (categories.length === 0) {
        console.log('No categories to display, clearing chart');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw empty state message
        ctx.font = '16px Inter, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText('No expenses yet. Add some expenses to see the distribution.', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Chart colors
    const backgroundColors = [
        '#FF6384', 
        '#36A2EB', 
        '#FFCE56', 
        '#4BC0C0', 
        '#9966FF', 
        '#FF9F40', 
        '#FF6B6B', 
        '#4ECDC4', 
        '#45B7D1', 
        '#96CEB4' 
    ];
    
    try {
        const ctx = canvas.getContext('2d');
        
        // Create new chart
        expenseChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Expense Amount',
                    data: amounts,
                    backgroundColor: backgroundColors.slice(0, categories.length),
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 0
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Expense Distribution by Category',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: 'Inter'
                        },
                        color: '#1e293b',
                        padding: 10
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12,
                                family: 'Inter'
                            },
                            color: '#475569'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#64748b',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = amounts.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
        
        console.log('Chart created successfully');
        
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}

// Enhanced load data function
function loadData() {
    console.log('Loading data...');
    console.log('Expenses from localStorage:', expenses);
    
    if(expenses.length > 0) {
        expenses.forEach(expense => {
            addExpenseDom(expense);
        });
    }
    updateSummarySection();
    
    // Initialize chart after data is loaded
    setTimeout(() => {
        initializeChart();
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded');
    loadData();
});