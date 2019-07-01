[ ...document.querySelectorAll('.news') ].forEach( el => {
    el.querySelectorAll('.news__toggle').forEach( toggle => {
        toggle.addEventListener( 'click', () => {
            el.classList.toggle('news--complex')
            document.body.classList.toggle('bg-dark')
        })
    })
})