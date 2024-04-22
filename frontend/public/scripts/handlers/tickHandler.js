export default function a() {
    const ticks = document.querySelectorAll(".task-button");
    console.log(ticks);

    ticks.forEach((tick) => {
        tick.querySelector(".task-check").style.visibility = "hidden";

        tick.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            tick.querySelector(".task-check").style.visibility = "visible";
        });

        tick.addEventListener("mouseleave", () => {
            tick.querySelector(".task-check").style.visibility = "hidden";
        });
    });
}
