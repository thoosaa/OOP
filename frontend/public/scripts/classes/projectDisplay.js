import tokenUsername from "../classes/tokenUsername.js";

class projectDisplay {
    display() {
        document.getElementById("projects-list").innerHTML = "";
        fetch(
            `http://localhost:5000/project/get?username=${tokenUsername.getUsername()}`
        )
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    this.#addProjectDisplay(data[i].name, data[i].color);
                }
            });
    }

    #addProjectDisplay(Name, Color) {
        console.log(Name, Color);
        let container = document.getElementById("projects-list");
        let projectElem = document.createElement("li");
        projectElem.className = "project";
        projectElem.innerHTML = `<span class="material-symbols-outlined hashtag">
    tag
    </span><span>${Name}</span>`;
        container.appendChild(projectElem);

        const hashtag = projectElem.querySelector(".material-symbols-outlined");
        hashtag.style.color = Color;
    }
}

export default new projectDisplay();
