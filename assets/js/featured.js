export async function initFeaturedProducts(){

    const grid=document.getElementById(

        "featuredProducts"

    );

    if(!grid) return;

    const response=

        await fetch("data/products.json");

    const products=

        await response.json();

    const featured=

        products

        .filter(

            product=>product.featured

        )

        .slice(0,4);

    grid.innerHTML=

        featured

        .map(createFeaturedCard)

        .join("");

}

function createFeaturedCard(product){

    return `

    <article class="product-card">

        <div class="product-image">

            <img

            src="${product.images[0]}"

            loading="lazy">

        </div>

        <div class="product-body">

            <h3>

            ${product.name}

            </h3>

            <p>

            ${product.weight} gm

            </p>

            <a

            href="products.html"

            class="btn btn-outline">

            View

            </a>

        </div>

    </article>

    `;

}