const labelList = document.getElementById("projects-list");
labelList.addEventListener("click", (event) => {
    let list = event.target.closest("li");
    if (list) {
        let currProjectName = list.getElementsByTagName("span")[1].innerText;
        document.location.href = `http://localhost:5000/label?currProjectName=${encodeURIComponent(
            currProjectName
        )}`;
    }
});
