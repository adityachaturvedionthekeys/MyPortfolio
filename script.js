// Canvas Network Background
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Number of particles depends on screen size
    const particleCount = Math.floor((width * height) / 15000);
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.fill();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Opacity based on distance
                const opacity = 1 - (distance / 150);
                ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// Initialize canvas
initCanvas();
animateParticles();

window.addEventListener('resize', () => {
    initCanvas();
});


// ====== THEME TOGGLE ======
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Default is light; only switch to dark if explicitly saved
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.remove('light');
    themeBtn.textContent = '☀️';
} else {
    // Ensure light class is present (it's also on the HTML, but belt-and-suspenders)
    body.classList.add('light');
    themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeBtn.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = [
    "Software Engineer.",
    "Cybersecurity Enthusiast.",
    "B.Tech CS Student.",
    "Problem Solver."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = "> " + currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = "> " + currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);


// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // observer.unobserve(entry.target); // Uncomment to animate only once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});


// Navbar styling on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const isLight = document.body.classList.contains('light');
    if (window.scrollY > 50) {
        navbar.style.background = isLight
            ? 'rgba(240, 244, 248, 0.98)'
            : 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = '';
        navbar.style.boxShadow = 'none';
    }
});
