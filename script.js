// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initTutorialCards();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Simulate form submission
                submitForm(formObject);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Subject validation
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    // Display errors or success
    if (errors.length > 0) {
        showNotification('Please fix the following errors:\n• ' + errors.join('\n• '), 'error');
        return false;
    }
    
    return true;
}

// Simulate Form Submission
function submitForm(data) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted:', data);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Helper functions for notifications
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    return colors[type] || colors.info;
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tutorial-card, .tip-card, .resource-category');
    animatedElements.forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Tutorial Cards Interaction
function initTutorialCards() {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach(card => {
        const button = card.querySelector('.btn-outline');
        const tutorialItems = card.querySelectorAll('.tutorial-item');
        
        // Add click handlers to tutorial items
        tutorialItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Simulate opening tutorial
                const tutorialName = item.querySelector('span').textContent;
                showNotification(`Opening tutorial: ${tutorialName}`, 'info');
                
                // Add visual feedback
                item.style.backgroundColor = 'var(--bg-alt)';
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 200);
            });
            
            // Add hover effect
            item.style.cursor = 'pointer';
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--bg-secondary)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
        
        // Handle "View All Tutorials" button
        if (button) {
            button.addEventListener('click', function() {
                const cardTitle = card.querySelector('h3').textContent;
                showNotification(`Loading all ${cardTitle} tutorials...`, 'info');
            });
        }
    });
}

// Resource Links Tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.resource-link')) {
        const link = e.target.closest('.resource-link');
        const resourceName = link.querySelector('span').textContent;
        
        // Track resource click (in real app, this would send analytics)
        console.log('Resource clicked:', resourceName);
        
        // Show notification for external links
        if (link.hasAttribute('target')) {
            showNotification(`Opening ${resourceName} in new tab`, 'info');
        }
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance Optimization
const debouncedResize = debounce(() => {
    // Handle window resize events
    console.log('Window resized');
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events that need throttling
}, 16); // ~60fps

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        margin-left: auto;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
    }
`;
document.head.appendChild(style);