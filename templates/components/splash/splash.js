import debounce from 'lodash/debounce'

[ ...document.querySelectorAll('.splash') ].forEach( el => {
    var onScroll = debounce( () => {
        el.classList.add('splash--off');
        el.removeEventListener( 'scroll', onScroll );
        setTimeout( () => el.parentNode.removeChild( el ), 500 );
    }, 20 )
    el.addEventListener('scroll', onScroll )
    // // document.body.style.overflow = 'hidden';
    // var onScroll = () => {
    //     
    //     window.removeEventListener( 'scroll', onScroll );
    //     setTimeout(() => {
            
    //     }, 500 )
    // }
    // window.addEventListener( 'scroll', onScroll )
})