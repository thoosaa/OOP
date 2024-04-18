class InboxDisplay {
    #createDateElement(date) {
        const dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = date.toDateString();
        return dateElement;
    }

    createDates() {
        let columns = [];
        const gridContainer = document.getElementById("date-display");

        for (let i = 0; i < 7; i++) {
            const columnDate = new Date();
            columnDate.setDate(columnDate.getDate() + i);
            const column = document.createElement("div");
            column.classList.add("column");
            column.appendChild(this.#createDateElement(columnDate));
            gridContainer.appendChild(column);

            columns.push(column);
        }

        return columns;
    }
}

export default new InboxDisplay();
