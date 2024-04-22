import tokenUsername from "../classes/tokenUsername.js";

class labelDisplay {
    display() {
        document.getElementById("labels-list").innerHTML = "";
        fetch(
            `http://localhost:5000/label/get?username=${tokenUsername.getUsername()}`
        )
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    this.#addLabelDisplay(data[i].name, data[i].color);
                }
            });
    }

    #addLabelDisplay(Name, Color) {
        console.log(Name, Color);
        let container = document.getElementById("labels-list");
        let projectElem = document.createElement("li");
        projectElem.className = "project";
        projectElem.innerHTML = `<span class="material-symbols-outlined hashtag">
    tag
    </span><span>${Name}</span>`;
        container.appendChild(projectElem);

        const hashtags = document.getElementsByClassName(
            "material-symbols-outlined hashtag"
        );
        const hashtag = hashtags[hashtags.length - 1];
        //console.log(hashtag);
        hashtag.style.color = Color;
    }
}

export default new labelDisplay();
