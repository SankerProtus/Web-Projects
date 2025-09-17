const form = document.getElementById("grocery-form");
const itemName = document.getElementById("item-name");
const expiryDate = document.getElementById("expiry-date");
const category = document.getElementById("category");
const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");
const container = document.getElementById("grocery-list");
const notification = document.getElementById("notifications");

// Initialize store
let groceries = [];

// Load groceries from local storage
if(localStorage.getItem("groceries")) {
    groceries = JSON.parse(localStorage.getItem("groceries"));
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
};

// Grocery constructor
function Grocery(id, name, expirydate, category, date) {
    this.id = id;
    this.name = name;
    this.expirydate = expirydate;
    this.category = category;
    this.date = date
}

// Create grocery
function addGrocery(e) {
    e.preventDefault();

    // Validate inputs
    if (itemName.value === "" || expiryDate.value === "" || category.value === "") {
        alert("Please fill out all fields.");
        return;
    };

    // Create grocery
    const groceryItem = new Grocery(id = generateID(), itemName.value, expiryDate.value, category.value, new Date().toISOString()); 

    // OR

    // Create grocery
    // const groceryItem = {
    //     id: generateID(),
    //     name: itemName.value,
    //     expirydate: expiryDate.value,
    //     category: category.value,
    //     date: new Date().toISOString(),
    // };

    // Store item in the array
    groceries.push(groceryItem);

    // Clear inputs fields
    itemName.value = "";
    expiryDate.value = "";
    category.value = "";

    updateLocalStorage();
    init();
}

// Calculate expiry date and status
function calculateExpiryStatus(expiryDateString) {
    const expiryDate = new Date(expiryDateString);
    const today = new Date();
    
    // Set both dates to midnight for accurate day comparison
    expiryDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    // Determine status based on days left
    let status;
    if (daysLeft < 0) {
        status = 'expired';
    } else if (daysLeft <= 7) {
        status = 'warning';
    } else {
        status = 'safe';
    }
    
    return {
        daysLeft: daysLeft,
        status: status
    };
}

// Update DOM dynamically
function addGroceryToDOM(grocery) {
    const groceryExpiryDate = new Date(grocery.expirydate);
    const formattedDate = groceryExpiryDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Calculate expiry status
    const expiryInfo = calculateExpiryStatus(grocery.expirydate);

    // Determine days display text
    let daysText;
    if (expiryInfo.daysLeft < 0) {
        daysText = `Expired ${Math.abs(expiryInfo.daysLeft)} day${Math.abs(expiryInfo.daysLeft) !== 1 ? 's' : ''} ago`;
    } else if (expiryInfo.daysLeft === 0) {
        daysText = 'Expires today';
    } else {
        daysText = `${expiryInfo.daysLeft} day${expiryInfo.daysLeft !== 1 ? 's' : ''} left`;
    }

    // Check if we should use table layout
    if (window.innerWidth >= 768) {
        // Create table row for larger screens
        const tr = document.createElement("tr");
        tr.classList.add(expiryInfo.status);
        
        tr.innerHTML = `
            <td class="item-name">${grocery.name}</td>
            <td class="category">${grocery.category}</td>
            <td class="expiry-date">${formattedDate}</td>
            <td class="status-cell">${daysText}</td>
            <td class="actions">
                <button class="delete-btn" onclick="removeGrocery(${grocery.id})">Delete</button>
            </td>
        `;
        
        return tr;
    } else {
        // Create card layout for mobile screens
        const li = document.createElement("li");
        li.classList.add(expiryInfo.status, 'grocery-card');

        li.innerHTML = `
            <div class="item">
                <div class="item-info">
                    <h3 class="item-name">${grocery.name}</h3>
                    <p class="category-label">${grocery.category}</p>
                    <p class="expiry-label">Expiry Date</p>
                    <p class="date">${formattedDate}</p>
                </div>
                        
                <div class="item-actions">
                    <p class="status-text">${daysText}</p>
                    <button class="delete-btn" onclick="removeGrocery(${grocery.id})">Delete</button>
                </div>
            </div>
        `;
        
        return li;
    }
}

// Filter and sort
function getFilteredGroceries(groceries) {
    let filteredGroceries = groceries;

    // Filter 
    if (filterCategory.value !== "all") {
        filteredGroceries = filteredGroceries.filter((item) => item.category === filterCategory.value)
    }

    // Sort 
    switch(sortBy.value) {
        case "name":
            filteredGroceries.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "expiry":
            filteredGroceries.sort((a, b) => new Date(a.expirydate) - new Date(b.expirydate));
            break;
        case "category":
            filteredGroceries.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case "":
        default:
            // No sorting applied when "Sort By" is selected or for unknown values
            break;
    }

    return filteredGroceries;
}

// Remove groceries
function removeGrocery(id) {
    if (confirm("Are you sure you want to delete grocery? This action cannot be undone.")) {
        groceries = groceries.filter((grocery) => (grocery.id !== id));
        updateLocalStorage();
        init();
    };
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("groceries", JSON.stringify(groceries));
}

// Initialize app
function init() {
    const container = document.getElementById("grocery-list");
    container.innerHTML = "";
    const filteredGroceries = getFilteredGroceries(groceries);
    
    if (filteredGroceries.length === 0) {
        // Show empty state
        if (window.innerWidth >= 768) {
            // Table layout empty state
            const table = document.createElement("table");
            table.className = "grocery-table";
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="empty-state">
                        <td colspan="5">
                            <div>
                                <p>No groceries found</p>
                                <p style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                                    ${groceries.length === 0 ? 'Add your first grocery above' : 'Try adjusting your filters'}
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            `;
            container.appendChild(table);
        } else {
            // Card layout empty state
            container.className = "grocery-list";
            const emptyState = document.createElement("li");
            emptyState.className = "empty-state";
            emptyState.innerHTML = `
                <div>
                    <p>No groceries found</p>
                    <p style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                        ${groceries.length === 0 ? 'Add your first grocery above' : 'Try adjusting your filters'}
                    </p>
                </div>
            `;
            container.appendChild(emptyState);
        }
    } else {
        if (window.innerWidth >= 768) {
            // Create table layout for larger screens
            container.className = "grocery-table-container";
            const table = document.createElement("table");
            table.className = "grocery-table";
            
            // Create table header
            const thead = document.createElement("thead");
            thead.innerHTML = `
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            `;
            table.appendChild(thead);
            
            // Create table body
            const tbody = document.createElement("tbody");
            filteredGroceries.forEach(grocery => {
                const row = addGroceryToDOM(grocery);
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            
            container.appendChild(table);
        } else {
            // Create card layout for mobile screens
            container.className = "grocery-list";
            filteredGroceries.forEach(grocery => {
                const card = addGroceryToDOM(grocery);
                container.appendChild(card);
            });
        }
    }
    
    updateNotifications();
}

// Handle window resize to switch between layouts
function handleResize() {
    init();
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Update notifications for items expiring soon
function updateNotifications() {
    const notificationContainer = document.getElementById("notifications");
    notificationContainer.innerHTML = "";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find items expiring within 3 days or already expired
    const urgentItems = groceries.filter(grocery => {
        const expiryInfo = calculateExpiryStatus(grocery.expirydate);
        return expiryInfo.daysLeft <= 3;
    });
    
    if (urgentItems.length > 0) {
        urgentItems.forEach(item => {
            const expiryInfo = calculateExpiryStatus(item.expirydate);
            const notification = document.createElement("div");
            notification.className = `notification ${expiryInfo.status}`;
            
            let message;
            if (expiryInfo.daysLeft < 0) {
                message = `${item.name} expired ${Math.abs(expiryInfo.daysLeft)} day${Math.abs(expiryInfo.daysLeft) !== 1 ? 's' : ''} ago`;
            } else if (expiryInfo.daysLeft === 0) {
                message = `${item.name} expires today!`;
            } else {
                message = `${item.name} expires in ${expiryInfo.daysLeft} day${expiryInfo.daysLeft !== 1 ? 's' : ''}`;
            }
            
            notification.innerHTML = `<p>${message}</p>`;
            notificationContainer.appendChild(notification);
        });
    } else {
        const noNotifications = document.createElement("div");
        noNotifications.innerHTML = `<p style="color: #999;">No urgent notifications</p>`;
        notificationContainer.appendChild(noNotifications);
    }
}

init();

// Event listeners
form.addEventListener("submit", addGrocery);
filterCategory.addEventListener("change", init);
sortBy.addEventListener("change", init);
