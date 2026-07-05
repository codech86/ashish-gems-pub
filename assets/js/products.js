/*
==========================================
Ashish Gems
Products Page Controller
Version : v0.2
==========================================
*/

import { createProductCard } from "./renderer.js";
import {
    initialize,
    restoreState,
    subscribe,
    getState
} from "./store.js";

import { initSearch } from "./search.js";
import { initFilters } from "./filters.js";
import { initSorting } from "./sorting.js";
import {
    initPagination,
    updateLoadMore
} from "./pagination.js";

import { initNavigation } from "../modules/navigation.js";

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const categoryFilter = document.getElementById("categoryFilter");

document.addEventListener("DOMContentLoaded", initPage);

/*
==========================================
Initialize Page
==========================================
*/

async function initPage() {

    initNavigation();

    const products = await loadProducts();

    if (!products.length) {

        showError();

        return;

    }

    restoreState();

    initialize(products);

    populateCategories(products);

    subscribe(renderUI);

    initSearch();

    initFilters();

    initSorting();

    initPagination();

    renderUI(getState());

}

/*
==========================================
Load JSON
==========================================
*/

async function loadProducts() {

    try {

        const response = await fetch("../../data/products.json");

        if (!response.ok) {

            throw new Error("Unable to load products");

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

/*
==========================================
Render UI
==========================================
*/

function renderUI(state) {

    renderProducts(state.visibleProducts);

    updateCounter(state.totalProducts);

    updateLoadMore(state.hasMore);

}

/*
==========================================
Render Product Cards
==========================================
*/

function renderProducts(products) {

    if (!products.length) {

        productGrid.innerHTML = noProductsTemplate();

        return;

    }

    productGrid.innerHTML = products
        .map(product => createProductCard(product))
        .join("");

}

/*
==========================================
Counter
==========================================
*/

function updateCounter(total) {

    productCount.textContent =
        `${total} Product${total === 1 ? "" : "s"} Found`;

}

/*
==========================================
Category Dropdown
==========================================
*/

function populateCategories(products) {

    const categories = [

        ...new Set(

            products.map(product => product.category)

        )

    ].sort();

    categoryFilter.innerHTML =

        `<option value="all">

            All Categories

        </option>`;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}

/*
==========================================
Error Template
==========================================
*/

function showError() {

    productGrid.innerHTML =

        `<div class="no-results">

            <h2>

                Unable to load products

            </h2>

            <p>

                Please try again later.

            </p>

        </div>`;

}

/*
==========================================
Empty Search Template
==========================================
*/

function noProductsTemplate() {

    return `

    <div class="no-results">

        <h2>

            No Products Found

        </h2>

        <p>

            Try changing your search or filters.

        </p>

    </div>

    `;

}