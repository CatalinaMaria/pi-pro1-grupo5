let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`

/* DOM */
let sectionDetPeliculas = document.querySelector('.sectionDetPeliculas')
let form = document.querySelector('form')
let campoBusqueda = document.querySelector('[name=busqueda]')
let icono = document.querySelector('.articleIcono') // agarra el corazon 

fetch(url)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data);
          let titulo = document.querySelector('.tituloPelicula')
          let estreno = document.querySelector('.fecha')
          let sinopsisPelicula = document.querySelector('.descripcionPelicula')
          let duracion = document.querySelector('.duracion')
          let rating = document.querySelector('.rating')
          let generos = document.querySelector('.generoPelicula')
          let poster = document.querySelector('.poster')
          let generosNombres = ''

          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          titulo.innerText = data.original_title
          estreno.innerText = data.release_date
          sinopsisPelicula.innerText = data.overview
          duracion.innerText = data.runtime
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


let arrayIdPeliculas=[]
let recuperoStorage = localStorage.getItem("favoritosPeliculas");

//creo un condicional para ver su hay algo gurdado en el local o si esta vacio
if(recuperoStorage != null){
     arrayIdPeliculas = JSON.parse(recuperoStorage);
} 


if (arrayIdPeliculas.includes(id)) {
     icono.innerHTML = "<span>Agregar a favoritos</span>"
}


icono.addEventListener("click", function(e) {
    e.preventDefault();

    if (arrayIdPeliculas.includes(id)) { // si esta en el array
       let indice = arrayIdPeliculas.indexOf(id); //busca la posicion
       arrayIdPeliculas.splice(indice, 1) //lo borra
       icono.innerHTML = "<span>Agregar a favoritos</span>"

    }else{ //si no esta en el array
        arrayIdPeliculas.push(id) //agregamos al array
        icono.innerHTML = "<span>Quitar de favoritos</span>"

    }

    let favToString = JSON.stringify(arrayIdPeliculas);
    localStorage.setItem('favoritosPeliculas', favToString)


})

// Trailer

let url2=`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
let queryString = location.search; //cadena de texto
console.log(queryString);
let queryStringObj = new URLSearchParams(queryString); //convierte en objeto
let variableId = queryStringObj.get("id");
let listaTrailers = document.querySelector('.boton')

fetch(url2)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data)
          let listaTrailers = document.querySelector('.boton')
          let resultado= data.results
          listaTrailers.innerHtml = ` <iframe src="https://api.themoviedb.org/${resultado.id}/movie/12/videos?api_key=${apiKey}&language=en-US" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`

     })
     .catch(function (errores) {
          console.log(errores);
        });



