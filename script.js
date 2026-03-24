// Typewriter Effect
const typeTarget = document.querySelector('.hero-desc');
if (typeTarget) {
    const text = typeTarget.textContent;
    typeTarget.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typeTarget.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    window.addEventListener('load', typeWriter);
}

// Create Cursor Elements
const cursor = document.createElement('div');
const follower = document.createElement('div');
cursor.className = 'cursor';
follower.className = 'cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(follower);

// Initialize cursor position off-screen
cursor.style.transform = `translate3d(-100px, -100px, 0)`;
follower.style.transform = `translate3d(-100px, -100px, 0)`;

// Cursor Movement & Grid Glow Logic
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update cursor and follower
    requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
        follower.style.transform = `translate3d(${x - 17.5}px, ${y - 17.5}px, 0)`;

        // Update Grid Glow CSS variables
        const percentX = (x / window.innerWidth) * 100;
        const percentY = (y / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--cursor-x', `${percentX}%`);
        document.documentElement.style.setProperty('--cursor-y', `${percentY}%`);
    });
});

// Magnetic Buttons Interaction
const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-resume, .skill-box, .project-card, .museum-card, .contact-premium-card, .preview-card, .quick-link-item');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.2;
        const moveY = (e.clientY - centerY) * 0.2;

        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// Cursor Interaction Effects
const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(3)';
        cursor.style.background = 'rgba(255, 255, 255, 0.2)';
        follower.style.transform += ' scale(1.5)';
        follower.style.borderColor = '#fff';
        follower.style.background = 'rgba(59, 130, 246, 0.1)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(3)', '');
        cursor.style.background = '#fff';
        follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
        follower.style.borderColor = 'var(--primary-color)';
        follower.style.background = 'transparent';
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
});

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navigation Highlight on Scroll (Modified for Multi-page)
// Only run if there are multiple sections on the page (like a single-page setup)
// For now, we rely on manual active classes in HTML for the multi-page transitions.
/*
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        
        if (id && top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                if (links.getAttribute('href').startsWith('#')) {
                    links.classList.remove('active');
                    const target = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (target) target.classList.add('active');
                }
            });
        }
    });
});
*/

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(3, 7, 18, 0.9)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        nav.style.height = '70px';
    } else {
        nav.style.background = 'rgba(3, 7, 18, 0.8)';
        nav.style.boxShadow = 'none';
        nav.style.height = '80px';
    }
});
