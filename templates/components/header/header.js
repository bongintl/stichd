[ ...document.querySelectorAll('.header') ].forEach( header => {
    [ ...document.querySelectorAll( '[data-toggle-menu]' ) ].forEach( el => {
        el.addEventListener( 'click', () => {
            header.classList.toggle('bg-dark');
        })
    });
});