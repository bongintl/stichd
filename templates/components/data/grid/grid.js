import Masonry from 'masonry-layout';

[ ...document.querySelectorAll( '.data-grid' ) ].forEach( el => new Masonry( el ) )