[ ...document.querySelectorAll('.overflow') ].forEach( overflow => {
    [ ...overflow.querySelectorAll( '.overflow__item--right' ) ].forEach( el => {
        el.addEventListener( 'mouseenter', () => {
            overflow.classList.add('overflow--focus-right');
        })
        el.addEventListener( 'mouseleave', () => {
            overflow.classList.remove('overflow--focus-right');
        })
    });
});
