import projectDisplay from "../classes/projectDisplay.js";
import projectMethods from "../classes/projectMethods.js";

const addProjectBtnNav = document.getElementById("add-new-Project");
const addProjectModal = document.getElementById('add-project-modal');
const addProjectBtn = document.getElementById('add-project-button');
const closeProjectModal = document.getElementById('close-project-modal');
const form = document.getElementById('add-project-form');

addProjectBtnNav.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('jhjdhj');
    addProjectModal.showModal();
});

closeProjectModal.addEventListener('click', (e) => {
    e.preventDefault();
    addProjectModal.close();
})

addProjectBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    let project = projectMethods.getProjectFromForm(form);
    projectMethods.addProject(project);
    await projectDisplay.display();
})
