// Get Auth Instance
const auth = firebase.auth();

// Google Login
document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);

        // ✅ Fix localStorage
        localStorage.setItem("gitgarden_auth", "true"); 
        localStorage.setItem("gitgarden_user", JSON.stringify(result.user));

        // ✅ Only first name
        const fullName = result.user.displayName || "User";
        const firstName = fullName.split(" ")[0];

        alert(`Welcome ${firstName}`);
        window.location.reload();
    } catch (error) {
        console.error("Google login failed:", error.message);
    }
});

// GitHub Login
document.getElementById("githubLoginBtn")?.addEventListener("click", async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);

        localStorage.setItem("gitgarden_auth", "true"); 
        localStorage.setItem("gitgarden_user", JSON.stringify(result.user));

        // ✅ Only first name
        const fullName = result.user.displayName || "User";
        const firstName = fullName.split(" ")[0];

        alert(`Welcome ${firstName}`);
        window.location.reload();
    } catch (error) {
        console.error("GitHub login failed:", error.message);
    }
});

function firebaseLogout() {
    auth.signOut().then(() => {
        localStorage.removeItem("gitgarden_auth");
        localStorage.removeItem("gitgarden_user");

        const currentPage = window.location.pathname;

        // Pages that should reload instead of redirect
        const stayPages = ["/about_us.html", "/contact_us.html"];

        if (stayPages.some(page => currentPage.endsWith(page))) {
            // Reload same page
            window.location.reload();
        } else {
            // Default: go back to index
            window.location.replace(window.location.origin + "/git-garden/index.html");
        }
    }).catch((error) => {
        console.error("Logout error:", error.message);
    });
}




