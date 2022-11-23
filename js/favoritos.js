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
let recuperoStoragePelicula = localStorage.getItem("peliculasFav");
let recuperoStorageSerie = localStorage.getItem("seriesFav");
/* transformar el json (string) en obj o un array */
let favoritosPelis = JSON.parse(recuperoStoragePelicula);   
let favoritosSeries = JSON.parse(recuperoStorageSerie); 

let listaPelis = document.querySelector('.Peliculasfavoritos')
let listaSeries = document.querySelector('.Seriesfavoritos')
let noListaPelis = document.querySelector('.NoPeliculasfavoritos')
let noListaSeries = document.querySelector('.NoSeriesfavoritos')

// Peliculas
let pelicualsF = "";

if (favoritosPelis == null || favoritosPelis.length == 0) {
    /* No hay favoritos */
    noListaPelis.innerHTML = '<p>No hay datos en favoritos<p/>'
} else {
    for (let i = 0; i < favoritosPelis.length; i++) {
   
        let urlfav = `https://api.themoviedb.org/3/movie/${favoritosPelis[i]}?api_key=${apiKey}&language=en-US`;
        ;
    
        fetch(urlfav)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(data) {
            console.log(data)
            pelicualsF += `<article >
                     <a href="./detalle-pelicula.html?id=${data.id}"> <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt=""> </a>
                        <p class="nombrePeli">Titulo: ${data.title}</p>
                    <p>  Fecha de estreno: ${data.release_date}</p>
                    <a href="./detalle-pelicula.html?id=${data.id}">
                    <button type="" class="verMas">Ver mas</button>
                    </a>
                    </article>`
            listaPelis.innerHTML = pelicualsF;
                return data;
            })
            .catch(function(error) {
                console.log(error);
                return error;
            });
        
        };
    
        
    }
    

 // Series
let seriesF = "";

if (favoritosSeries == null || favoritosSeries.length == 0) {
    /* No hay favoritos */
    noListaSeries.innerHTML = '<p>No hay datos en favoritos<p/>'
} else {
    for (let i = 0; i < favoritosSeries.length; i++) {
   
        let urlSeriefav = `https://api.themoviedb.org/3/tv/${favoritosSeries[i]}?api_key=${apiKey}&language=en-US`;
        ;
    
        fetch(urlSeriefav)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(data) {
            console.log(data)
            seriesF += ` <article >
                <a href="./detalle-serie.html?id=${data.id}"> <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}"
                alt=" foto poster ${data.name}"> </a>
                <p class="nombreSerie">${data.name}</p>
                <p>  Fecha de estreno: ${data.first_air_date} </p>
                <a href="./detalle-serie.html?id=${data.id}">
                <button type="" class="verMas">Ver mas</button>
                </a>
                </article>`
                listaSeries.innerHTML = seriesF;
                return data;
            })
            .catch(function(error) {
                console.log(error);
                return error;
            });
        
        };
    
        
    }
       