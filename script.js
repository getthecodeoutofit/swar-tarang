// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 80) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.92)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars
            if (entry.target.classList.contains('member-categories')) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.team-card, .event-card, .gallery-item, .announcement-card, .trophy-item, .member-categories, .highlight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Counter animation
function animateCounter(element) {
    const targetText = element.textContent.trim();
    const target = parseInt(targetText.replace(/\D/g, ''));
    if (isNaN(target)) return;
    
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = targetText.includes('+') ? '+' : '';
        const prefix = targetText.includes('#') ? '#' : '';
        element.textContent = prefix + Math.floor(current) + suffix;
    }, 16);
}

// Gallery Lightbox Effect
document.querySelectorAll('.gallery-item, .qr-frame').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.92);
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const container = document.createElement('div');
        container.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 85%;
            transform: scale(0.85);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Swar Tarang Image';
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            border: 3px solid rgba(255, 255, 255, 0.2);
            object-fit: contain;
        `;

        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -45px;
            right: 0;
            color: white;
            font-size: 2.5rem;
            font-weight: 300;
            line-height: 1;
            cursor: pointer;
        `;

        container.appendChild(lightboxImg);
        container.appendChild(closeBtn);
        lightbox.appendChild(container);
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 10);
        
        lightbox.addEventListener('click', () => {
            container.style.transform = 'scale(0.85)';
            lightbox.style.opacity = '0';
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.parentNode.removeChild(lightbox);
                }
            }, 300);
        });
    });
});

// Dynamic Floating Music Notes Background
function createFloatingNote() {
    const icons = ['fa-music', 'fa-guitar', 'fa-drum', 'fa-compact-disc'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const note = document.createElement('i');
    note.className = `fas ${randomIcon} floating-note`;
    note.style.cssText = `
        position: fixed;
        color: rgba(99, 102, 241, 0.25);
        font-size: ${Math.random() * 22 + 12}px;
        left: ${Math.random() * 95}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 4 + 5}s linear forwards;
    `;
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        if (note.parentNode) {
            note.parentNode.removeChild(note);
        }
    }, 9000);
}

setInterval(createFloatingNote, 3500);

// Keyframe Styles
const customStyle = document.createElement('style');
customStyle.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 65px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            width: 100%;
            text-align: center;
            transition: 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 2rem 0;
            gap: 1.5rem;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    }
`;
document.head.appendChild(customStyle);

console.log('Swar Tarang Music Club Website Loaded Successfully! 🎵');
