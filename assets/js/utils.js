/*
==========================================
Ashish Gems Utility Functions
==========================================
*/

export function preloadImages(images = []) {

    images.forEach(src => {

        const img = new Image();

        img.src = src;

    });

}

export function debounce(fn, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delay);

    };

}

export function imageFallback(image) {

    image.onerror = null;

    image.src = "images/placeholders/product-placeholder.svg";

}

export function smoothScroll(target) {

    document.querySelector(target)?.scrollIntoView({

        behavior: "smooth"

    });

}