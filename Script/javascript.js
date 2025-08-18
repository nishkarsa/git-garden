console.log("JavaScript file loaded successfully!");
// Enhanced Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Enhanced smooth scrolling
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

// Dynamic navbar effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Enhanced level card interactions
document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) rotateX(5deg) rotateY(5deg) scale(1.02)';
        createParticles(card);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Particle creation function
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * rect.width + rect.left + 'px';
        particle.style.top = Math.random() * rect.height + rect.top + 'px';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Enhanced level button clicks
document.querySelectorAll('.level-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const levelName = button.closest('.level-card').querySelector('h3').textContent;

        // Create explosion effect
        createExplosion(e.target);

        // Simulate level start with enhanced feedback
        setTimeout(() => {
            alert(`🚀 Launching ${levelName} Adventure!\n\n✨ Get ready for an epic learning journey!\n\nThis would redirect to your chosen adventure in the full application.`);
        }, 300);
    });
});

// Explosion effect function
function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;

        const angle = (Math.PI * 2 * i) / 15;
        const velocity = Math.random() * 100 + 50;
        particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Enhanced cursor trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    // Limit trail length
    if (mouseTrail.length > 10) {
        mouseTrail.shift();
    }

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
    document.body.appendChild(trail);

    mouseTrail.push(trail);

    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1000);
});

// Parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;

        shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Enhanced feature card animations
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        createRippleEffect(feature);
    });
});

// Ripple effect function
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(6, 255, 165, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Logo click easter egg
document.querySelector('.logo').addEventListener('click', () => {
    const logo = document.querySelector('.logo i');
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'pulse 0.5s ease 3';
    }, 10);

    // Show fun message
    const message = document.createElement('div');
    message.innerHTML = '🎉 Welcome to GitGarden! 🌱';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(6, 255, 165, 0.9)';
    message.style.color = 'white';
    message.style.padding = '1rem 2rem';
    message.style.borderRadius = '25px';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '10000';
    message.style.animation = 'bounceIn 0.5s ease';

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => message.remove(), 500);
    }, 2000);
});

// CTA button enhanced interaction
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();

    // Create burst effect
    const button = e.target;
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = rect.left + rect.width / 2 + 'px';
        spark.style.top = rect.top + rect.height / 2 + 'px';
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.background = '#06ffa5';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '9999';

        const angle = (Math.PI * 2 * i) / 20;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1000 + 500;

        spark.style.animation = `sparkMove ${duration}ms ease-out forwards`;
        spark.style.setProperty('--moveX', Math.cos(angle) * distance + 'px');
        spark.style.setProperty('--moveY', Math.sin(angle) * distance + 'px');

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), duration);
    }

    // Smooth scroll to levels section
    setTimeout(() => {
        document.getElementById('levels').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
});

// Add spark animation
const sparkStyle = document.createElement('style');
sparkStyle.textContent = `
            @keyframes sparkMove {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--moveX), var(--moveY)) scale(0);
                }
            }
        `;
document.head.appendChild(sparkStyle);

// Intersection Observer for fade-in animations
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

// Observe elements for fade-in
document.querySelectorAll('.feature, .level-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add typing effect to banner subtitle
const subtitle = document.querySelector('.banner p');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
};

setTimeout(typeWriter, 1000);

// Console easter egg
console.log(`
    🌱 Welcome to GitGarden! 🌱
    
    ╔══════════════════════════════════╗
    ║  You found the developer console! ║
    ║  Ready to plant some code seeds?  ║
    ╚══════════════════════════════════╝
    
    Try typing: git --help
        `);

// Performance optimization: Throttle scroll events
let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});
