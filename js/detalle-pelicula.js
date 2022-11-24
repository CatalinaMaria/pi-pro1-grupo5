let apiKey = "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
let urlReviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
let urlPlataformas = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
/* DOM */
let sectionDetPeliculas = document.querySelector('.sectionDetPeliculas')
let form = document.querySelector('form')
let campoBusqueda = document.querySelector('[name=busqueda]')
let icono = document.querySelector('.articleIcono') // agarra el corazon 
let reviews = document.querySelector('.reviewsPelicula')
let plataformas = document.querySelector('#plataformas')


fetch(url)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data);
          let titulo = document.querySelector('.tituloPelicula')
          let estreno = document.querySelector('.fecha')
          let sinopsisPelicula = document.querySelector('.descripcionPelicula')
          let duracion = document.querySelector('.duracion')
          let rating = document.querySelector('.rating')
          let generos = document.querySelector('.generoPelicula')
          let poster = document.querySelector('.poster')
          let generosNombres = ''
          

//propiedad innertext, innerhtml source//
          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          titulo.innerText = data.original_title
          estreno.innerText = data.release_date
          sinopsisPelicula.innerText = data.overview
          duracion.innerText = data.runtime
          rating.innerText = data.vote_average
          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          for (i = 0; i < data.genres.length; i++) {
               generosNombres += data.genres[i].name + " "
          }
          generos.innerHTML +=
               `<a href="./detalle-genero.html?id=${id}"> Generos: ${generosNombres}</a>
`
     })
     .catch(function (errores) {
          console.log(errores);
     });
//plataformas//

fetch(urlPlataformas)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data);
          let datosProvedor = data.results.US.buy
          let contenidoPlataformas = ''
          for(i=0; i<datosProvedor.length;i++){
          contenidoPlataformas +=`
          <img src="https://image.tmdb.org/t/p/w500/${datosProvedor[i].logo_path}"
          <p>${datosProvedor[i].provider_name}</p>
          `
          plataformas.innerHTML = contenidoPlataformas

     }})
     .catch(function (errores) {
          console.log(errores);
     });




//reviews//
fetch(urlReviews)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data);

          reviewsUsuarios = ''
          for (i = 0; i < 3; i++) {
               reviewsUsuarios += `<h2> Autor: ${data.results[i].author}</h2>
                                        <h3> Comentario: ${data.results[i].content}</h3>`
          }

          reviews.innerHTML = reviewsUsuarios;

     })
     .catch(function (errores) {
          console.log(errores);
     });

//buscador//ls
form.addEventListener('submit', function (e) {
     e.preventDefault();

     console.log(campoBusqueda.value);

     if (campoBusqueda.value == '') {
          alert('Debe ingresar alguna palabra');
     } else if (campoBusqueda.value.length <= 3) {
          alert('Ingresar mas de 3 caracteres');
     } else {
          this.submit();
     }
})


//creo un condicional para ver su hay algo gurdado en el local o si esta vacio
let peliculasFav = [];
let recuperoStorage = localStorage.getItem("peliculasFav");
if (recuperoStorage != null) {
     peliculasFav = JSON.parse(recuperoStorage);
}

if (peliculasFav.includes(id)) {
     icono.innerText = "Quitar de favoritos";
}


icono.addEventListener("click", function (e) {
     e.preventDefault();

     if (peliculasFav.includes(id)) { 
          let indice = peliculasFav.indexOf(id); 
          peliculasFav.splice(indice,1)
          icono.innerText = "Agregar a favoritos"

     } else { 
          peliculasFav.push(id) 
          icono.innerText = "Quitar de favoritos"

     }

     let favToString = JSON.stringify(peliculasFav);
     localStorage.setItem("peliculasFav", favToString)

})

// Trailer

let url2 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
let queryString = location.search; //cadena de texto
console.log(queryString);
let queryStringObj = new URLSearchParams(queryString); //convierte en objeto
let variableId = queryStringObj.get("id");
let listaTrailers = document.querySelector('.trailer')


fetch(url2)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data)
          let resultado = data.results
          let contenidoTrailer= "";
          if (resultado == null || resultado.length == 0 || resultado == undefined) {
               contenidoTrailer= "La pelicula no tiene trailer"
               listaTrailers= contenidoTrailer
           } else {
               for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].type =="Trailer"){
                         contenidoTrailer= `<h2>Trailer</h2>
                            <iframe width=100% height="315" src="https://www.youtube.com/embed/${resultado[i].key}"
                            title="Youtube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope: picture-in-picture"
                            allowfullscreen></iframe>`}
                            


                    
               }}
          if (contenidoTrailer==""){
               contenidoTrailer= `<h2>La pelicula no tiene trailer</h2>`} 
     listaTrailers.innerHTML=contenidoTrailer
     return data
          } )
     .catch(function (errores) {
          console.log(errores);
     })

