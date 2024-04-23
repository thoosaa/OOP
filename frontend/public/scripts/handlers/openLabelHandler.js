import tokenUsername from "../classes/tokenUsername.js";

const labelList = document.getElementById("labels-list");
labelList.addEventListener("click", (event) => {
    let list = event.target.closest("li");
    if (list) {
        let currProjectName = list.getElementsByTagName("span")[1].innerText;
        document.location.href = `http://localhost:5000/label?username=${tokenUsername.getUsername()}&currLabelName=${encodeURIComponent(
            currProjectName
        )}`;
    }
});
