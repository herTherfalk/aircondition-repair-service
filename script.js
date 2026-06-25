// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            message: this.querySelector('textarea').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill out all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }

        // Log form data (in a real application, this would be sent to a server)
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! We will contact you soon.');

        // Reset form
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and other elements
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .pricing-card, .feature');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Highlight active navigation link
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add smooth scroll for all anchor links
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