import { getProduct } from "./store.js";

const modal =
    document.getElementById("productModal");

const modalBody =
    document.getElementById("modalBody");

const closeButton =
    document.getElementById("closeModal");

export function initModal(){

    document.addEventListener("click",event=>{

        const button=
            event.target.closest(".details-btn");

        if(!button) return;

        const product=
            getProduct(button.dataset.id);

        if(product){

            openModal(product);

        }

    });

    closeButton.addEventListener(

        "click",

        closeModal

    );

    modal.addEventListener("click",event=>{

        if(event.target===modal){

            closeModal();

        }

    });

    document.addEventListener("keydown",event=>{

        if(event.key==="Escape"){

            closeModal();

        }

    });

}

function openModal(product){

    modalBody.innerHTML=createModal(product);

    modal.classList.add("show");

}

function closeModal(){

    modal.classList.remove("show");

}

function createModal(product){

    const image=

        product.images?.[0]

        ||

        product.image

        ||

        "images/placeholders/product-placeholder.svg";

    return `

<div class="modal-layout">

<div class="modal-image">

<img

src="${image}"

alt="${product.name}"

loading="lazy">

</div>

<div class="modal-details">

<h2>

${product.name}

</h2>

<div class="modal-specs">

<p><strong>SKU:</strong> ${product.sku}</p>

<p><strong>Category:</strong> ${product.category}</p>

<p><strong>Purity:</strong> ${product.purity}</p>

<p><strong>Weight:</strong> ${product.weight} gm</p>

<p><strong>Status:</strong>

${product.availability}

</p>

</div>

<p class="modal-description">

${product.description || ""}

</p>

<button

class="btn btn-primary whatsapp-modal"

data-id="${product.id}">

Enquire on WhatsApp

</button>

</div>

</div>

`;

}