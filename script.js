// Slideshow functionality
let slideIndex = 1;
let slideTimer;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    showSlides(slideIndex);
    startAutoSlide();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Observe all content cards for scroll animation
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Change slide by n steps
function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    startAutoSlide();
}

// Go to specific slide
function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    startAutoSlide();
}

// Display slides
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance slides
function startAutoSlide() {
    slideTimer = setTimeout(function() {
        slideIndex++;
        showSlides(slideIndex);
        startAutoSlide();
    }, 5000); // Change slide every 5 seconds
}

// Smooth scrolling for anchor links
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

// Add animation on scroll for content cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
