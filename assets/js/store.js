/*
=========================================
Ashish Gems Product Store
=========================================
*/

const state = {

    allProducts: [],

    visibleProducts: [],

    search: "",

    category: "all",

    sort: "default",

    page: 1,

    pageSize: 12

};

const subscribers = [];

export function subscribe(callback){

    subscribers.push(callback);

}

function notify(){

    subscribers.forEach(fn=>fn(getState()));

}

export function getState(){

    return structuredClone(state);

}

export function initialize(products){

    state.allProducts=[...products];

    updateState();

}

export function setSearch(search){

    state.search=search;

    state.page=1;

    updateState();

}

export function setCategory(category){

    state.category=category;

    state.page=1;

    updateState();

}

export function setSort(sort){

    state.sort=sort;

    updateState();

}

export function loadMore(){

    state.page++;

    applyFilters();

}

function updateState(){

    let products=[...state.allProducts];

    /* Search */

    if(state.search){

        const keyword=state.search.toLowerCase();

        products=products.filter(product=>{

            return(

                product.name.toLowerCase().includes(keyword)

                ||

                product.category.toLowerCase().includes(keyword)

                ||

                product.sku.toLowerCase().includes(keyword)

                ||

                product.purity.toLowerCase().includes(keyword)

            );

        });

    }

    /* Category */

    if(state.category!=="all"){

        products=products.filter(product=>

            product.category===state.category

        );

    }

    /* Sorting */

    switch(state.sort){

    case "name":

        products.sort((a,b)=>

            a.name.localeCompare(b.name));

        break;

    case "weight":

        products.sort((a,b)=>

            a.weight-b.weight);

        break;

    case "weight-desc":

        products.sort((a,b)=>

            b.weight-a.weight);

        break;

    case "featured":

        products.sort((a,b)=>

            Number(b.featured)-Number(a.featured));

        break;

    }

    const end=state.page*state.pageSize;

    state.visibleProducts=products.slice(0,end);

    state.totalProducts=products.length;

    state.hasMore=end<products.length;

    syncUrl();

    saveFilters();

    notify();

}

function saveFilters(){

    localStorage.setItem(

        "ashish-gems-filters",

        JSON.stringify({

            search:state.search,

            category:state.category,

            sort:state.sort

        })

    );

}

function syncUrl(){

    const params=new URLSearchParams();

    if(state.search)

        params.set("search",state.search);

    if(state.category!=="all")

        params.set("category",state.category);

    if(state.sort!=="default")

        params.set("sort",state.sort);

    history.replaceState(

        {},

        "",

        "?"

        +params.toString()

    );

}

export function restoreState(){

    const saved=

        JSON.parse(

            localStorage.getItem(

                "ashish-gems-filters"

            )

        );

    if(saved){

        state.search=saved.search||"";

        state.category=saved.category||"all";

        state.sort=saved.sort||"default";

    }

    const params=

        new URLSearchParams(

            window.location.search

        );

    if(params.has("search"))

        state.search=params.get("search");

    if(params.has("category"))

        state.category=params.get("category");

    if(params.has("sort"))

        state.sort=params.get("sort");

}

export function getProduct(id){

    return state.allProducts.find(product=>{

        return product.id===Number(id);

    });

}