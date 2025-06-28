// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Highlighting
function setActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
    nameInput.style.borderColor = error ? '#e74c3c' : '#ba5370';
});

emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
    emailInput.style.borderColor = error ? '#e74c3c' : '#ba5370';
});

messageInput.addEventListener('input', () => {
    const error = validateMessage(messageInput.value);
    messageError.textContent = error;
    messageInput.style.borderColor = error ? '#e74c3c' : '#ba5370';
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const nameErrorMsg = validateName(nameInput.value);
    const emailErrorMsg = validateEmail(emailInput.value);
    const messageErrorMsg = validateMessage(messageInput.value);
    
    nameError.textContent = nameErrorMsg;
    emailError.textContent = emailErrorMsg;
    messageError.textContent = messageErrorMsg;
    
    nameInput.style.borderColor = nameErrorMsg ? '#e74c3c' : '#ba5370';
    emailInput.style.borderColor = emailErrorMsg ? '#e74c3c' : '#ba5370';
    messageInput.style.borderColor = messageErrorMsg ? '#e74c3c' : '#ba5370';
    
    // If no errors, show success alert
    if (!nameErrorMsg && !emailErrorMsg && !messageErrorMsg) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        nameInput.style.borderColor = '#e0e0e0';
        emailInput.style.borderColor = '#e0e0e0';
        messageInput.style.borderColor = '#e0e0e0';
    }
});

// Scroll animations
function revealOnScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add initial styles for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Show first section immediately
    if (sections[0]) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
});
