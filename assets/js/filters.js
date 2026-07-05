import { setCategory } from "./store.js";

export function initFilters() {

    const category =
        document.getElementById("categoryFilter");

    if (!category) return;

    category.addEventListener("change", () => {

        setCategory(category.value);

    });

}