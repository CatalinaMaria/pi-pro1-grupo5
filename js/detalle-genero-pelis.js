let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let generosPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
let section = document.querySelector(".cajapadre1");


let qs = location.search
let qslo = new URLSearchParams(qs)
let id = qslo.get('id')
let genero = qslo.get('genre_ids')


let queryString = location.search;
console.log(queryString)
let queryStringObject = new URLSearchParams(queryString);
let variableId = queryStringObject.get("id");
console.log(variableId);
let variableGenero = queryStringObject.get("seriesynombre")

let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${variableId}`

let form = document.querySelector('form')
let campoBusqueda = document.querySelector('[name=busqueda]')


// formulario de busqueda
  

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

//fetch pelis

let titulo = document.querySelector(".tituloResultado")
titulo.innerText = `${variableGenero}:Peliculas`

fetch(url)
  .then(function (response){ 
   return response.json();
})
  .then(function (data){
       console.log(data);

       let info = data.results;
      let peliculaFav = "";
      for (let i = 0; i < 5; i++) {
        console.log(info);
        peliculaFav = `<article > <a href="./detalle-pelicula.html?id=${info[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}"
        alt=" foto poster ${info[i].title}"> </a>
        <p class="nombrePeli">${info[i].title}</p>
        <p>  Fecha de estreno: ${info[i].release_date} </p>
        <a href="./detalle-pelicula.html?id=${info[i].id}">
           <button type="" class="verMas">Ver mas</button>
            </a>
        </article>`
        section.innerHTML += peliculaFav;
      }
  })
