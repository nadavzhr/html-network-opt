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

// Floating Navigation
function initFloatingNav() {
    let prevScrollpos = window.pageYOffset;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        const nav = document.querySelector('.floating-nav');
        
        if (currentScrollPos > 100) {
            nav.style.top = prevScrollpos > currentScrollPos ? "0" : "-60px";
        } else {
            nav.style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    });
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-nav')) {
        mobileMenuBtn?.classList.remove('active');
        navList?.classList.remove('active');
    }
});

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
    initFloatingNav();
    initThemeToggle();
    initSmoothScroll();
});
