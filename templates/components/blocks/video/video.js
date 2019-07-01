import Player from '@vimeo/player';

[ ...document.querySelectorAll('.video') ].forEach( video => {
  
  var youtube__iframe = video.querySelector('.youtube__iframe');
  var vimeo_iframe = video.querySelector('.vimeo__iframe');
  if (vimeo_iframe) {
    var vimeo_player = new Player(vimeo_iframe);
  }
  
  video.querySelectorAll( '.play' ).forEach( el => {
    el.addEventListener( 'click', () => {
        video.classList.toggle('video--playing')
        if (vimeo_player) {
          vimeo_player.play()
        }
        if (youtube__iframe) {
          youtube__iframe.src += "&autoplay=1";
        }
    })
  })
})