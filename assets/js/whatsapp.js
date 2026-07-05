export function initWhatsapp(){

    document.addEventListener(

        "click",

        event=>{

            if(

                !event.target.classList.contains(

                    "whatsapp-btn"

                )

            ) return;

            const name=

            event.target.dataset.name;

            const url=

`https://wa.me/91XXXXXXXXXX?text=Hi%20Ashish%20Gems,%20I%20am%20interested%20in%20${encodeURIComponent(name)}`;

            window.open(

                url,

                "_blank"

            );

        }

    );

}