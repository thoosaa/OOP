import projectMethods from "./projectMethods.js";
import labelMethods from "./labelMethods.js";

class FormOptions {
    async setProjectOptions(field) {
        field.innerHTML = "";

        let options = await projectMethods.getProjects();
        options.unshift({ Входящие: "inbox" });

        console.log(options);

        for (const obj of options) {
            for (const key of Object.keys(obj)) {
                const optionElement = document.createElement("option");
                optionElement.value = obj[key];
                optionElement.textContent = key;
                field.appendChild(optionElement);
            }
        }
    }

    async setLabelOptions(field) {
        field.innerHTML = "";

        let options = await labelMethods.getLabels();
        options.unshift({ Входящие: "inbox" });

        console.log(options);

        for (const obj of options) {
            for (const key of Object.keys(obj)) {
                const optionElement = document.createElement("option");
                optionElement.value = obj[key];
                optionElement.textContent = key;
                field.appendChild(optionElement);
            }
        }
    }
}

export default new FormOptions();
