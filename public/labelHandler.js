import * as DB from './DataBase.js';

window.addEventListener("load", (event) => {
    fetch("http://localhost:5000/getLabels")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                console.log(data[i]);
                addLabelDisplay(data[i].name, data[i].color);
            }
    })
});

const navAddLabelBtn = document.getElementById('add-new-label');
navAddLabelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('add-label-widget').style.visibility = "visible";
})

const addLabelBtn = document.getElementById('add-label-button');
addLabelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    addLabelDisplay(document.getElementById('labelName').value, document.getElementById('labelColor').value);

    let labelObj = {
        name: document.getElementById('labelName').value,
        color: document.getElementById('labelColor').value
    };

    document.getElementById('add-label-widget').style.visibility = "hidden";
    DB.default.addLabel(labelObj);
})

function addLabelDisplay(LabelName, LabelColor) {
    let container = document.getElementById('labels-list');
    let labelElem = document.createElement('li');
    labelElem.className = 'label';
    labelElem.innerHTML = `<span class="material-symbols-outlined labelIcon">
    label
    </span><span>${LabelName}</span>`;
    container.appendChild(labelElem);

    const labelIcons = document.getElementsByClassName('material-symbols-outlined labelIcon');
    const labelIcon = labelIcons[labelIcons.length - 1];
    labelIcon.style.color = LabelColor;
}
