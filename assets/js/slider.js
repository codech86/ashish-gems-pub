const hero=document.querySelector('.hero');

const slides=[

'images/hero/banner1.png',

'images/hero/banner2.jpg',

'images/hero/banner3.jpg'

];

let current=0;

export function initSlider(){

    if(!hero) return;

    setInterval(()=>{

        current=(current+1)%slides.length;

        hero.style.background=

`linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url(${slides[current]}) center/cover`;

    },6000);

}