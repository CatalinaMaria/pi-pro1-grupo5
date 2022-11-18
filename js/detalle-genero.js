let apiKey= "bfec0622d489778cd408f2f5942ce52d"

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


// listado de peliculas o series

let queryString = location.search;
console.log(queryString)
let queryStringObject = new URLSearchParams(queryString);


//variable que trae el id
let variableId = queryStringObject.get("id");
console.log(variableId);

//variable que trae el tipo, si es peli o serie
let variableTipo = queryStringObject.get("tipo");
console.log(variableTipo);

//variable que me trae el nombre del genero
let variableGenero = queryStringObject.get("seriesynombre");

let url = "";
let titulo = document.querySelector(".tituloResultado");
let section = document.querySelector(".cajapadre1");

if (variableTipo == "peliculas") {
  url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&with_genres=${variableId}`;
  titulo.innerText = `${variableGenero} : Peliculas`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let info = data.results;
      let peliculaFav = "";
      for (let i = 0; i < 5; i++) {
        console.log(info[i].title);
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
    .catch(function (error) {
      console.log("Error: " + error);
    });
} else {
  url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${variableId}`;
  console.log(url)
  titulo.innerText = `${variableGenero}:Series`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let info = data.results;
      let serieFav = "";
      for (let i = 0; i < 5; i++) {
        console.log(info[i].title);
        serieFav =  ` <article >
        <a href="./detalle-serie.html?id=${info[i].id}"> <img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}"
        alt=" foto poster ${info[i].name}"> </a>
        <p class="nombreSerie">${info[i].name}</p>
        <p>  Fecha de estreno: ${info[i].first_air_date} </p>
        <a href="./detalle-serie.html?id=${info[i].id}">
        <button type="" class="verMas">Ver mas</button>
    </a>
</article>`;
        section.innerHTML += serieFav;
      }
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}