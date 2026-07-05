import { setSort } from "./store.js";

export function initSorting() {

    const sort =
        document.getElementById("sortSelect");

    if (!sort) return;

    sort.addEventListener("change", () => {

        setSort(sort.value);

    });

}