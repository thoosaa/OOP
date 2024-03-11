window.addEventListener("load", (event) => {
    fetch("http://localhost:5000/getProjects")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                //console.log(data[i]);

                addProjectDisplay(data[i].name, data[i].color);
            }
    })
});

const addProjectBtn = document.getElementById("add-project-button");

addProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addProjectDisplay(document.getElementById('projectName').value, document.getElementById('color').value);

    let projectObj = {
        name: document.getElementById('projectName').value,
        color: document.getElementById('color').value
    };

    document.getElementById("add-project-widget").style.visibility = "hidden";
    sendProjectToDB(projectObj);
});

const navAddProjectBtn = document.getElementById("add-new-Project");
navAddProjectBtn.addEventListener("click", (e) => {
    document.getElementById("add-project-widget").style.visibility = "visible";
});

const closeAddTaskBtn = document.getElementById("close-project-widget");
closeAddTaskBtn.addEventListener("click", (e) => {
    document.getElementById("add-project-widget").style.visibility = "hidden";
});

async function sendProjectToDB(projectObj) {
    const res = await fetch("http://localhost:5000/addProject", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: projectObj.name, 
            color: projectObj.color
        })
    })
}

function addProjectDisplay(ProjectName, Color) {
    let container = document.getElementById("projects-list");
    let projectElem = document.createElement("li");
    projectElem.className = "project";
    projectElem.innerHTML = `<span class="material-symbols-outlined hashtag">
    tag
    </span><span>${ProjectName}</span>`;
    container.appendChild(projectElem);

    const hashtags = document.getElementsByClassName('material-symbols-outlined hashtag');
    const hashtag = hashtags[hashtags.length - 1];
    //console.log(hashtag);
    hashtag.style.color = Color;
}