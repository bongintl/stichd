[ ...document.querySelectorAll('.menu') ].forEach( menu => {
    [ ...document.querySelectorAll( '[data-toggle-menu]' ) ].forEach( el => {
        el.addEventListener( 'click', () => {
            menu.classList.toggle('menu--open');
        })
    });
});

