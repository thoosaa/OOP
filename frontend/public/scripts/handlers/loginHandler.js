const login = document.getElementById("form");

login.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(login);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({ username, password }),
        });

        if(res.ok){
            const data = await res.json();
            const { token } = data;

            console.log(token);
            sessionStorage.setItem("token", token);
            window.location.href = "/inbox"; 
        }
        else{
            const msg = await res.json()
            document.getElementById('error-text').innerText = msg.message;
            document.getElementById("error-modal").showModal();
            console.log(msg);
        }
                
    } catch (e) {
        window.alert(e);
    }
});


const closeErr = document.querySelector('#error-modal div button');
closeErr.addEventListener('click', (e)=>{
    document.getElementById("error-modal").close();
})
