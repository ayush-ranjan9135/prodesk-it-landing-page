// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== STICKY NAVBAR WITH SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== ACTIVE LINK HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    let errorMessages = [];
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    
    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        errorMessages.push('Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        errorMessages.push('Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        errorMessages.push('Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email');
        errorMessages.push('Please enter a valid email');
        isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.value.replace(/\D/g, '');
    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required');
        errorMessages.push('Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        errorMessages.push('Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        errorMessages.push('Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        errorMessages.push('Message must be at least 10 characters');
        isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
        createConfetti();
        showSuccessPopup('🎉 Thank you! We will contact you soon.');
        contactForm.reset();
    } else {
        // Show sad popup with first error
        showSadPopup('😢 ' + errorMessages[0]);
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

// Clear error on input
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('input', () => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    });
});

// ===== BUTTON CLICK HANDLERS =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent === 'Get Started') {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        } else if (button.textContent === 'View Services') {
            document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ABOUT TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(targetTab) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetBtn && targetBtn.classList.contains('tab-btn')) {
        targetBtn.classList.add('active');
    }
    
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
    });
});

// ===== FOOTER LINKS TO ABOUT TABS =====
document.querySelectorAll('.footer-section a[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = link.getAttribute('data-tab');
        
        // Scroll to about section
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            
            // Switch to the correct tab after a short delay
            setTimeout(() => {
                switchTab(targetTab);
            }, 500);
        }
    });
});

// ===== NEWSLETTER SUBSCRIPTION =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            // Show sad popup
            showSadPopup('😢 Please enter your email address!');
        } else if (!emailRegex.test(emailValue)) {
            // Show sad popup for invalid email
            showSadPopup('😢 Please enter a valid email address!');
        } else {
            // Show celebration
            createConfetti();
            showSuccessPopup('🎉 Thank you for subscribing!');
            emailInput.value = '';
        }
    });
}

// Confetti animation
function createConfetti() {
    const colors = ['#6366F1', '#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Success popup
function showSuccessPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-notification success';
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 10);
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Sad popup
function showSadPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-notification sad';
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 10);
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}
