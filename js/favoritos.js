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

/* Recupero el storage */
let recuperoStorage = localStorage.getItem("favToString");

/* transformar el json (string) en obj o un array */
let favoritos = JSON.parse(recuperoStorage);
    
let section = document.querySelector('.favoritos');

let personajesFavoritos = '';

if (favoritos == null || favoritos.length == 0) {
    /* No hay favoritos */
    section.innerHTML = '<p>No hay datos en favoritos<p/>'
} else {
    for (let i = 0; i < favoritos.length; i++) {
   
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${favoritos.id}&page=1&include_adult=false`;
        ;
    
        fetch(url)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(data) {
            let arrayPelis= data.result
            misFavoritos += `<article >
            <a href="./detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w500/${arrayPelis.poster_path}" alt=""> </a>
            <p class="nombrePeli">Titulo: ${arrayPelis.title}</p>
            <p>  Fecha de estreno: ${arrayPelis.release_date}</p>
            <form action="detalle-pelicula.html">
                <button type="" class="verMas">Ver más</button>
            </form>
        </article>`
            section.innerHTML = misFavoritos;
            return data;
        })
        .catch(function(error) {
            console.log(error);
            return error;
        });
    
    };

    
}