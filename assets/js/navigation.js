export function initNavigation(){

    const menu=document.querySelector('.nav-menu');

    const button=document.querySelector('.mobile-menu-btn');

    button.addEventListener('click',()=>{

        menu.classList.toggle('active');

    });

    document.querySelectorAll('.nav-menu a').forEach(link=>{

        link.addEventListener('click',()=>{

            menu.classList.remove('active');

        });

    });

}