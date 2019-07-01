[ ...document.querySelectorAll('.overflow') ].forEach( overflow => {
    overflow.querySelectorAll( '.overflow__item--right' ).forEach( el => {
        el.addEventListener( 'mouseover', () => {
            overflow.classList.add('overflow--focus-right');
        })
        el.addEventListener( 'mouseout', () => {
            overflow.classList.remove('overflow--focus-right');
        })
    });
});
