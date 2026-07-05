// export function initSearch({ products, onSearch }) {

//     const input =
//         document.getElementById("searchInput");

//     if (!input) return;

//     let timeout;

//     input.addEventListener("input", (event) => {

//         clearTimeout(timeout);

//         timeout = setTimeout(() => {

//             const keyword =
//                 event.target.value
//                     .trim()
//                     .toLowerCase();

//             if (!keyword) {

//                 onSearch(products);

//                 return;

//             }

//             const results = products.filter(product => {

//                 return (

//                     product.name
//                         .toLowerCase()
//                         .includes(keyword)

//                     ||

//                     product.category
//                         .toLowerCase()
//                         .includes(keyword)

//                     ||

//                     product.sku
//                         .toLowerCase()
//                         .includes(keyword)

//                     ||

//                     product.purity
//                         .toLowerCase()
//                         .includes(keyword)

//                     ||

//                     String(product.weight)
//                         .includes(keyword)

//                 );

//             });

//             onSearch(results);

//         }, 200);

//     });

// }

import { setSearch } from "./store.js";

export function initSearch(){

    const input=document.getElementById("searchInput");

    input.addEventListener("input",e=>{

        setSearch(e.target.value.trim());

    });

}