import tokenUsername from "../classes/tokenUsername.js";

class ProjectMethods {
    getProjectFromForm(form) {
        const formData = new FormData(form);

        let project = {};
        formData.forEach((value, key) => {
            project[key] = value;
        });

        return project;
    }

    async addProject(project) {
        const addProjectModal = document.getElementById("add-project-modal");
        try {
            const response = await fetch(
                `http://localhost:5000/project/add?username=${tokenUsername.getUsername()}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(project),
                }
            );

            if (response.ok) {
                addProjectModal.close();
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }
    }

    async getProjects() {
        const res = await fetch(
            `http://localhost:5000/project/get?username=${tokenUsername.getUsername()}`
        );
        let arr = await res.json();

        arr = arr.map((item) => ({ [`${item.name}`]: item.name }));
        return arr;
    }
}

export default new ProjectMethods();
