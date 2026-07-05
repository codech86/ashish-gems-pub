import { loadMore } from "./store.js";

export function initPagination(){

    const button=document.getElementById(

        "loadMoreBtn"

    );

    if(!button) return;

    button.addEventListener(

        "click",

        ()=>{

            loadMore();

        }

    );

}

export function updateLoadMore(show){

    document.getElementById(

        "loadMoreBtn"

    ).style.display=

        show

        ? "inline-flex"

        : "none";

}