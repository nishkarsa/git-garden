console.log("JavaScript file loaded successfully!");
// Auth Modal Management
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeModal = document.getElementById('closeModal');
const switchMode = document.getElementById('switchMode');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const switchText = document.getElementById('switchText');
const authForm = document.getElementById('authForm');
const authNavButtons = document.getElementById('authNavButtons');
const userIconNav = document.getElementById('userIconNav');
const userNameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn'); // Get the new logout button

let isLoginMode = true;
let isLoggedIn = false; // Track user login status

// Function to update UI based on login status
function updateAuthUI() {
    if (isLoggedIn) {
        authNavButtons.style.display = 'none';
        userIconNav.style.display = 'flex'; // Show user icon and logout button
        // You might want to set the username here if you have it
        // userNameDisplay.textContent = "Logged In User"; 
    } else {
        authNavButtons.style.display = 'flex';
        userIconNav.style.display = 'none'; // Hide user icon and logout button
    }
}

// Initial UI update
updateAuthUI();

// Open login modal
loginBtn.addEventListener('click', () => {
    isLoginMode = true;
    updateModalContent();
    openModal();
});

// Open signup modal
signupBtn.addEventListener('click', () => {
    isLoginMode = false;
    updateModalContent();
    openModal();
});

// Close modal
closeModal.addEventListener('click', closeModalHandler);
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        closeModalHandler();
    }
});

// Switch between login and signup
switchMode.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    updateModalContent();
    
    // Add transition effect
    const modal = document.querySelector('.auth-modal');
    modal.style.transform = 'scale(0.95)';
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
    }, 150);
});

function updateModalContent() {
    if (isLoginMode) {
        modalTitle.textContent = 'Welcome Back';
        modalSubtitle.textContent = 'Sign in to continue your Git journey';
        confirmPasswordGroup.style.display = 'none';
        submitText.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchMode.textContent = 'Sign up';
    } else {
        modalTitle.textContent = 'Join GitGarden';
        modalSubtitle.textContent = 'Start your epic coding adventure today';
        confirmPasswordGroup.style.display = 'block';
        submitText.textContent = 'Create Account';
        switchText.textContent = 'Already have an account?';
        switchMode.textContent = 'Sign in';
    }
}

function openModal() {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        document.querySelector('.form-input').focus();
    }, 300);
}

function closeModalHandler() {
    authModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    authForm.reset();
    submitBtn.classList.remove('loading');
}

// Password toggle functionality
const passwordToggle = document.getElementById('passwordToggle');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');

passwordToggle.addEventListener('click', () => {
    togglePasswordVisibility(passwordInput, passwordToggle);
});

confirmPasswordToggle.addEventListener('click', () => {
    togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
});

function togglePasswordVisibility(input, toggle) {
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    }
}

// Form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const clearLoading = addPremiumLoading(submitBtn);
    submitBtn.disabled = true;
    
    try {
        // Simulate API call with realistic delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Success effects
        createAuthSuccessEffect();
        createSuccessEffect();
        
        const action = isLoginMode ? 'signed in' : 'account created';
        showNotification(`🎉 Successfully ${action}! Welcome to GitGarden!`, 'success');
        
        isLoggedIn = true; // Set login status to true on successful auth
        updateAuthUI(); // Update UI after successful login/signup

        setTimeout(() => {
            closeModalHandler();
        }, 1500);
        
    } catch (error) {
        showNotification('❌ Something went wrong. Please try again.', 'error');
    } finally {
        clearLoading();
        submitBtn.disabled = false;
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    isLoggedIn = false; // Set login status to false
    updateAuthUI(); // Update UI to show login/signup buttons
    showNotification('👋 You have been logged out!', 'info');
    // In a real app, you would also clear session data (e.g., localStorage.removeItem('authToken'))
});

// Social auth buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = e.currentTarget.classList.contains('github') ? 'GitHub' : 'Google';
        showNotification(`🚀 ${provider} authentication would be implemented here!`, 'info');
    });
});

function createSuccessEffect() {
    const modal = document.querySelector('.auth-modal');
    const rect = modal.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width/2 + 'px';
        particle.style.top = rect.top + rect.height/2 + 'px';
        particle.style.background = `hsl(${Math.random() * 60 + 120}, 70%, 60%)`;
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.zIndex = '10001';
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 200 + 100;
        particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.position = 'fixed';
    notification.style.top = '2rem';
    notification.style.right = '2rem';
    notification.style.background = type === 'success' ? 'rgba(6, 255, 165, 0.9)' : 'rgba(58, 134, 255, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '15px';
    notification.style.fontSize = '1rem';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10002';
    notification.style.animation = 'slideInFromRight 0.5s ease';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(notificationStyle);
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
        
        // Check if user is logged in
        if (!isLoggedIn) {
            // Show login modal if not logged in
            isLoginMode = true;
            updateModalContent();
            openModal();
            showNotification('🔒 Please log in to start your adventure!', 'info');
            return;
        }
        
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
// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape' && authModal.classList.contains('active')) {
        closeModalHandler();
    }
    
    // Alt + L for login
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        isLoginMode = true;
        updateModalContent();
        openModal();
    }
    
    // Alt + S for signup
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        isLoginMode = false;
        updateModalContent();
        openModal();
    }
});

// Form validation
const emailInput = document.querySelector('input[type="email"]');
const passwordInputs = document.querySelectorAll('input[type="password"]');

// Real-time email validation
emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email && !isValid) {
        e.target.style.borderColor = '#ff006e';
        e.target.style.boxShadow = '0 0 10px rgba(255, 0, 110, 0.3)';
    } else {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        e.target.style.boxShadow = 'none';
    }
});

// Password strength indicator
passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = getPasswordStrength(password);
    updatePasswordStrength(e.target, strength);
});

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function updatePasswordStrength(input, strength) {
    const colors = ['#ff006e', '#ff8500', '#ffd700', '#06ffa5'];
    const color = colors[strength - 1] || '#ff006e';
    
    if (input.value) {
        input.style.borderColor = color;
        input.style.boxShadow = `0 0 10px ${color}30`;
    }
}

// Auto-focus next input on Enter
document.querySelectorAll('.form-input').forEach((input, index, inputs) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && index < inputs.length - 1) {
            e.preventDefault();
            inputs[index + 1].focus();
        }
    });
});

// Enhanced modal animations
authModal.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity' && !authModal.classList.contains('active')) {
        // Reset form styles when modal closes
        document.querySelectorAll('.form-input').forEach(input => {
            input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            input.style.boxShadow = 'none';
        });
    }
});

// Particle effect on successful auth
function createAuthSuccessEffect() {
    const colors = ['#06ffa5', '#ff006e', '#3a86ff', '#ffbe0b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = '-10px';
            particle.style.width = Math.random() * 8 + 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10001';
            particle.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 5000);
        }, i * 100);
    }
}

// Add falling animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 50}px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);

// Add premium loading states
function addPremiumLoading(button) {
    const originalText = button.innerHTML;
    const dots = ['⚡', '🌟', '✨', '🚀'];
    let i = 0;
    
    const interval = setInterval(() => {
        button.innerHTML = `${dots[i % dots.length]} Processing...`;
        i++;
    }, 300);
    
    return () => {
        clearInterval(interval);
        button.innerHTML = originalText;
    };
}
