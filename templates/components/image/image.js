import createObserver from '~/utils/observer';
import 'intersection-observer';
import ResizeObserver from 'resize-observer-polyfill';
// import debounce from 'debounce';

var resizeObserver = createObserver( ResizeObserver );
var intersectionObserver = createObserver( IntersectionObserver, { rootMargin: '100% 0% 100% 0%' } );

[ ...document.querySelectorAll('img[data-srcset]') ].forEach( img => {
    var update = width => img.setAttribute( 'sizes', width + 'px' );
    var onResize = entry => update( entry.contentRect.width )
    var onIntersect = entry => {
        if ( entry.isIntersecting ) {
            update( img.getBoundingClientRect().width );
            img.srcset = img.dataset.srcset;
            resizeObserver.observe( img, onResize )
        } else {
            resizeObserver.unobserve( img, onResize )
        }
    }
    intersectionObserver.observe( img, onIntersect );
})

// [ ...document.querySelectorAll('img[data-srcset]') ].forEach( img => {
//     var update = width => img.setAttribute( 'sizes', width + 'px' );
//     update( img.getBoundingClientRect().width );
//     var onSizeChange = debounce( entry => update( entry.contentRect.width ), 100 );
//     observe( img, onSizeChange );
//     // return () => unobserve( img, onSizeChange );
// })