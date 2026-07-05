import { preloadImages } from './utils.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animation.js';
import { initSlider } from './slider.js';
import { initFeaturedProducts } from "./featured.js";

document.addEventListener('DOMContentLoaded', () => {

    initNavigation();

    initAnimations();

    initSlider();

    initBackToTop();

    preloadImages([
        'images/hero/banner1.jpg',
        'images/hero/banner2.jpg',
        'images/hero/banner3.jpg'
    ]);
    initFeaturedProducts();

});

/* ============================= */

function initBackToTop(){

    const button=document.getElementById('backToTop');

    window.addEventListener('scroll',()=>{

        if(window.scrollY>300){

            button.style.display='block';

        }

        else{

            button.style.display='none';

        }

    });

    button.addEventListener('click',()=>{

        window.scrollTo({

            top:0,

            behavior:'smooth'

        });

    });

}