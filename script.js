// Futuristic Interactive Effects for Profitworx

// Mobile Navigation Toggle
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    // basic a11y hints
    navToggle.setAttribute('role', 'button');
    navToggle.setAttribute('aria-label', 'Toggle menu');
    navToggle.setAttribute('aria-expanded', 'false');
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
    };

    navToggle.addEventListener('click', toggleMenu);
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const nav = document.querySelector('.nav');
            const navHeight = nav ? nav.offsetHeight : 80;
            const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    });
});

// Nav scroll class (CSS-driven)
(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let ticking = false;
    const onScroll = () => {
        const scrolled = window.scrollY > 100;
        nav.classList.toggle('scrolled', scrolled);
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
    onScroll();
})();

// Particle system for background effect
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.setup();
        this.animate();
    }

    setup() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.4';
        document.body.appendChild(this.canvas);

        this.resize();
        this.createParticles();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numParticles = Math.min(50, Math.floor(window.innerWidth / 30));

        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00d4ff' : '#ff0096'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Interactive hover effects for buttons
function initializeButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Glitch effect for text elements
function createGlitchEffect(element, duration = 200) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let iterations = 0;
    const maxIterations = 10;

    const glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) return originalText[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }

        iterations += 1/3;
    }, 30);
}

// Typing effect with cursor
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    // Add cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.color = '#00d4ff';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            element.textContent = text.slice(0, i + 1);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 2000);
        }
    }

    type();
}

// Add CSS for blinking cursor
function addBlinkingCursorCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Add staggered animation for grid items
            if (entry.target.classList.contains('benefit-item') ||
                entry.target.classList.contains('layer-item') ||
                entry.target.classList.contains('comparison-side')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        }
    });
}, observerOptions);

// Matrix rain effect for hero section
function createMatrixRain() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';

    hero.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00d4ff';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add blinking cursor CSS
    addBlinkingCursorCSS();

    // Initialize particle system
    if (!reduceMotion && window.innerWidth > 1024) { // Only on larger screens
        new ParticleSystem();
    }

    // Initialize button effects
    initializeButtonEffects();

    // Initialize typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (!reduceMotion && subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 50);
        }, 1500);
    }

    // Initialize glitch effect for main title
    const mainTitle = document.querySelector('h1');
    if (!reduceMotion && mainTitle) {
        setTimeout(() => {
            createGlitchEffect(mainTitle);
        }, 500);
    }

    // Initialize matrix rain effect
    if (!reduceMotion && window.innerWidth > 1200) {
        setTimeout(() => {
            createMatrixRain();
        }, 2000);
    }

    // Initialize scroll animations
    const animateElements = document.querySelectorAll(
        '.benefit-item, .layer-item, .comparison-side, .author-card, .cam-visualization, .cta-statement'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add pulse effect to CAM center
    const camCenter = document.querySelector('.cam-center');
    if (camCenter) {
        setInterval(() => {
            camCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                camCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 3000);
    }

    // Interactive CAM nodes
    document.querySelectorAll('.cam-node').forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.2)';
            node.style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.6)';
        });

        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
            node.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)';
        });
    });

    // Add floating animation to fractal nodes
    document.querySelectorAll('.fractal-node, .mini-node').forEach((node, index) => {
        node.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`;
        node.style.animationDelay = `${index * 0.2}s`;
    });

    // Create floating animation keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            from { transform: translateY(0px); }
            to { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
});

// Optional mouse trail effect (gated)
if (!reduceMotion && window.innerWidth > 1200) {
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        mouseTrail = mouseTrail.filter(pos => Date.now() - pos.time < 500);
        if (mouseTrail.length > 5) {
            const trail = document.createElement('div');
            Object.assign(trail.style, {
                position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
                width: '4px', height: '4px', background: 'rgba(0, 212, 255, 0.6)',
                borderRadius: '50%', pointerEvents: 'none', zIndex: '9999', transition: 'all 0.5s ease-out'
            });
            document.body.appendChild(trail);
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0)';
                setTimeout(() => trail.parentNode && trail.remove(), 500);
            }, 50);
        }
    });
}

// Removed broken parallax targeting pseudo-elements; consider CSS-only parallax if needed
