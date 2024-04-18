const addLabelBtnNav = document.getElementById("add-new-label");
const addLabelModal = document.getElementById("add-label-modal");
const closeLabelModal = document.getElementById("close-label-modal");

document.getElementById("deadline").min = new Date()
    .toISOString()
    .split("T")[0];

addLabelBtnNav.addEventListener("click", (e) => {
    e.preventDefault();
    addLabelModal.showModal();
});

closeLabelModal.addEventListener("click", (e) => {
    e.preventDefault();
    addLabelModal.close();
});
