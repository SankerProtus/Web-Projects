// TechEdu Academy - Professional School Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('authModal');
    const loginTrigger = document.querySelector('.btn-login-trigger');
    const closeBtn = document.querySelector('.close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Open modal
    loginTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Tab switching functionality
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(function(tab) {
                tab.classList.remove('active');
            });
            tabContents.forEach(function(content) {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .quick-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submissions
    const loginForm = document.querySelector('#login form');
    const registerForm = document.querySelector('#register form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const userType = document.getElementById('userType').value;
        
        if (email && password && userType) {
            // Simulate login process
            showNotification('Login successful! Redirecting to ' + userType + ' dashboard...', 'success');
            setTimeout(() => {
                redirectToDashboard(userType);
            }, 2000);
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const userType = document.getElementById('regUserType').value;
        const studentId = document.getElementById('studentId').value;
        
        if (name && email && password && userType && studentId) {
            // Simulate registration process
            showNotification('Registration successful! Please check your email for verification.', 'success');
            setTimeout(() => {
                // Switch to login tab
                document.querySelector('[data-tab="login"]').click();
            }, 2000);
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }

    // Sticky navigation
    const header = document.querySelector('header');
    const quickAccessBar = document.querySelector('.quick-access-bar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide quick access bar on scroll down
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            quickAccessBar.style.transform = 'translateY(-100%)';
        } else {
            quickAccessBar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .portal-card, .admin-tool-card, .faculty-card, .activity-card');
    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // Search functionality for admin portal
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = this.closest('section').querySelectorAll('.searchable-item');
            
            searchableItems.forEach(function(item) {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Dynamic dashboard stats (simulated)
    updateDashboardStats();
    setInterval(updateDashboardStats, 30000); // Update every 30 seconds
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background-color: #28a745; }
            .notification-error { background-color: #dc3545; }
            .notification-info { background-color: #17a2b8; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function redirectToDashboard(userType) {
    // In a real application, this would redirect to actual dashboard pages
    const dashboards = {
        'student': '#student-portal',
        'admin': '#admin-portal',
        'faculty': '#faculty'
    };
    
    const targetSection = document.querySelector(dashboards[userType]);
    if (targetSection) {
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateDashboardStats() {
    // Simulate real-time updates for admin dashboard
    const stats = document.querySelectorAll('.summary-card h3');
    stats.forEach(function(stat, index) {
        const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        if (currentValue) {
            // Small random fluctuation
            const change = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(0, currentValue + change);
            
            if (index === 0) stat.textContent = newValue.toLocaleString(); // Students
            else if (index === 1) stat.textContent = newValue; // Faculty
            else if (index === 2) stat.textContent = newValue; // Courses
            else if (index === 3) stat.textContent = '$' + (newValue / 1000).toFixed(1) + 'M'; // Revenue
        }
    });
}

// Portal functionality simulation
function simulatePortalAction(action, element) {
    const button = element;
    const originalText = button.textContent;
    
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        showNotification(`${action} completed successfully!`, 'success');
    }, 2000);
}

// Add click handlers for portal buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-portal')) {
        e.preventDefault();
        simulatePortalAction(e.target.textContent, e.target);
    }
    
    if (e.target.classList.contains('btn-tool')) {
        e.preventDefault();
        simulatePortalAction(e.target.textContent, e.target);
    }
});
