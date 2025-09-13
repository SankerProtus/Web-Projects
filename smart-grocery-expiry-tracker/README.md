# 🥬 Smart Grocery Expiry Tracker

> ♻️ **Reduce food waste by keeping track of your groceries!**

A modern, responsive web application that helps you track grocery items and their expiry dates to minimize food waste. The app provides intelligent notifications and visual indicators to help you use your groceries before they expire.

## ✨ Features

### 🛒 **Grocery Management**
- **Add Items**: Easily add grocery items with name, category, and expiry date
- **Delete Items**: Remove items with confirmation dialog to prevent accidental deletion
- **Persistent Storage**: All data is saved in localStorage and persists across browser sessions

### 📊 **Smart Expiry Tracking**
- **Automatic Calculation**: Real-time calculation of days remaining until expiry
- **Color-Coded Status**:
  - 🟢 **Safe**: 8+ days remaining (Green)
  - 🟡 **Warning**: 1-7 days remaining (Yellow/Orange)
  - 🔴 **Expired**: Past expiry date (Red)
- **Dynamic Text**: Shows exact days left or "Expires today" or "Expired X days ago"

### 🔔 **Intelligent Notifications**
- Real-time alerts for items expiring within 3 days
- Smart notification system that updates automatically
- Clear visual indicators for urgent items

### 🎛️ **Advanced Filtering & Sorting**
- **Filter by Category**: 
  - 🍎 Fruits
  - 🥦 Vegetables  
  - 🥛 Dairy
  - 🍗 Meat
  - 🍞 Bakery
  - 🥤 Beverages
  - 🍪 Snacks
  - 📦 Others
- **Sort by**: Name (A-Z), Expiry Date, or Category

### 📱 **Responsive Design**
- **Desktop**: Clean table layout with equal column spacing
- **Mobile**: Card-based layout optimized for touch interaction
- **Touch-Friendly**: Optimized buttons and spacing for mobile devices

## 🖥️ **Screenshots**

### Desktop View (Table Layout)
- Clean, professional table with equal column spacing
- Color-coded left borders for quick status identification
- Hover effects and smooth animations

### Mobile View (Card Layout)
- Stacked card design for easy mobile navigation
- Touch-friendly buttons and generous spacing
- All information clearly visible in compact format

## 🛠️ **Technologies Used**

- **HTML5**: Semantic markup with modern structure
- **CSS3**: 
  - Flexbox and CSS Grid for layouts
  - CSS Custom Properties
  - Smooth animations and transitions
  - Responsive design with media queries
- **Vanilla JavaScript**: 
  - ES6+ features (arrow functions, template literals, destructuring)
  - DOM manipulation
  - Event handling
  - localStorage API
  - Date manipulation
- **Google Fonts**: Poppins font family for modern typography

## 🚀 **Getting Started**

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation
1. **Clone or Download** the repository
2. **Open `index.html`** in your web browser
3. **Start tracking** your groceries immediately!

```bash
# If using git
git clone https://github.com/SankerProtus/Web-Projects.git
cd smart-grocery-expiry-tracker

# Then open index.html in your browser
```

## 📖 **How to Use**

### Adding Items
1. 📝 Enter the **item name** (e.g., "Milk", "Bananas")
2. 📅 Select the **expiry date** using the date picker
3. 🏷️ Choose the appropriate **category** from the dropdown
4. ✅ Click **"Add Item"** to save

### Managing Items
- 👀 **View**: Items automatically appear in the list with color-coded status
- 🗂️ **Filter**: Use the category dropdown to filter by type
- 📊 **Sort**: Choose sorting method (name, expiry date, or category)
- 🗑️ **Delete**: Click the delete button and confirm to remove items

### Understanding Status
- **Green Border/Text**: Item is safe (8+ days remaining)
- **Yellow/Orange Border/Text**: Warning - use soon (1-7 days)
- **Red Border/Text**: Expired - should be discarded

## 🎨 **Design Features**

### Visual Design
- **Modern Gradient Background**: Subtle gray gradient for visual appeal
- **Card-Based UI**: Clean, professional appearance with shadow effects
- **Color Psychology**: Green for safe, yellow for caution, red for danger
- **Emoji Integration**: Friendly emoji icons throughout the interface

### User Experience
- **Instant Feedback**: Real-time updates and calculations
- **Confirmation Dialogs**: Prevents accidental data loss
- **Empty States**: Helpful messages when no items are present
- **Loading States**: Smooth transitions and animations

### Accessibility
- **Semantic HTML**: Proper heading structure and form labels
- **Keyboard Navigation**: Full keyboard accessibility support
- **Color Contrast**: Meets WCAG guidelines for readability
- **Responsive Text**: Scales appropriately across device sizes

## 🔧 **Technical Implementation**

### Data Structure
```javascript
{
  id: 123456,
  name: "Milk",
  expirydate: "2025-09-20",
  category: "dairy",
  date: "2025-09-13T10:30:00.000Z"
}
```

### Key Functions
- `calculateExpiryStatus()`: Determines days remaining and status
- `addGroceryToDOM()`: Creates responsive UI elements
- `getFilteredGroceries()`: Handles filtering and sorting
- `updateNotifications()`: Manages urgent item alerts

### Responsive Breakpoints
- **Mobile**: < 768px (Card layout)
- **Desktop**: ≥ 768px (Table layout)

## 🤝 **Contributing**

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📖 Improve documentation

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 **Author**

Created with ❤️ to help reduce food waste and make grocery management easier.

---

**Start tracking your groceries today and join the fight against food waste!** 🌱