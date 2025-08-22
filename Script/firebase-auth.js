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

        alert(`Welcome ${result.user.displayName}`);
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

        alert(`Welcome ${result.user.displayName}`);
        window.location.reload();
    } catch (error) {
        console.error("GitHub login failed:", error.message);
    }
});
function firebaseLogout() {
    auth.signOut().then(() => {
        localStorage.removeItem("gitgarden_auth");
        localStorage.removeItem("gitgarden_user");
        window.location.replace(window.location.origin + "/git-garden/index.html");
    }).catch((error) => {
        console.error("Logout error:", error.message);
    });
}



