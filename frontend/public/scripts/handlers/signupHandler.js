const signup = document.getElementById("form");

signup.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log('hjghjgj');

    const formData = new FormData(signup);
    const username = formData.get("username");
    const password = formData.get("password");
    ///////////////////////////////////////////////////////////////
    try {
        const res = await fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({ username, password }),
        });

        console.log('hjghjgj');

        if(res.ok){
            const msg = await res.json();
            console.log(msg);
            window.location.href = "/auth/login"; 
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