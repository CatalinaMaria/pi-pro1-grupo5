
let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let api= `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`
let peliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
let seriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
let topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`

let seccionPeliculasPopulares = document.querySelector("#peliculasPopu")
let seccionSeriesPopulares = document.querySelector("#seriesPopu")
let seccionTopRated = document.querySelector("#topRated")
// Fetch para pelis populares

fetch(peliculasPopulares)
   .then(function(response){
          console.log(response)
          return response.json();
   })
   .then(function(data){
     console.log(data.results)
     peliculas = data.results
     contenidoPeliculas =''
     for (let i = 0; i<5; i++){
          contenidoPeliculas +=
          ` <article >
          <a href="./detalle-pelicula.html?id=${peliculas[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path}"
          alt=" foto poster ${peliculas[i].title}"> </a>
          <p class="nombrePeli">${peliculas[i].title}</p>
          <p>  Fecha de estreno: ${peliculas[i].release_date} </p>
          <a href="./detalle-pelicula.html?id=${peliculas[i].id}">
              <button type="" class="verMas">Ver mas</button>
          </a>
      </article>`
     }
     seccionPeliculasPopulares.innerHTML = contenidoPeliculas
     return data;

    })
   .catch(function(error){
        return error;
    })
// section series popu
fetch(seriesPopulares)
   .then(function(response){
          console.log(response)
          return response.json();
   })
   .then(function(data){
     console.log(data.results)
     series = data.results
     contenidoSeries =''
     for (let i = 0; i<5; i++){
          contenidoSeries +=
          ` <article >
          <a href="./detalle-serie.html?id=${series[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${series[i].poster_path}"
          alt=" foto poster ${series[i].name}"> </a>
          <p class="nombreSerie">${series[i].name}</p>
          <p>  Fecha de estreno: ${series[i].first_air_date} </p>
          <a href="./detalle-serie.html?id=${series[i].id}">
          <button type="" class="verMas">Ver mas</button>
      </a>
  </article>`
     }
     seccionSeriesPopulares.innerHTML = contenidoSeries
     return data;

    })
   .catch(function(error){
        return error;
    })

// seccion peliculas top rated
fetch(topRated)
   .then(function(response){
          console.log(response)
          return response.json();
   })
   .then(function(data){
     console.log(data.results)
     toprated = data.results
     contenidoTopRated =''
     for (let i = 0; i<5; i++){
          contenidoTopRated +=
          ` <article >
          <a href="./detalle-pelicula.html?id=${peliculas[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${peliculas[i].poster_path}"
          alt=" foto poster ${peliculas[i].title}"> </a>
          <p class="nombrePeli">${peliculas[i].title}</p>
          <p>  Fecha de estreno: ${peliculas[i].release_date} </p>
          <p>  Votos: ${peliculas[i].vote_average} </p>
          <a href="./detalle-pelicula.html?id=${peliculas[i].id}">
              <button type="" class="verMas">Ver mas</button>
          </a>
      </article>`
     }
     seccionTopRated.innerHTML = contenidoTopRated
     return data;

    })
   .catch(function(error){
        return error;
    })


    // formulario de busqueda
  
let form = document.querySelector('form')
let campoBusqueda = document.querySelector('[name=busqueda]')

form.addEventListener('submit', function(e){
     e.preventDefault();

     console.log(campoBusqueda.value);

     if(campoBusqueda.value == ''){
          alert('Debe ingresar alguna palabra');
     } else if (campoBusqueda.value.length <= 3){
          alert('Ingresar mas de 3 caracteres');
     } else{
          this.submit();
     }
})


