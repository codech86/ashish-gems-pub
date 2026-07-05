export function initAnimations(){

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add('show');

            }

        });

    },{

        threshold:.15

    });

    document.querySelectorAll(

        '.section,.collection-card,.feature-card,.review-card'

    ).forEach(el=>{

        el.classList.add('fade-up');

        observer.observe(el);

    });

}