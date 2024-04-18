const showPassword = document.getElementById("showPassword");
showPassword.addEventListener("click", (e) => {
    e.preventDefault();
    const passwordField = document.getElementById("password");
    const icon = document.querySelector("#showPassword");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.innerHTML =
            '<span> <span class="material-symbols-outlined">visibility</span></span>';
    } else {
        passwordField.type = "password";
        icon.innerHTML =
            '<span> <span class="material-symbols-outlined">visibility_off</span></span>';
    }
});
