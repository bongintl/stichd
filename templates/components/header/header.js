[ ...document.querySelectorAll('.header, .header-compact') ].forEach( header => {
    [ ...document.querySelectorAll( '[data-toggle-menu]' ) ].forEach( el => {
        el.addEventListener( 'click', () => {
            header.classList.toggle('bg-dark');
            header.classList.toggle('header--menu-open');
        })
    });
});