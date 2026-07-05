export function initActiveNav(){

    const page=

    location.pathname

    .split("/")

    .pop();

    document

    .querySelectorAll(

        ".nav-menu a"

    )

    .forEach(link=>{

        if(

            link.getAttribute("href")

            ===page

        ){

            link.classList.add(

                "active"

            );

        }

    });

}