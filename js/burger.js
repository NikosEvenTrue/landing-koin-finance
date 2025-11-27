document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.header__burger-button');
    const menu = document.querySelector('.header__menu');
    const closeButton = document.querySelector('.header__menu-close-button');
    const body = document.body;


    const toggleMenu = () => {
        const isOpened = burgerButton.getAttribute('aria-expanded') === 'true';
            
        burgerButton.setAttribute('aria-expanded', !isOpened);
        menu.classList.toggle('header__menu--is-open');
        body.classList.toggle('body--menu-open');
    }

    if (burgerButton && menu) {
        burgerButton.addEventListener('click', toggleMenu);
    }

    if (closeButton && menu) {
        closeButton.addEventListener('click', toggleMenu);
    }
});

