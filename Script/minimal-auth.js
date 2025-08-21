// minimal-auth.js - For pages that don't need full auth functionality
class MinimalAuth {
    constructor() {
        this.isLoggedIn = localStorage.getItem('gitgarden_auth') === 'true';
        this.initializeAuth();
    }

    initializeAuth() {
        this.updateAuthUI();
        this.setupAuthHandlers();
    }

    updateAuthUI() {
        const authNavButtons = document.getElementById('authNavButtons');
        const userIconNav = document.getElementById('userIconNav');
        
        if (authNavButtons && userIconNav) {
            if (this.isLoggedIn) {
                authNavButtons.style.display = 'none';
                userIconNav.style.display = 'flex';
            } else {
                authNavButtons.style.display = 'flex';
                userIconNav.style.display = 'none';
            }
        }
    }

    setupAuthHandlers() {
        // Login button - redirect to main page
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.location.href = '../index.html?showLogin=true';
            });
        }

        // Signup button - redirect to main page
        const signupBtn = document.getElementById('signupBtn');
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                window.location.href = '../index.html?showSignup=true';
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
                this.showNotification('You have been logged out!', 'info');
            });
        }
    }

    logout() {
    firebaseLogout(); // Use Firebase logout instead
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.position = 'fixed';
        notification.style.top = '2rem';
        notification.style.right = '2rem';
        notification.style.background = type === 'success' ? 'rgba(6, 255, 165, 0.9)' : 'rgba(58, 134, 255, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '15px';
        notification.style.zIndex = '10002';
        notification.style.animation = 'slideInFromRight 0.5s ease';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize minimal auth
const minimalAuth = new MinimalAuth();