// Sticky header state on scroll
const header = document.querySelector('header.nav-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0 && navLinksItems.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120; // Offset for header height and padding

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll for anchor links - Fixed for external links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's an internal link (more than just #)
        if (href.length > 1 && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Adjust scroll position for sticky header offset
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll reveal animations
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

// Apply scroll reveal to elements
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent to Shamsul.');
            this.reset();
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    });
}

// Calculate experience duration dynamically starting from 16 July 2025
function updateExperienceDuration() {
    const joinDate = new Date('2025-07-16');
    const currentDate = new Date();
    
    // Calculate total months difference
    let months = (currentDate.getFullYear() - joinDate.getFullYear()) * 12;
    months -= joinDate.getMonth();
    months += currentDate.getMonth();
    
    // If the current day of the month is before the join day (16th), subtract 1 month
    if (currentDate.getDate() < joinDate.getDate()) {
        months--;
    }
    
    if (months < 0) months = 0;
    
    // Update elements if they exist
    const heroExpSpan = document.getElementById('hero-exp-duration');
    const badgeExpText = document.getElementById('badge-exp-duration');
    
    if (heroExpSpan) {
        heroExpSpan.textContent = `with over ${months} months`;
    }
    
    if (badgeExpText) {
        badgeExpText.textContent = `${months}+`;
    }
}

// Call on load
document.addEventListener('DOMContentLoaded', updateExperienceDuration);