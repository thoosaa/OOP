import tokenUsername from "../classes/tokenUsername.js";

const projectList = document.getElementById("projects-list");
projectList.addEventListener("click", (event) => {
    let list = event.target.closest("li");
    if (list) {
        let currProjectName = list.getElementsByTagName("span")[1].innerText;
        document.location.href = `http://localhost:5000/project?username=${tokenUsername.getUsername()}&currProjectName=${encodeURIComponent(
            currProjectName
        )}`;
    }
});
