import { groupBy } from 'ramda';

[ ...document.querySelectorAll('.panels') ].forEach( panels => {
    var pages = panels.querySelector('.panels__pages');
    var [ leftPage, rightPage ] = pages.querySelectorAll( '.panels__page' );
    if ( !rightPage ) return;
    var headers = panels.querySelector('.panels__headers');
    var [ leftHeader, rightHeader ] = headers.querySelectorAll('.panels__header');
    var isRight = false;
    var toggle = e => {
        e.stopPropagation();
        isRight = !isRight;
        
        pages.classList.toggle( 'panels__pages--right', isRight );
        leftPage.classList.toggle( 'panels__page--inactive', isRight );
        rightPage.classList.toggle( 'panels__page--inactive', !isRight );
        
        headers.classList.toggle( 'panels__headers--right', isRight );
        leftHeader.classList.toggle( 'panels__header--inactive', isRight );
        rightHeader.classList.toggle( 'panels__header--inactive', !isRight );
    }
    [ ...document.querySelectorAll( '[data-toggle-panels]' ) ].forEach( el => {
        el.addEventListener( 'click', toggle )
    })
    var setLeft = e => isRight && toggle( e );
    var setRight = e => !isRight && toggle( e );
    leftPage.addEventListener( 'click', setLeft );
    leftHeader.addEventListener( 'click', setLeft );
    rightPage.addEventListener( 'click', setRight );
    rightHeader.addEventListener( 'click', setRight )
    
    var sections = Object.values( groupBy(
        el => el.dataset.panelSectionId,
        [ ...pages.querySelectorAll( '[data-panel-section-id]' ) ]
    ));
    
    var matchHeights = () => sections.forEach( els => {
        els.forEach( el => el.style.height = 'auto' );
        var max = Math.max( ...els.map( el => el.clientHeight ) );
        els.forEach( el => el.style.height = max + 'px' );
    })
    
    matchHeights();
    window.addEventListener( 'resize', matchHeights );
})

