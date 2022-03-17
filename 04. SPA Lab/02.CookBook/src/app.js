import {router} from './utilities/router.js';


let nav = document.querySelector('header nav');

router['/']();

nav.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.tagName == 'A'){

        let activeA = e.currentTarget.querySelector('.active');
        activeA.classList.remove('active');

        e.target.classList.add('active');

        let url = new URL(e.target.href);
        
        router[url.pathname]();
    }
});







