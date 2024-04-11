const addProjectBtnNav = document.getElementById("add-new-Project");
const addProjectModal = document.getElementById('add-project-modal');
const addProjectBtn = document.getElementById('add-project-button');
const closeProjectModal = document.getElementById('close-project-modal');
const form = document.getElementById('add-project-form');

addProjectBtnNav.addEventListener("click", (e) => {
    e.preventDefault();
    addProjectModal.showModal();
});

closeProjectModal.addEventListener('click', (e) => {
    e.preventDefault();
    addProjectModal.close();
})

addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    let project = {};
    formData.forEach((value, key) => {
        project[key] = value;
    })

    
})
