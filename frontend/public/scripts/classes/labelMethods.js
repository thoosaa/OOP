import tokenUsername from "../classes/tokenUsername.js";

class LabelMethods {
    getLabelFromForm(form) {
        const formData = new FormData(form);

        let label = {};
        formData.forEach((value, key) => {
            label[key] = value;
        });

        return label;
    }

    async addLabel(label) {
        const addLabelModal = document.getElementById("add-label-modal");
        try {
            const responce = await fetch(
                `http://localhost:5000/label/add?username=${tokenUsername.getUsername()}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(label),
                }
            );

            if (responce.ok) {
                addLabelModal.close();
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }
    }

    async getLabels() {
        const res = await fetch(
            `http://localhost:5000/label/get?username=${tokenUsername.getUsername()}`
        );
        let arr = await res.json();

        arr = arr.map((item) => ({ [`${item.name}`]: item.name }));
        return arr;
    }

    async formLabelDict() {
        const res = await fetch(
            `http://localhost:5000/label/get?username=${tokenUsername.getUsername()}`
        );
        let arr = await res.json();

        let dict = {};
        arr.forEach((item) => {
            dict[`${item.name}`] = `${item.color}`;
        });

        return dict;
    }
}

export default new LabelMethods();
