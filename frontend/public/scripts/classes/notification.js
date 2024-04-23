import tokenUsername from "../classes/tokenUsername.js";

class Notification {
    async getNotification() {
        const res = await fetch(
            `http://localhost:5000/notification/get?username=${tokenUsername.getUsername()}`
        );
        const data = await res.json();

        const correctData = data.map((item) => {
            const [name, description, timeString] = item;
            const timeDate = new Date(timeString);
            const hours = timeDate.getHours();
            const minutes = timeDate.getMinutes();
            return [name, description, [hours, minutes]];
        });

        return correctData;
    }
}

export default new Notification();
