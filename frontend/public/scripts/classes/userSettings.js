import tokenUsername from "../classes/tokenUsername.js";

class UserSettings {
    async getPfp() {
        const res = await fetch(
            `http://localhost:5000/user/getPfp?username=${tokenUsername.getUsername()}`
        );
        const data = res.json();

        return data;
    }

    async setUsername(newUsername) {
        const res = await fetch(
            `http://localhost:5000/user/setUsername?username=${tokenUsername.getUsername()}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: newUsername }),
            }
        );

        const token = await res.json();
        console.log(token);
        sessionStorage.setItem("token", token.token);
    }

    async setPfp(newPfp) {
        const res = await fetch(
            `http://localhost:5000/user/setPfp?username=${tokenUsername.getUsername()}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ picture: newPfp }),
            }
        );
    }

    async setCorrectSettings() {
        document.getElementById("newUsername").value =
            tokenUsername.getUsername();
        document.getElementById("newPfpURL").value = await this.getPfp();
        document.getElementById("settings-user-img").src = await this.getPfp();
    }

    async setUserImage() {
        document.querySelector("#user img").src = await this.getPfp();
    }

    async saveChanges(formData) {
        const username = formData.get("username");
        const pfp = formData.get("pfp");
        if (pfp !== this.getPfp()) {
            await this.setPfp(pfp);
        }
        if (username !== tokenUsername.getUsername()) {
            console.log(username);
            await this.setUsername(username);
        }

        console.log(tokenUsername.getUsername());
        document.getElementById("username").innerText =
            tokenUsername.getUsername();
        await this.setUserImage();
    }
}

export default new UserSettings();
