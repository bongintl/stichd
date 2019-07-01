[ ...document.querySelectorAll('.search') ].forEach( container => {
    var input = container.querySelector( 'input' );
    var visible = container.classList.contains( 'search--visible' );
    if ( visible ) input.select();
    var toggle = () => {
        visible = !visible;
        container.classList.toggle( 'search--visible', visible );
        if ( visible ) input.select();
    }
    [ ...document.querySelectorAll('[data-toggle-search]') ].forEach( el => {
        el.addEventListener( 'click', e => {
            e.stopPropagation();
            toggle();
        })
    });
})