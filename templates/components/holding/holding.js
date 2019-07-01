var video = document.getElementById('video');
console.log(video);

[ ...document.querySelectorAll('.holding') ].forEach( holding => {
  [ ...document.querySelectorAll('.play-button') ].forEach( play_button => {
    play_button.addEventListener( 'click', () => {
      holding.classList.add('holding--hide-intro')
      if (video) {
        video.play();
      }
     })
  })
})