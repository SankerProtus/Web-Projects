# 💰 Personal Budget Tracker & Expense Visualizer

A responsive web application for tracking personal budgets and expenses with real-time calculations and data persistence. Built with vanilla JavaScript, HTML5, and CSS3.

## 🌟 Features

### ✨ Core Functionality
- **Budget Management**: Set and update personal budget with validation
- **Expense Tracking**: Add, edit, and delete expenses with categorization
- **Real-time Calculations**: Automatic budget vs. expense calculations
- **Data Persistence**: All data saves locally using localStorage
- **Responsive Design**: Mobile-first approach for all devices

### 💼 Professional UI/UX
- **Category System**: Organized expense categorization
- **Form Validation**: Comprehensive input validation and error handling
- **Interactive Elements**: Smooth animations and hover effects

### 📊 Smart Analytics
- **Budget Overview**: Total budget, expenses, and remaining amount
- **Category Breakdown**: Expenses organized by categories
- **Real-time Updates**: Instant calculation updates
- **Expense History**: Complete transaction history with dates

## 🚀 Live Demo

```bash
# Clone the repository
git clone https://github.com/SankerProtus/Web-Projects.git

# Navigate to the project
cd Web-Projects/offline-personal-budget-tracker-and-expense-visualizer

```

## 🛠️ Technical Implementation

### Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser localStorage API
- **Design**: CSS Grid, Flexbox, CSS Custom Properties
- **Fonts**: Google Fonts (Inter family)
- **Responsive**: Mobile-first responsive design

### Key Code Features
```javascript
// Constructor pattern for expense objects
function expenseGenerator(id, description, amount, category, date) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.date = date;
}

// Real-time budget calculations
function calculateRemainingBudget() {
    const totalExpenses = calculateTotalExpenses();
    const currentBudget = getCurrentBudget();
    return (currentBudget - totalExpenses).toFixed(2);
}
```

### Architecture Highlights
- **Modular Functions**: Clean separation of concerns
- **Event-Driven**: Responsive to user interactions
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Graceful error management
- **Performance**: Optimized DOM manipulation

## 📋 Usage Guide

### Setting Your Budget
1. Enter your budget amount in the "Set Budget" section
2. Click "Set Budget" to save
3. Budget will persist across browser sessions

### Adding Expenses
1. Fill in expense description
2. Enter the amount (validated for positive numbers)
3. Select a category from the dropdown
4. Click "Add Expense" to save

### Managing Expenses
- **Edit**: Click the edit button on any expense to modify
- **Delete**: Click the delete button to remove an expense
- **View**: All expenses display with date, category, and amount

### Real-time Updates
- Budget summary updates automatically
- Remaining budget calculates in real-time
- All changes persist immediately

## 🔧 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- HTTP server (for local development)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎖️ Credits

**Developer**: [SankerProtus](https://github.com/SankerProtus)
**Project Type**: Personal Finance Management Application
**Build Date**: September 2025
**Status**: Production Ready

---

**⭐ If you found this project helpful, please give it a star!**

**🐛 Found a bug or have a suggestion? [Open an issue](../../issues)**
