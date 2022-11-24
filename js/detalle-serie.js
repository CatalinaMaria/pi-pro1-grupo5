let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
let urlPlataformas = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`


/*DOM*/
// let sectionDetPeliculas = document.querySelector('.sectionDetPeliculas')//
let icono = document.querySelector('.articleIcono') // agarra el corazon 
let sectionDetSeries = document.querySelector('.sectionDetSeries')
let plataformas = document.querySelector('#plataformas')

//contenido//
fetch(url)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data);
          let titulo = document.querySelector('.tituloSeries')
          let estreno = document.querySelector('.fecha')
          let sinopsisSerie = document.querySelector('.descripcionSerie')
          let duracion = document.querySelector('.duracion')
          let rating = document.querySelector('.rating')
          let generos = document.querySelector('.generoSerie')
          let poster = document.querySelector('.poster')
          let generosNombres = ''

          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          titulo.innerText = data.name
          estreno.innerText = data.first_air_date
          sinopsisSerie.innerText = data.overview
          duracion.innerText = data.episode_run_time
          rating.innerText = data.vote_average
          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          for (i=0; i<data.genres.length; i++){
               generosNombres += data.genres[i].name + " "  
          }
          generos.innerHTML += 
         `<a href="./detalle-genero.html?id=${id}"> Generos: ${generosNombres}</a>
`
     }) 
     .catch(function (errores) {
          console.log(errores);
        });


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
//favoritos//
let seriesFav = [];
let recuperoStorage = localStorage.getItem("seriesFav");
if (recuperoStorage != null) {
     seriesFav = JSON.parse(recuperoStorage);
}

if (seriesFav.includes(id)) {
     icono.innerText = "Quitar de favoritos";
}


icono.addEventListener("click", function (e) {
     e.preventDefault();

     if (seriesFav.includes(id)) { // si esta en el array
          let indice = seriesFav.indexOf(id); //busca la posicion
          seriesFav.splice(indice, 1) //lo borra
          icono.innerText = "Agregar a favoritos"

     } else { //si no esta en el array
          seriesFav.push(id) //agregamos al array
          icono.innerText = "Quitar de favoritos"

     }

     let favToString = JSON.stringify(seriesFav);
     localStorage.setItem("seriesFav", favToString)

})

//plataforma
fetch(urlPlataformas)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data);
          let datosProvedor = data.results.US.buy
          let contenidoPlataformas = ''
          for(i=0; i< 5;i++){
          contenidoPlataformas +=`
          <img src="https://image.tmdb.org/t/p/w500/${datosProvedor[i].logo_path}"
          <p>${datosProvedor[i].provider_name}</p>
          `
          plataformas.innerHTML = contenidoPlataformas

     }})
     .catch(function (errores) {
          console.log(errores);
     });

//trailer//
let url2 = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
let queryString = location.search; //cadena de texto
console.log(queryString);
let queryStringObj = new URLSearchParams(queryString); //convierte en objeto
let variableId = queryStringObj.get("id");
let listaTrailers = document.querySelector('.trailerSeries')

fetch(url2)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data)
          let resultado = data.results
          let contenidoTrailerSeries= "";
          if (resultado == null || resultado.length == 0 || resultado == undefined) {
               contenidoTrailerSeries= "La serie no tiene trailer"
               listaTrailers= contenidoTrailerSeries
           } else {
               for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].type =="Trailer"){
                         contenidoTrailerSeries= `<h2>Trailer</h2>
                            <iframe width=100% height="315" src="https://www.youtube.com/embed/${resultado[i].key}"
                            title="Youtube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope: picture-in-picture"
                            allowfullscreen></iframe>`}
                            


                    
               }}
          if (contenidoTrailerSeries==""){
               contenidoTrailerSeries= `<h2>La serie no tiene trailer</h2>`} 
     listaTrailers.innerHTML=contenidoTrailerSeries
     return data
          } )
     .catch(function (errores) {
          console.log(errores);
     })


 //reviews//
 let urlReviews = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
 let reviews = document.querySelector('.reviewsSerie')

 fetch(urlReviews)
     .then(function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data)
          reviewsUsuarios = ''
          for (i = 0; i <1; i++){
               reviewsUsuarios += `
               <h2> Autor: ${data.results[i].author}</h2>
                                        <h3> Comentario: ${data.results[i].content}</h3>
               `
          }
               reviews.innerHTML = reviewsUsuarios;
     })
     .catch(function(errores){
          console.log(errores);
     })

