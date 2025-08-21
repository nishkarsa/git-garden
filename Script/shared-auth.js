// shared-auth.js
class AuthManager {
    constructor() {
        this.isLoggedIn = localStorage.getItem('gitgarden_auth') === 'true';
        this.initializeAuth();
    }

    initializeAuth() {
        this.updateAuthUI();
        this.setupLogoutHandler();
    }

 updateAuthUI() {
    const authNavButtons = document.getElementById('authNavButtons');
    const userIconNav = document.getElementById('userIconNav');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const profileImg = document.getElementById('profileImg');

    if (authNavButtons && userIconNav) {
        if (this.isLoggedIn) {
            authNavButtons.style.display = 'none';
            userIconNav.style.display = 'flex';

            // Get user data from localStorage (set this after login)
            const user = JSON.parse(localStorage.getItem('gitgarden_user'));

            if (userNameDisplay && user) {
                userNameDisplay.textContent = user.displayName || user.email || "User";
            }

            if (profileImg && user && user.photoURL) {
                profileImg.src = user.photoURL;
                profileImg.style.display = "inline-block";
            }
        } else {
            authNavButtons.style.display = 'flex';
            userIconNav.style.display = 'none';
        }
    }
}


    login() {
        this.isLoggedIn = true;
        localStorage.setItem('gitgarden_auth', 'true');
        this.updateAuthUI();
    }

    logout() {
    firebaseLogout(); // Use Firebase logout instead
    }

    setupLogoutHandler() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
                this.showNotification('You have been logged out!', 'info');
            });
        }
    }

    showNotification(message, type) {
        // Move your notification function here
    }
}


// Initialize auth manager on all pages
const authManager = new AuthManager();

// Add this method to your AuthManager class
redirectToAuth(mode = 'login') 
{
    const currentPath = window.location.pathname;
    
    // If already on main page, just show modal
    if (currentPath.includes('index.html') || currentPath === '/') {
        isLoginMode = (mode === 'login');
        updateModalContent();
        openModal();
    } else {
        // Redirect to main page with auth parameter
        window.location.href = `../index.html?show${mode.charAt(0).toUpperCase() + mode.slice(1)}=true`;
    }
}