export function initModal(products){

    document.addEventListener(

        "click",

        event=>{

            if(

                event.target.classList.contains(

                    "details-btn"

                )

            ){

                openModal(event.target.dataset.id);

            }

        }

    );

    document

    .getElementById("closeModal")

    .addEventListener(

        "click",

        closeModal

    );

}

function openModal(id){

    document

    .getElementById(

        "productModal"

    )

    .classList.add("show");

    document

    .getElementById(

        "modalBody"

    )

    .innerHTML=

    `<h2>

        Product #${id}

    </h2>`;

}

function closeModal(){

    document

    .getElementById(

        "productModal"

    )

    .classList.remove("show");

}