import createObserver from '~/utils/observer';
import 'intersection-observer';

var lerp = ( a, b, t ) => a + ( b - a ) * t;

[ ...document.querySelectorAll('.magnifier') ].forEach( el => {
    var curr = [ 0, 0 ];
    var target = [ 0, 0 ];
    el.addEventListener( 'mousemove', e => {
        target[ 0 ] = e.offsetX;
        target[ 1 ] = e.offsetY;
    })
    var tick = () => {
        el.style.setProperty( '--cx', curr[ 0 ] + 'px' );
        el.style.setProperty( '--cy', curr[ 1 ] + 'px' );
        curr[ 0 ] = lerp( curr[ 0 ], target[ 0 ], .1 );
        curr[ 1 ] = lerp( curr[ 1 ], target[ 1 ], .1 );
        requestAnimationFrame( tick );
    }
    tick();
})