import tokenUsername from "../classes/tokenUsername.js";
import userSettings from "../classes/userSettings.js";

const settingsBtn = document.querySelector("#user-settings");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const saveChanges = document.getElementById("save-user-changes");

console.log(settingsModal);

settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userSettings.setCorrectSettings();
    settingsModal.showModal();
});

closeSettingsModal.addEventListener("click", (e) => {
    e.preventDefault();
    settingsModal.close();
});

saveChanges.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(
        document.getElementById("user-settings-input")
    );

    userSettings.saveChanges(formData);
    settingsModal.close();
});

const newPfp = document.getElementById("newPfpURL");
newPfp.addEventListener("change", (e) => {
    document.getElementById("settings-user-img").src = newPfp.value;
});

const newUsername = document.getElementById("newUsername");
newUsername.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, "");
});
