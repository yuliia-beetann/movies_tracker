'use strict';

const API_KEY = '29bb47b7552ec502eb87cebfbc77f766';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

// $(document).ready(function() {

  //EVENTS
  $('.search__btn').click(() => {
    getMovie()
  })

  $('.search__field').keypress((e) => {
    if (e.keyCode === 13) {
      getMovie()
    }
  })

  $('.reviews__close').click(()=>{
    removeReviews()
  })

  $('.window').mouseup(function (e){ 
    let div = $('.reviews')
    if (!div.is(e.target) 
        && div.has(e.target).length === 0) { 
          removeReviews()
    }
  })

  //FUNCTIONS
  async function getMovie() {
    let query = $('.search__field').val()

    $('body').addClass('loading')

    if (query !== '') {

      $('.movie').remove()

      let url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`

      //----- Второй способ

      try {
        let response = await fetch(url)
        let res = await response.json()
        console.log(res)
  
        if (res.results.length === 0) {
          alert('No movies found')
        } else {
          res.results.forEach((movie) => {
            if (movie.poster_path !== null)
            $('.movies').append(drawMovie(movie))
            let $movie = $('.movies').find(`.${movie.id}`)
            $movie.click(()=>getReviews(movie.id))
          })
        }
        $('body').removeClass('loading')
      } catch(e) {
        alert('Error!')
      }

      //----- Первый способ
      // fetch(url).then(data => data.json()
      //   .then(res => {
      //     if (res.results.length === 0) {
      //       alert('No movies found')
      //     } else {
      //       res.results.forEach((movie) => {
      //         if (movie.poster_path !== null)
      //         $('.movies').append(drawMovie(movie))
      //         let $movie = $('.movies').find(`.${movie.id}`)
      //         $movie.click(()=>getReviews(movie.id))
      //       })
      //     }
      //     $('body').removeClass('loading')
      // }))
    }
  }


  function drawMovie(movie) {
    let movieDOM = `<div class="movie ${movie.id}">
                      <img class="movie__poster" src="${IMG_URL + movie.poster_path}" alt="">
                      <h2 class="movie__title">${movie.title}</h2>
                      <div class="movie__info">
                        <h3><b>Release date: </b>${movie.release_date}</h3>
                        <h3><b>Rating: </b>${movie.vote_average}</h3>
                        <p>${movie.overview}</p>
                      </div>
                    </div>`
    return movieDOM
  }

  async function getReviews(id) {

    let url = `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`

    try {
      let response = await fetch(url)
      let res = await response.json()
      console.log(res)

      if (res.results.length === 0) {
        alert('No review found')
      } else { 
        res.results.find(() => {
        console.log(res.results)
        res.results.forEach(() => {
        $('.window').addClass('hide--off')
        $('.reviews__author').text(res.results[0].author)
        $('.reviews__content').text(res.results[0].content)
        })
      })
    } 
  }
    catch(e) {
      alert('Error!')
    }
  }

  // function getReviews(id) {
    
  //   $.ajax({
  //     url: `${API_URL}/movie/${id}/reviews`, // дописать после ид /review or /reviews
  //     type: 'GET',
  //     dataType: 'json',
  //     data: {
  //       api_key: API_KEY
  //     }
  //   }).then((res) => {
  //     if (res.results.length === 0) {
  //         alert('No review is found')
  //       } else { res.results.find(() => {
  //         console.log(res.results)
  //         res.results.forEach(() => {
  //         $('.window').addClass('hide--off')
  //         $('.reviews__author').text(res.results[0].author)
  //         $('.reviews__content').text(res.results[0].content)
  //         $('reviews__close').click(() => {
  //           $('.window').removeClass('hide--off')
  //           // $(this).parent('.window').removeClass('hide--off')
  //         })
  //       })
  //       })
  //       }
  //     })
  // }

  function removeReviews() {
    console.log('test')
    $('.window').removeClass('hide--off')
  }




// })
    
