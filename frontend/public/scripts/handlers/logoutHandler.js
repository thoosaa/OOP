const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener('click',async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/logout");

    if (response.ok) {
        sessionStorage.clear();
        window.location.href = "http://localhost:5000/auth/login";
    }
})