import labelMethods from "../classes/labelMethods.js";
import labelDisplay from "../classes/labelDisplay.js";

const addLabelBtnNav = document.getElementById("add-new-label");
const addLabelModal = document.getElementById("add-label-modal");
const form = document.getElementById("add-label-form");
const closeLabelModal = document.getElementById("close-label-modal");

addLabelBtnNav.addEventListener("click", (e) => {
    e.preventDefault();
    addLabelModal.showModal();
});

closeLabelModal.addEventListener("click", (e) => {
    e.preventDefault();
    addLabelModal.close();
});

addLabelModal.addEventListener("click", async (e) => {
    e.preventDefault();

    let label = labelMethods.getLabelFromForm(form);
    console.log(label);
    labelMethods.addLabel(label);
    await labelDisplay.display();
});
