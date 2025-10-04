// ====================================
// Navigation & Scroll Effects
// ====================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ====================================
// Smooth Scrolling
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Active Link Highlighting
// ====================================

const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);
window.addEventListener('load', highlightActiveLink);

// ====================================
// Contact Form Handling
// ====================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    // Simulate form submission (in production, you'd send this to a server)
    setTimeout(() => {
        // Success message
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Log form data (for demonstration)
        console.log('Form submitted:', formData);
    }, 1500);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ====================================
// Newsletter Form Handling
// ====================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate subscription (in production, send to server)
        alert('Thank you for subscribing! You\'ll receive our latest tutorials and tips.');
        emailInput.value = '';
        
        // Log subscription (for demonstration)
        console.log('Newsletter subscription:', email);
    });
}

// ====================================
// Scroll Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe tutorial cards, tip cards, and resource categories
const animateElements = document.querySelectorAll('.tutorial-card, .tip-card, .resource-category');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// Tutorial Card Interactions
// ====================================

const tutorialCards = document.querySelectorAll('.tutorial-card');

tutorialCards.forEach(card => {
    const viewButton = card.querySelector('.btn-outline');
    
    if (viewButton) {
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const tutorialTitle = card.querySelector('.tutorial-title').textContent;
            
            // In production, this would navigate to the tutorial page
            alert(`Opening ${tutorialTitle} tutorials...\n\nIn a full implementation, this would navigate to a dedicated tutorial page with video lessons and detailed guides.`);
            
            console.log('Tutorial clicked:', tutorialTitle);
        });
    }
});

// ====================================
// Loading Animation
// ====================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ====================================
// Dynamic Year in Footer
// ====================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// ====================================
// Keyboard Navigation Enhancement
// ====================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ====================================
// Performance: Debounce Scroll Events
// ====================================

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

// Apply debounce to scroll-heavy functions
const debouncedHighlightActiveLink = debounce(highlightActiveLink, 100);
window.removeEventListener('scroll', highlightActiveLink);
window.addEventListener('scroll', debouncedHighlightActiveLink);

// ====================================
// Lazy Loading Images
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ====================================
// Tooltip Enhancement for Resource Links
// ====================================

const resourceLinks = document.querySelectorAll('.resource-item');

resourceLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ====================================
// Copy Keyboard Shortcut Functionality
// ====================================

const shortcutKeys = document.querySelectorAll('.shortcut-key');

shortcutKeys.forEach(key => {
    key.style.cursor = 'pointer';
    key.title = 'Click to copy';
    
    key.addEventListener('click', function() {
        const text = this.textContent;
        
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalBg = this.style.background;
                this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.style.background = originalBg;
                    this.style.color = '';
                }, 500);
            });
        }
    });
});

// ====================================
// Console Welcome Message
// ====================================

console.log('%c🎨 Welcome to Creative Studio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out our tutorials to learn how to build sites like this!', 'font-size: 14px; color: #764ba2;');

// ====================================
// Analytics Placeholder
// ====================================

function trackEvent(category, action, label) {
    // In production, integrate with Google Analytics or similar
    console.log('Event tracked:', { category, action, label });
}

// Track tutorial views
tutorialCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.tutorial-title').textContent;
        trackEvent('Tutorial', 'Click', title);
    });
});

// Track resource downloads
resourceLinks.forEach(link => {
    link.addEventListener('click', () => {
        const title = link.querySelector('h4').textContent;
        trackEvent('Resource', 'Click', title);
    });
});
