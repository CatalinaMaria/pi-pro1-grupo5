let apiKey= "bfec0622d489778cd408f2f5942ce52d"
// formulario de busqueda
  
let form = document.querySelector('form')
let campoBusqueda = document.querySelector('[name=busqueda]')

console.log(campoBusqueda.value);

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


//Agarramos la palabra que se busco
let queryString = location.search; //Cadena de texto
let queryStringObject = new URLSearchParams(queryString);
let palabra = queryStringObject.get("busqueda");
console.log(palabra);

//Ponemos la palabra en el H1
let h1 = document.querySelector("h1");
h1.innerText = `Resultado de busqueda para: "${palabra}"`;

//gif de loading

let sectionGeneral = document.querySelector(".formatoSection");
window.addEventListener("load", function(event) {
  let gify = '<img class="gif" src="./img/loading.gif">';
  sectionGeneral.innerHTML = gify;
});

//fetch resultado de busqueda peliculas

let apiResultados = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${palabra}&page=1&include_adult=false`;

fetch(apiResultados)
   .then(function(response){
        return response.json();
   })
   .then(function(data){

        let arrayPelicula = data.results;
        let seccion = document.querySelector('section');
        let peliculas = [];

        for (let i = 0; i < 5; i++) {
            peliculas += `<article >
            <a href="./detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w500/${arrayPelicula[i].poster_path}" alt=""> </a>
            <p class="nombrePeli">Titulo: ${arrayPelicula[i].title}</p>
            <p>  Fecha de estreno: ${arrayPelicula[i].release_date} </p>
            <form action="detalle-pelicula.html">
                <button type="" class="verMas">Ver más</button>
            </form>
        </article>`
         seccion.innerHTML = peliculas;   
        }

        console.log(data)
        return data;
    })
   .catch(function(error){
        console.log(error);
    })

    //fetch resultado de busqueda series
    
    let apiResultadoSeries = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=1&query=${palabra}&include_adult=false`

    fetch(apiResultadoSeries)
       .then(function(response){
            return response.json();
       })
       .then(function(data){
    
            let arraySerie = data.results;
            let seccionSeries = document.querySelector('section');
            let series = [];
    
            for (let i = 0; i < 5; i++) {
                series += `<article >
                <a href="./detalle-pelicula.html"> <img src="https://image.tmdb.org/t/p/w500/${arraySerie[i].poster_path}" alt=""> </a>
                <p class="nombrePeli">Titulo: ${arraySerie[i].name} </p>
                <p>  Fecha de estreno: ${arraySerie[i].first_air_date} </p>
                <form action="detalle-pelicula.html">
                    <button type="" class="verMas">Ver más</button>
                </form>
            </article>`
             seccionSeries.innerHTML = series;   
            }
    
            console.log(data)
            return data;
        })
       .catch(function(error){
            console.log(error);
        })