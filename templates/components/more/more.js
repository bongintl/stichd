var parser = new DOMParser();
var sleep = delay => new Promise( resolve => setTimeout( resolve, delay ) );

[ ...document.querySelectorAll('.more') ].forEach( el => {
    var items = el.querySelector('.more__items');
    var next = el.querySelector('.more__next');
    if ( !next ) return;
    var loading = false;
    next.addEventListener( 'click', e => {
        e.preventDefault();
        if ( loading ) return;
        loading = true;
        next.classList.add( 'more__next--loading' );
        fetch( next.href )
            .then( r => r.text() )
            .then( html => parser.parseFromString( html, 'text/html' ) )
            .then( doc => {
                next.classList.remove( 'more__next--loading' );
                loading = false;
                var nextLink = doc.querySelector( '.more__next' );
                if ( nextLink ) {
                    next.href = nextLink.href;
                } else {
                    next.classList.add( 'more__next--disabled' );
                }
                var nextItems = [ ...doc.querySelectorAll( '.more__items > *' ) ]
                var heightBefore = items.clientHeight;
                nextItems.forEach( item => {
                    items.appendChild( item )
                })
                var heightAfter = items.clientHeight;
                items.style.height = heightBefore + 'px';
                sleep( 10 ).then( () => {
                    items.style.height = heightAfter + 'px';
                    return sleep( 1000 );
                }).then( () => {
                    items.style.height = '';
                })
            })
    })
})