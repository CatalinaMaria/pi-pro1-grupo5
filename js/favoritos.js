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

let recuperoStorage = localStorage.getItem("favoritos");


let favoritos = JSON.parse(recuperoStorage);
   

let section = document.querySelector('.favoritos');

let peliculasFavoritos = '';

if (favoritos == null || favoritos.length == 0) {
    /* No hay favoritos */
    section.innerHTML = '<p>No hay datos en favoritos<p/>'
} else {
    for (let i = 0; i < favoritos.length; i++) {
   
        let url =`https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`;
    
        fetch(url)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(data) {

          peliculasFavoritos += ` <article >
            <a href="./detalle-pelicula.html?id=${peliculas.id}"> <img src="https://image.tmdb.org/t/p/w500/${peliculas.poster_path}"
            alt=" foto poster ${peliculas.title}"> </a>
            <p class="nombrePeli">${peliculas.title}</p>
            <p>  Fecha de estreno: ${peliculas.release_date} </p>
            <a href="./detalle-pelicula.html?id=${peliculas.id}">
                <button type="" class="verMas">Ver mas</button>
            </a>
        </article>`
            section.innerHTML = peliculasFavoritos;
            return data;
        })
        .catch(function(error) {
            console.log(error);
            return error;
        });
    
    };

    
}