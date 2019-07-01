import Masonry from 'masonry-layout';

[ ...document.querySelectorAll( '.data-grid' ) ].forEach( el => {
    new Masonry( el, { transitionDuration: 0 } )
    var percentages = [ ...el.querySelectorAll('.data-grid__item-percentage') ];
    var setVisible = visible => percentages.forEach( ( p, i ) => (
        p.classList.toggle( 'data-grid__item-percentage--visible', i === visible
    )));
    percentages.forEach( ( p, i ) => {
        p.addEventListener('touchstart', () => setVisible( i ) );
        p.addEventListener('mouseenter', () => setVisible( i ) );
        p.addEventListener('mouseleave', () => setVisible( null ) );
    })
})