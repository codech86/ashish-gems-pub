/*
=========================================
Ashish Gems
Product Card Renderer
=========================================
*/

export function createProductCard(product) {

    const image = product.images?.[0] || product.image || "images/placeholders/product-placeholder.svg";

    return `
        <article class="product-card fade-up">

            ${product.featured ? `
            <span class="product-badge featured">
                Featured
            </span>
            ` : ""}

            <div class="product-image">

                <img
                    src="${image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='images/placeholders/product-placeholder.svg'">

            </div>

            <div class="product-body">

                <div class="product-category">

                    ${product.category}

                </div>

                <h3>

                    ${product.name}

                </h3>

                <div class="product-meta">

                    <span>SKU : ${product.sku}</span>

                    <span>${product.weight} gm</span>

                </div>

                <div class="product-purity">

                    Purity : ${product.purity}

                </div>

                <div class="availability ${product.availability === 'In Stock'
                    ? 'available'
                    : 'unavailable'}">

                    ${product.availability}

                </div>

                <div class="product-buttons">

                    <button
                        class="btn btn-outline details-btn"
                        data-id="${product.id}">

                        View Details

                    </button>

                    <button
                        class="btn btn-primary whatsapp-btn"
                        data-name="${product.name}">

                        Enquire

                    </button>

                </div>

            </div>

        </article>
    `;

}