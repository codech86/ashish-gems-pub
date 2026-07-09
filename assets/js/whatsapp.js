import { getProduct } from "./store.js";

export function initWhatsapp(){

    document.addEventListener("click",event=>{

        const button=

        event.target.closest(".whatsapp-modal");

        if(!button) return;

        const product=

        getProduct(button.dataset.id);

        const message=

`Hello Ashish Gems,

I am interested in

${product.name}

SKU : ${product.sku}

Weight : ${product.weight} gm

Please share more details.`;

        window.open(

`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`,

"_blank"

        );

    });

}