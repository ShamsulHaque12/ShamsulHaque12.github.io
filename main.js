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

// Toast Notification System
function showToast(title, message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success' 
        ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
             <polyline points="22 4 12 14.01 9 11.01"></polyline>
           </svg>`
        : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="10"></circle>
             <line x1="12" y1="8" x2="12" y2="12"></line>
             <line x1="12" y1="16" x2="12.01" y2="16"></line>
           </svg>`;

    toast.innerHTML = `
        ${iconSvg}
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close notification">&times;</button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    const closeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 350);
    };

    toast.querySelector('.toast-close').addEventListener('click', closeToast);

    // Auto dismiss after 4.5s
    setTimeout(closeToast, 4500);
}

// Form submission handler with modern toast
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        try {
            const data = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast('Message Sent Successfully!', 'Thank you! Your message has been sent to Shamsul. I will get back to you shortly.', 'success');
                this.reset();
            } else {
                showToast('Submission Issue', 'Oops! Could not send message. Please reach out directly to mdshamsulhaquesujon@gmail.com.', 'error');
            }
        } catch (error) {
            showToast('Network Error', 'Unable to reach the server. Please contact directly via mdshamsulhaquesujon@gmail.com or WhatsApp.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// Back to Top functionality
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Category Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.projects-grid .project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.classList.remove('hidden');
                    card.classList.remove('fade-in');
                    void card.offsetWidth; // Trigger reflow
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Calculate experience duration dynamically (aligned with 1.5+ years professional experience)
function updateExperienceDuration() {
    const heroExpSpan = document.getElementById('hero-exp-duration');
    const badgeExpText = document.getElementById('badge-exp-duration');
    const badgeExpLabel = document.getElementById('badge-exp-label');
    
    if (heroExpSpan) {
        heroExpSpan.textContent = 'with over 1.5+ years';
    }
    if (badgeExpText) {
        badgeExpText.textContent = '1.5+';
    }
    if (badgeExpLabel) {
        badgeExpLabel.textContent = 'Years Exp.';
    }
}

/* ==========================================================================
   DYNAMIC MOUSE POINTER & PROJECT ANIMATIONS
   ========================================================================== */

// 1. Custom Cyberpunk Animated Mouse Pointer
function initCustomCursor() {
    // Only activate for devices with a fine pointer and hover support (desktop)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    if (document.getElementById('cursor-dot')) return;

    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorDot.className = 'cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');

    const cursorRing = document.createElement('div');
    cursorRing.id = 'cursor-ring';
    cursorRing.className = 'cursor-ring';
    cursorRing.setAttribute('aria-hidden', 'true');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isInitialized = false;
    let lastParticleTime = 0;

    // Direct pointer tracking on mousemove
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isInitialized) {
            ringX = mouseX;
            ringY = mouseY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            cursorDot.classList.add('cursor-visible');
            cursorRing.classList.add('cursor-visible');
            isInitialized = true;
        }

        // Particle tracer trail (throttled for high 60fps performance)
        const now = performance.now();
        if (now - lastParticleTime > 45) {
            spawnCursorParticle(mouseX, mouseY);
            lastParticleTime = now;
        }
    }, { passive: true });

    function spawnCursorParticle(x, y) {
        if (Math.random() > 0.4) return;
        const p = document.createElement('div');
        p.className = 'cursor-particle';
        const size = Math.floor(Math.random() * 4 + 3);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        p.style.marginLeft = `-${size / 2}px`;
        p.style.marginTop = `-${size / 2}px`;
        document.body.appendChild(p);
        setTimeout(() => {
            if (p.parentNode) p.parentNode.removeChild(p);
        }, 420);
    }

    // Smooth Lerp loop for trailing ring
    const ease = 0.18;
    function renderCursor() {
        if (isInitialized) {
            ringX += (mouseX - ringX) * ease;
            ringY += (mouseY - ringY) * ease;

            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover States
    const interactiveSelectors = 'a, button, input[type="submit"], input[type="button"], select, [role="button"], .project-card, .skill-card, .filter-btn, .social-icon, .tag, .status-badge-live, .back-to-top, .back-link, .timeline-content, .pill, .contact-item';
    const textSelectors = 'input[type="text"], input[type="email"], input[type="search"], textarea';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursorRing.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        } else if (e.target.closest(textSelectors)) {
            cursorRing.classList.add('cursor-text-mode');
            cursorDot.classList.add('cursor-text-mode');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursorRing.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        } else if (e.target.closest(textSelectors)) {
            cursorRing.classList.remove('cursor-text-mode');
            cursorDot.classList.remove('cursor-text-mode');
        }
    });

    // Active / Click down state
    window.addEventListener('mousedown', () => {
        cursorRing.classList.add('cursor-active');
        cursorDot.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
        cursorRing.classList.remove('cursor-active');
        cursorDot.classList.remove('cursor-active');
    });

    // Ripple Shockwave on Click
    window.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        ripple.style.marginLeft = '-40px';
        ripple.style.marginTop = '-40px';
        document.body.appendChild(ripple);
        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 550);
    });

    // Viewport Exit / Enter
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('cursor-hidden');
        cursorRing.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('cursor-hidden');
        cursorRing.classList.remove('cursor-hidden');
    });
}

// 2. Interactive Card Spotlight (Follows cursor relative to card)
function initCardSpotlights() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .contact-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
    });
}

// 3. Dynamic Top Scroll Progress Indicator
function initScrollProgress() {
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.className = 'scroll-progress-bar';
        document.body.prepend(progressBar);
    }

    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// 4. Magnetic Micro-Interactions on Key Action Buttons
function initMagneticButtons() {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .filter-btn, .back-to-top, .back-link');

    magneticElements.forEach(elem => {
        elem.classList.add('btn-magnetic');

        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const elemCenterX = rect.left + rect.width / 2;
            const elemCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - elemCenterX) * 0.22;
            const deltaY = (e.clientY - elemCenterY) * 0.22;

            elem.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate3d(0, 0, 0)';
        });
    });
}

// 5. Interactive 3D Hero Parallax with Mouse
function initHeroParallax() {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const heroSection = document.getElementById('hero');
    const heroImageContainer = heroSection ? heroSection.querySelector('.relative.group') : null;

    if (heroSection && heroImageContainer) {
        heroImageContainer.classList.add('hero-parallax-target');

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const tiltX = ((e.clientY - centerY) / rect.height) * -10;
            const tiltY = ((e.clientX - centerX) / rect.width) * 10;

            heroImageContainer.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            heroImageContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
}

// Initialize all features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateExperienceDuration();
    initCustomCursor();
    initCardSpotlights();
    initScrollProgress();
    initMagneticButtons();
    initHeroParallax();
});