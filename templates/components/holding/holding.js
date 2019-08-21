[ ...document.querySelectorAll('.holding') ].forEach( holding => {
  var video = holding.querySelector( 'video' );
  var playButton = holding.querySelector('.holding__play-button');
  var enterButton = holding.querySelector('.holding__enter-button');
  var play = () => {
    holding.classList.add('holding--hide-intro')
    video.play();
  }
  var enter = () => {
    playButton.removeEventListener( 'click', play );
    enterButton.removeEventListener( 'click', enter );
    holding.parentNode.removeChild( holding );
  }
  playButton.addEventListener( 'click', play );
  enterButton.addEventListener( 'click', enter );
})