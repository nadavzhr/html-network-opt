// Lightbox functionality
function openLightbox(src) {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create image element
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Fullsize view';
    
    // Add close instruction text
    const closeText = document.createElement('div');
    closeText.textContent = 'Click anywhere to close';
    closeText.style.color = 'white';
    closeText.style.textAlign = 'center';
    closeText.style.position = 'fixed';
    closeText.style.bottom = '20px';
    closeText.style.width = '100%';
    
    // Add elements to lightbox
    lightbox.appendChild(img);
    lightbox.appendChild(closeText);
    
    // Show lightbox with fade-in
    document.body.appendChild(lightbox);
    lightbox.style.display = 'block';
    requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
    });
    
    // Close on click with fade-out
    lightbox.onclick = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    };
}

// Initialize particles
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4299e1" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4299e1",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { 
                    enable: true, 
                    mode: "grab" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize GSAP animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    document.querySelectorAll('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Reading Progress Bar
function initProgressBar() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector(".progress-bar").style.width = scrolled + "%";
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Initialize Navigation Menu
function initNavigation() {
    const menuBtn = document.getElementById('menuToggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Mobile Menu initialization
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (!menuBtn) return;

    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');

    menuBtn.addEventListener('click', () => {
        const isOpen = header.classList.toggle('mobile-menu-open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && header.classList.contains('mobile-menu-open')) {
            header.classList.remove('mobile-menu-open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header.classList.contains('mobile-menu-open')) {
            header.classList.remove('mobile-menu-open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
        }
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.querySelector('.icon').textContent = 
            document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize all functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initAnimations();
    initProgressBar();
    initCustomCursor();
    initNavigation(); // Replace initFloatingNav with initNavigation
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
});
