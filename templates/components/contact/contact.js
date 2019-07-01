var wait = delay => new Promise( resolve => setTimeout( resolve, delay ) );

[ ...document.querySelectorAll('.contact') ].forEach( el => {
    var toggle = el.querySelector('.contact__toggle');
    if ( !toggle ) return;
    var is1Col = el.classList.contains('contact--1col');
    var extras = [ ...el.querySelectorAll('.contact__extra') ];
    var expanded = false;
    var show = () => {
        var heightBefore = el.clientHeight;
        extras.forEach( el => el.style.display = 'block' );
        var heightAfter = el.clientHeight;
        el.style.height = heightBefore + 'px';
        return wait( 0 ).then(() => {
            extras.forEach( el => el.style.opacity = 1 );
            if ( is1Col ) el.classList.add( 'bg-dark' );
            el.style.height = heightAfter + 'px';
            return wait( 200 );
        }).then(() => {
            el.style.height = '';
        })
    }
    var hide = () => {
        var heightBefore = el.clientHeight;
        extras.forEach( el => el.style.display = 'none' );
        var heightAfter = el.clientHeight;
        extras.forEach( el => el.style.display = 'block' );
        el.style.height = heightBefore + 'px';
        return wait( 0 ).then(() => {
            extras.forEach( el => el.style.opacity = 0 );
            if ( is1Col ) el.classList.remove( 'bg-dark' );
            el.style.height = heightAfter + 'px';
            return wait( 200 );
        }).then( () => {
            extras.forEach( el => el.style.display = 'none' );
            el.style.height = '';
        })
    }
    toggle.addEventListener( 'click', () => {
        if ( expanded ) {
            hide();
            expanded = false;
        } else {
            show();
            expanded = true;
        }
    })
})