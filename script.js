// Professional Glassmorphic Interactive System - Profitworx
// High-performance animations with hardware acceleration

// System Performance Detection
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isHighPerformance = window.devicePixelRatio >= 1.5 && window.innerWidth >= 1200;
const isMobile = window.innerWidth <= 768;

// Advanced Navigation System with Glassmorphic Effects
class NavigationController {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.nav = document.querySelector('.nav');
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;

        this.setupAccessibility();
        this.attachEventListeners();
        this.initGlassmorphicEffects();
    }

    setupAccessibility() {
        this.navToggle.setAttribute('role', 'button');
        this.navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('tabindex', '0');
    }

    attachEventListeners() {
        this.navToggle.addEventListener('click', this.toggleMenu.bind(this));
        this.navToggle.addEventListener('keydown', this.handleKeydown.bind(this));

        // Auto-close on link clicks
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    initGlassmorphicEffects() {
        if (!isHighPerformance || reduceMotion) return;

        // Add glass morphism enhancement
        this.nav.style.backdropFilter = 'blur(25px)';
        this.nav.style.webkitBackdropFilter = 'blur(25px)';

        // Animate glass intensity on scroll
        let scrollTicking = false;
        const updateGlassEffect = () => {
            const scrolled = window.scrollY > 50;
            this.nav.classList.toggle('scrolled', scrolled);
            scrollTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(updateGlassEffect);
                scrollTicking = true;
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.updateMenuState();
    }

    openMenu() {
        this.isMenuOpen = true;
        this.updateMenuState();
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.updateMenuState();
    }

    updateMenuState() {
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        this.navToggle.classList.toggle('active', this.isMenuOpen);
        this.navToggle.setAttribute('aria-expanded', String(this.isMenuOpen));

        // Enhanced animation with glass morphism
        if (!reduceMotion) {
            if (this.isMenuOpen) {
                this.navMenu.style.transform = 'translateY(0)';
                this.navMenu.style.opacity = '1';
                this.navMenu.style.backdropFilter = 'blur(20px)';
            } else {
                this.navMenu.style.transform = 'translateY(-20px)';
                this.navMenu.style.opacity = '0';
            }
        }
    }

    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleMenu();
        } else if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMenu();
        }
    }
}

// Initialize Navigation
const navigationController = new NavigationController();

// Advanced Smooth Scrolling with Easing
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        const nav = document.querySelector('.nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        // Enhanced smooth scroll with custom easing
        if (!reduceMotion) {
            this.smoothScrollTo(targetY, 800);
        } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    }

    smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }
}

// Initialize Smooth Scroller
const smoothScroller = new SmoothScroller();

// Advanced Scroll Effects Controller
class ScrollEffectsController {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.ticking = false;
        this.lastScrollY = 0;
        this.scrollDirection = 'down';
        this.init();
    }

    init() {
        if (!this.nav) return;

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Initial call
        this.updateScrollEffects();
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateScrollEffects.bind(this));
            this.ticking = true;
        }
    }

    handleResize() {
        // Recalculate on resize
        this.updateScrollEffects();
    }

    updateScrollEffects() {
        const currentScrollY = window.scrollY;
        const scrolled = currentScrollY > 100;
        const scrollingFast = Math.abs(currentScrollY - this.lastScrollY) > 10;

        // Determine scroll direction
        if (currentScrollY > this.lastScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }

        // Apply glassmorphic navigation effects
        this.nav.classList.toggle('scrolled', scrolled);
        this.nav.classList.toggle('scrolling-fast', scrollingFast);
        this.nav.classList.toggle('scrolling-up', this.scrollDirection === 'up');

        // Enhanced glass effects based on scroll position
        if (!reduceMotion && isHighPerformance) {
            const blurIntensity = Math.min(currentScrollY / 10, 40);
            const opacity = Math.min(0.3 + (currentScrollY / 1000), 0.9);

            this.nav.style.setProperty('--scroll-blur', `${blurIntensity}px`);
            this.nav.style.setProperty('--scroll-opacity', opacity);
        }

        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
}

// Initialize Scroll Effects
const scrollEffectsController = new ScrollEffectsController();

// Advanced High-Performance Particle System
class GlassmorphicParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0, radius: 150 };

        // Performance settings
        this.particleCount = isHighPerformance ? 120 : 60;
        this.maxConnections = isHighPerformance ? 5 : 3;
        this.connectionDistance = isHighPerformance ? 120 : 80;

        // Visual settings
        this.colors = {
            primary: 'rgba(0, 212, 255, 0.6)',
            secondary: 'rgba(0, 255, 255, 0.4)',
            accent: 'rgba(102, 255, 255, 0.3)',
            connection: 'rgba(0, 212, 255, 0.15)'
        };

        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    setupCanvas() {
        this.canvas.id = 'glassmorphic-particles';
        Object.assign(this.canvas.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '2',
            opacity: '0.8',
            mixBlendMode: 'screen',
            backdropFilter: 'blur(1px)'
        });

        document.body.appendChild(this.canvas);
        this.resizeCanvas();

        // Optimized resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
        });
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                baseOpacity: Math.random() * 0.4 + 0.1,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseOffset: Math.random() * Math.PI * 2,
                color: this.getRandomColor(),
                connections: []
            });
        }
    }

    getRandomColor() {
        const colors = [this.colors.primary, this.colors.secondary, this.colors.accent];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        const time = performance.now() * 0.001;

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Enhanced boundary handling with smooth wrapping
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;

            // Pulsing effect
            particle.opacity = particle.baseOpacity +
                Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.2;

            // Mouse interaction with glassmorphic effect
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);

                // Repulsion effect
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;

                // Enhanced glow
                particle.opacity = Math.min(1, particle.opacity + force * 0.5);
                particle.size = Math.min(particle.size * 1.5, particle.size + force * 2);
            } else {
                particle.size = Math.max(0.5, particle.size * 0.99);
            }

            // Clear previous connections
            particle.connections = [];
        });

        this.updateConnections();
    }

    updateConnections() {
        // Calculate particle connections for glassmorphic web effect
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance &&
                    this.particles[i].connections.length < this.maxConnections &&
                    this.particles[j].connections.length < this.maxConnections) {

                    const opacity = (this.connectionDistance - distance) / this.connectionDistance;
                    this.particles[i].connections.push({
                        particle: this.particles[j],
                        opacity: opacity * 0.3
                    });
                }
            }
        }
    }

    drawParticles() {
        // Draw connections first (behind particles)
        this.ctx.lineWidth = 1;
        this.particles.forEach(particle => {
            particle.connections.forEach(connection => {
                this.ctx.save();
                this.ctx.globalAlpha = connection.opacity;
                this.ctx.strokeStyle = this.colors.connection;
                this.ctx.shadowBlur = 2;
                this.ctx.shadowColor = this.colors.primary;

                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(connection.particle.x, connection.particle.y);
                this.ctx.stroke();
                this.ctx.restore();
            });
        });

        // Draw particles with glassmorphic effect
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;

            // Create gradient for glassmorphic appearance
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.7, particle.color.replace('0.6', '0.3'));
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.shadowBlur = particle.size * 3;
            this.ctx.shadowColor = particle.color;

            // Draw main particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Add inner glow
            this.ctx.globalAlpha = particle.opacity * 0.8;
            this.ctx.fillStyle = this.colors.accent;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    bindEvents() {
        let mouseTimeout;

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Expand interaction radius on movement
            this.mouse.radius = Math.min(200, this.mouse.radius + 2);

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                this.mouse.radius = Math.max(150, this.mouse.radius - 1);
            }, 100);
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
            this.mouse.radius = 150;
        });

        // Touch support for mobile
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    animate() {
        // High-performance animation loop
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Apply subtle background blur for depth
        if (isHighPerformance && !reduceMotion) {
            this.ctx.filter = 'blur(0.5px)';
            this.ctx.globalCompositeOperation = 'screen';
        }

        this.updateParticles();
        this.drawParticles();

        // Reset filters
        this.ctx.filter = 'none';
        this.ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(() => this.animate());
    }

    // Performance optimization methods
    pause() {
        this.canvas.style.display = 'none';
    }

    resume() {
        this.canvas.style.display = 'block';
    }

    destroy() {
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }

    resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Set actual size in memory (scaled up for high DPI)
        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;

        // Scale back down using CSS
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        // Scale the drawing context so everything draws at the correct size
        this.ctx.scale(pixelRatio, pixelRatio);

        // Adjust particle count based on screen size
        const newParticleCount = Math.floor((width * height) / 15000);
        this.particleCount = Math.min(Math.max(newParticleCount, 30), isHighPerformance ? 120 : 60);

        // Recreate particles if needed
        if (this.particles.length !== this.particleCount) {
            this.createParticles();
        }
    }
}

// Initialize Advanced Particle System
let particleSystem = null;
if (!reduceMotion && isHighPerformance) {
    particleSystem = new GlassmorphicParticleSystem();

    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    const monitorPerformance = () => {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime > 5000) { // Check every 5 seconds
            const fps = (frameCount * 1000) / (currentTime - lastTime);

            if (fps < 30 && particleSystem) {
                // Reduce particle count if performance is poor
                particleSystem.particleCount = Math.floor(particleSystem.particleCount * 0.8);
                particleSystem.createParticles();
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(monitorPerformance);
    };

    requestAnimationFrame(monitorPerformance);
}

// Pause particles when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (particleSystem) {
        if (document.hidden) {
            particleSystem.pause();
        } else {
            particleSystem.resume();
        }
    }
});

// Advanced Holographic Text Effect
function createHolographicEffect(element) {
    const text = element.textContent;
    const holoChars = '▲▼◆◇○●◉⬡⬢⬣⬤⬥⬦';
    let iteration = 0;

    // Create holographic reveal animation
    const holoInterval = setInterval(() => {
        element.textContent = text.split('').map((char, index) => {
            if (index < iteration) {
                return char;
            }
            if (Math.random() > 0.7) {
                return holoChars[Math.floor(Math.random() * holoChars.length)];
            }
            return char;
        }).join('');

        iteration += 0.5;

        if (iteration >= text.length * 2) {
            clearInterval(holoInterval);
            element.textContent = text;

            // Add permanent holographic shimmer
            setInterval(() => {
                if (Math.random() > 0.95) {
                    const randomIndex = Math.floor(Math.random() * text.length);
                    const holoChar = holoChars[Math.floor(Math.random() * holoChars.length)];
                    const textArray = element.textContent.split('');
                    const originalChar = textArray[randomIndex];
                    textArray[randomIndex] = holoChar;
                    element.textContent = textArray.join('');

                    // Add holographic glow during glitch
                    element.style.textShadow = `
                        0 0 30px rgba(0, 212, 255, 0.8),
                        0 0 60px rgba(0, 255, 255, 0.4),
                        0 0 90px rgba(102, 255, 255, 0.2)`;

                    setTimeout(() => {
                        element.textContent = text;
                        element.style.textShadow = `
                            0 0 20px rgba(255, 255, 255, 0.1),
                            0 0 40px rgba(0, 212, 255, 0.2),
                            0 0 80px rgba(0, 212, 255, 0.1)`;
                    }, 100);
                }
            }, 200);
        }
    }, 50);
}

// Enhanced Glassmorphic Typewriter Effect
function typeWriter(element, text, speed = 60, addCursor = false) {
    element.textContent = '';
    let i = 0;

    if (addCursor) {
        // Add glassmorphic cursor
        const cursor = document.createElement('span');
        cursor.className = 'glassmorphic-cursor';
        cursor.style.cssText = `
            display: inline-block;
            width: 2px;
            height: 1.2em;
            background: linear-gradient(45deg, rgba(0, 212, 255, 0.8), rgba(0, 255, 255, 0.6));
            margin-left: 2px;
            animation: cursor-blink 1.5s infinite;
            backdrop-filter: blur(2px);
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        `;

        // Add cursor animation if not exists
        if (!document.getElementById('cursor-animation')) {
            const style = document.createElement('style');
            style.id = 'cursor-animation';
            style.textContent = `
                @keyframes cursor-blink {
                    0%, 50% { opacity: 1; transform: scaleY(1); }
                    51%, 100% { opacity: 0.3; transform: scaleY(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;

            // Add typing sound effect (visual feedback)
            if (i % 3 === 0) {
                element.style.textShadow = `
                    0 0 10px rgba(0, 212, 255, 0.6),
                    0 0 20px rgba(0, 212, 255, 0.3)`;
                setTimeout(() => {
                    element.style.textShadow = '';
                }, 100);
            }
        } else {
            clearInterval(typing);
            if (addCursor) {
                element.appendChild(cursor);
            }
        }
    }, speed);
}

// Advanced Quantum Field Effect
function createQuantumField() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '1',
        opacity: '0.08',
        mixBlendMode: 'screen'
    });

    document.body.appendChild(canvas);

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const quantumChars = '◇◈◉⬡⬢⬣⬤⬥⬦▲▼◆●○◎⚫⚪';
    const charArray = quantumChars.split('');
    const glowColors = [
        'rgba(0, 212, 255, 0.8)',
        'rgba(0, 255, 255, 0.6)',
        'rgba(102, 255, 255, 0.4)'
    ];

    const columns = Math.floor(canvas.width / 30);
    const streams = [];

    // Initialize quantum streams
    for (let i = 0; i < columns; i++) {
        streams[i] = {
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 0.5,
            chars: [],
            color: glowColors[Math.floor(Math.random() * glowColors.length)]
        };

        // Initialize character trail for each stream
        for (let j = 0; j < 15; j++) {
            streams[i].chars.push({
                char: charArray[Math.floor(Math.random() * charArray.length)],
                opacity: (15 - j) / 15,
                y: streams[i].y - j * 25
            });
        }
    }

    function drawQuantumField() {
        // Create fading trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        streams.forEach((stream, i) => {
            // Update stream position
            stream.y += stream.speed;

            // Reset stream if it goes off screen
            if (stream.y > canvas.height + 200) {
                stream.y = -200;
                stream.speed = Math.random() * 2 + 0.5;
                stream.color = glowColors[Math.floor(Math.random() * glowColors.length)];
            }

            // Update character positions and draw
            stream.chars.forEach((charObj, j) => {
                charObj.y = stream.y - j * 25;

                if (charObj.y > -30 && charObj.y < canvas.height + 30) {
                    ctx.save();
                    ctx.globalAlpha = charObj.opacity * 0.6;
                    ctx.fillStyle = stream.color;
                    ctx.font = '18px monospace';
                    ctx.textAlign = 'center';

                    // Add quantum glow effect
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = stream.color;

                    ctx.fillText(charObj.char, i * 30 + 15, charObj.y);
                    ctx.restore();
                }

                // Randomly change characters
                if (Math.random() > 0.98) {
                    charObj.char = charArray[Math.floor(Math.random() * charArray.length)];
                }
            });
        });
    }

    // Optimized animation loop
    let lastTime = 0;
    function animate(currentTime) {
        if (currentTime - lastTime > 50) { // ~20 FPS for better performance
            drawQuantumField();
            lastTime = currentTime;
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// Advanced Glassmorphic Mouse Trail
if (!reduceMotion && isHighPerformance) {
    class GlassmorphicCursor {
        constructor() {
            this.trail = [];
            this.maxTrailLength = 12;
            this.init();
        }

        init() {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        }

        handleMouseMove(e) {
            this.trail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now(),
                id: Math.random()
            });

            // Limit trail length
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }

            // Create glassmorphic trail elements
            this.trail.forEach((point, index) => {
                if (Date.now() - point.time < 800) {
                    this.createTrailElement(point, index);
                }
            });

            // Clean old trail points
            this.trail = this.trail.filter(point => Date.now() - point.time < 800);
        }

        createTrailElement(point, index) {
            const trail = document.createElement('div');
            const age = Date.now() - point.time;
            const progress = age / 800;
            const size = Math.max(2, 6 - progress * 4);
            const opacity = Math.max(0, 0.8 - progress);

            Object.assign(trail.style, {
                position: 'fixed',
                left: (point.x - size/2) + 'px',
                top: (point.y - size/2) + 'px',
                width: size + 'px',
                height: size + 'px',
                background: `radial-gradient(circle, rgba(0, 212, 255, ${opacity}), transparent)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9999',
                backdropFilter: 'blur(1px)',
                boxShadow: `0 0 ${size * 2}px rgba(0, 212, 255, ${opacity * 0.5})`,
                transition: 'all 0.1s ease-out'
            });

            document.body.appendChild(trail);

            setTimeout(() => {
                if (trail.parentNode) {
                    trail.style.opacity = '0';
                    trail.style.transform = 'scale(0)';
                    setTimeout(() => trail.parentNode && trail.remove(), 200);
                }
            }, 100);
        }
    }

    const glassmorphicCursor = new GlassmorphicCursor();
}

// Advanced Glassmorphic Interaction System
class InteractionEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceButtons();
        this.enhanceCards();
        this.enhanceInputs();
        this.addMicroInteractions();
    }

    enhanceButtons() {
        document.querySelectorAll('.btn').forEach(btn => {
            this.addRippleEffect(btn);
            this.addHoverGlow(btn);
        });
    }

    enhanceCards() {
        document.querySelectorAll('.glass-panel, .obsidian-card, .problem-card, .outcome-card').forEach(card => {
            this.addTiltEffect(card);
            this.addHoverEnhancement(card);
        });
    }

    enhanceInputs() {
        document.querySelectorAll('input, textarea').forEach(input => {
            this.addFocusGlow(input);
        });
    }

    addRippleEffect(element) {
        element.addEventListener('click', (e) => {
            if (reduceMotion) return;

            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('div');
            Object.assign(ripple.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'scale(0)',
                animation: 'ripple-effect 0.6s ease-out'
            });

            if (!element.style.position || element.style.position === 'static') {
                element.style.position = 'relative';
            }
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    addHoverGlow(element) {
        element.addEventListener('mouseenter', () => {
            if (reduceMotion) return;
            element.style.boxShadow = `
                ${element.style.boxShadow || ''},
                0 0 30px rgba(0, 212, 255, 0.4)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = element.style.boxShadow.replace(/,\s*0 0 30px rgba\(0, 212, 255, 0\.4\)/, '');
        });
    }

    addTiltEffect(element) {
        if (reduceMotion) return;

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const tiltX = (y / rect.height) * 10;
            const tiltY = -(x / rect.width) * 10;

            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    addHoverEnhancement(element) {
        element.addEventListener('mouseenter', () => {
            if (reduceMotion) return;
            element.style.backdropFilter = 'blur(30px)';
            element.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.backdropFilter = '';
            element.style.borderColor = '';
        });
    }

    addFocusGlow(element) {
        element.addEventListener('focus', () => {
            element.style.boxShadow = `
                0 0 0 3px rgba(0, 212, 255, 0.3),
                0 0 20px rgba(0, 212, 255, 0.2)`;
        });

        element.addEventListener('blur', () => {
            element.style.boxShadow = '';
        });
    }

    addMicroInteractions() {
        // Add CSS for ripple animation if not exists
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple-effect {
                    from {
                        transform: scale(0);
                        opacity: 1;
                    }
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize Interaction Enhancer
const interactionEnhancer = new InteractionEnhancer();

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Glassmorphic UI Elements
    function addGlassmorphicStyles() {
        const style = document.createElement('style');
        style.id = 'glassmorphic-enhancements';
        style.textContent = `
            /* Glassmorphic Cursor Styles */
            .glassmorphic-cursor {
                background: linear-gradient(45deg, rgba(0, 212, 255, 0.8), rgba(0, 255, 255, 0.6));
                backdrop-filter: blur(2px);
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            }

            @keyframes cursor-blink {
                0%, 50% { opacity: 1; transform: scaleY(1); }
                51%, 100% { opacity: 0.3; transform: scaleY(0.8); }
            }

            /* Enhanced Button Styles */
            .btn {
                position: relative;
                overflow: hidden;
                will-change: transform;
            }

            .btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.6s ease;
            }

            .btn:hover::before {
                left: 100%;
            }

            /* Glass Panel Enhancements */
            .glass-panel, .container-glass {
                position: relative;
                will-change: transform, filter;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            /* Ripple Effect */
            @keyframes ripple-effect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            /* Scroll Blur Navigation */
            .nav {
                backdrop-filter: blur(var(--scroll-blur, 20px));
                background: rgba(0, 0, 0, var(--scroll-opacity, 0.7));
            }

            /* High Performance Animations */
            @media (prefers-reduced-motion: no-preference) {
                .glass-interactive:hover {
                    transform: translateY(-2px) scale(1.02);
                }

                .nav.scrolling-fast {
                    backdrop-filter: blur(25px);
                }

                .nav.scrolling-up {
                    transform: translateY(0);
                }
            }

            /* Mobile Optimizations */
            @media (max-width: 768px) {
                .glass-panel, .glass-intense {
                    backdrop-filter: blur(15px) !important;
                }

                .particle-field {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addGlassmorphicStyles();

    // Enhanced typing effect with glassmorphic cursor
    const subtitle = document.querySelector('.subtitle');
    if (!reduceMotion && subtitle) {
        const originalText = subtitle.textContent;
        subtitle.style.position = 'relative';

        // Add glassmorphic typing effect
        setTimeout(() => {
            typeWriter(subtitle, originalText, 30, true);
        }, 2000);
    }

    // Enhanced holographic title effect
    const mainTitle = document.querySelector('h1');
    if (!reduceMotion && mainTitle) {
        mainTitle.style.position = 'relative';

        setTimeout(() => {
            createHolographicEffect(mainTitle);
        }, 500);

        // Add interactive glow on hover
        mainTitle.addEventListener('mouseenter', () => {
            if (!reduceMotion) {
                mainTitle.style.textShadow = `
                    0 0 20px rgba(255, 255, 255, 0.2),
                    0 0 40px rgba(0, 212, 255, 0.4),
                    0 0 80px rgba(0, 212, 255, 0.2)`;
            }
        });

        mainTitle.addEventListener('mouseleave', () => {
            mainTitle.style.textShadow = `
                0 0 20px rgba(255, 255, 255, 0.1),
                0 0 40px rgba(0, 212, 255, 0.2),
                0 0 80px rgba(0, 212, 255, 0.1)`;
        });
    }

    // Initialize enhanced atmospheric effects
    if (!reduceMotion && isHighPerformance) {
        setTimeout(() => {
            createQuantumField();
        }, 2000);
    }

    // Advanced Glassmorphic Scroll Animations
    class ScrollAnimationController {
        constructor() {
            this.animateElements = document.querySelectorAll(`
                .section-title, .lead-form, .framework-preview, .testimonial-card,
                .obsidian-card, .problem-card, .outcome-card, .timeline-item,
                .glass-panel, .container-glass
            `);
            this.init();
        }

        init() {
            this.setupObserver();
            this.prepareElements();
        }

        setupObserver() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -80px 0px'
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateIn(entry.target);
                    }
                });
            }, observerOptions);

            this.animateElements.forEach(el => this.observer.observe(el));
        }

        prepareElements() {
            this.animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(60px) scale(0.95)';
                el.style.filter = 'blur(10px)';
                el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;

                // Add glassmorphic preparation
                if (el.classList.contains('glass-panel') || el.classList.contains('container-glass')) {
                    el.style.backdropFilter = 'blur(0px)';
                    el.style.background = 'rgba(255, 255, 255, 0)';
                }
            });
        }

        animateIn(element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.filter = 'blur(0px)';

            // Enhanced glassmorphic reveal
            if (element.classList.contains('glass-panel') || element.classList.contains('container-glass')) {
                setTimeout(() => {
                    element.style.backdropFilter = 'blur(20px)';
                    element.style.background = 'rgba(255, 255, 255, 0.03)';
                }, 200);
            }

            element.classList.add('animated');

            // Add completion glow effect
            if (!reduceMotion) {
                setTimeout(() => {
                    element.style.boxShadow = `
                        ${element.style.boxShadow || ''},
                        0 0 40px rgba(0, 212, 255, 0.2)`;

                    setTimeout(() => {
                        element.style.boxShadow = element.style.boxShadow
                            .replace(/,\s*0 0 40px rgba\(0, 212, 255, 0\.2\)/, '');
                    }, 1000);
                }, 400);
            }
        }
    }

    // Initialize Scroll Animation Controller
    const scrollAnimationController = new ScrollAnimationController();

    // Add particle field background
    if (!reduceMotion && isHighPerformance) {
        const particleField = document.createElement('div');
        particleField.className = 'particle-field';
        document.body.appendChild(particleField);
    }

    // Add performance-optimized floating animations
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg) translateZ(0); }
            33% { transform: translateY(-8px) rotate(0.5deg) translateZ(0); }
            66% { transform: translateY(4px) rotate(-0.5deg) translateZ(0); }
        }

        @keyframes float-intense {
            0%, 100% { transform: translateY(0px) scale(1) translateZ(0); }
            50% { transform: translateY(-12px) scale(1.02) translateZ(0); }
        }

        .floating {
            animation: float 8s ease-in-out infinite;
            will-change: transform;
        }

        .floating-intense {
            animation: float-intense 6s ease-in-out infinite;
            will-change: transform;
        }

        .floating:nth-child(2n) { animation-delay: -2.5s; }
        .floating:nth-child(3n) { animation-delay: -5s; }
        .floating:nth-child(4n) { animation-delay: -7.5s; }

        /* Disable animations on mobile for performance */
        @media (max-width: 768px) {
            .floating, .floating-intense {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // Initialize glassmorphic particle field
    if (!document.querySelector('.particle-field') && !reduceMotion && isHighPerformance) {
        const particleField = document.createElement('div');
        particleField.className = 'particle-field';
        document.body.insertBefore(particleField, document.body.firstChild);
    }

    // Add tech dividers to sections
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index > 0 && !section.querySelector('.tech-divider')) {
            const divider = document.createElement('div');
            divider.className = 'tech-divider';
            section.insertBefore(divider, section.firstChild);
        }
    });

    // Initialize performance monitoring
    let performanceMetrics = {
        frameCount: 0,
        lastTime: performance.now(),
        averageFPS: 60
    };

    function monitorPerformance() {
        performanceMetrics.frameCount++;
        const currentTime = performance.now();

        if (currentTime - performanceMetrics.lastTime > 1000) {
            performanceMetrics.averageFPS = (performanceMetrics.frameCount * 1000) / (currentTime - performanceMetrics.lastTime);

            // Adjust effects based on performance
            if (performanceMetrics.averageFPS < 45) {
                document.documentElement.classList.add('low-performance');
                // Reduce particle count or disable some effects
                if (particleSystem && particleSystem.particleCount > 30) {
                    particleSystem.particleCount = 30;
                    particleSystem.createParticles();
                }
            } else {
                document.documentElement.classList.remove('low-performance');
            }

            performanceMetrics.frameCount = 0;
            performanceMetrics.lastTime = currentTime;
        }

        requestAnimationFrame(monitorPerformance);
    }

    if (isHighPerformance) {
        requestAnimationFrame(monitorPerformance);
    }
});

// Performance cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (particleSystem) {
        particleSystem.destroy();
    }
});