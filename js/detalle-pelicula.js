let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
let sectionDetPeliculas = document.querySelector('.sectionDetPeliculas')
console.log(id); 


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
          let generosNombres = ''

          titulo.innerText = data.original_title
          estreno.innerText = data.release_date
          sinopsisPelicula.innerText = data.overview
          duracion.innerText = data.runtime
          rating.innerText = data.vote_average
          for (i=0; i<data.genres.length; i++){
               generosNombres += data.genres[i].name + " "  
          }
          generos.innerHTML += 
         `<a href="./detalle-genero.html?id=${id}"> Generos: ${generosNombres}</a>
`
     }) // no hacer un for, sino cambiarlo por titulo.innerText...
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


// favoritos

let icono = document.querySelector('.articleIcono') // agarra el corazon 

//creo un condicional para ver su hay algo gurdado en el local o si esta vacio
if(localStorage.getItem("favoritos" == null)){
     let arrayIdPeliculas=[] //creo una variable vacia para un array
     localStorage.getItem("favoritos", JSON.stringify(arrayIdPeliculas))// guarda el array en la variable fav del local
} else{ 
     let array = JSON.parse(localStorage.getItem("favoritos")) //si existe un array lo traemos
}


icono.addEventListener("click", function(e) {
    e.preventDefault();

    let array = JSON.parse(localStorage.getItem("favoritos")) //trae el array
    if (array.indexOf(id) != 1) { // si esta en el array
       let posicion = array.indexOf(id); //busca la posicion
       array.splice(posicion, 1) //lo borra
       localStorage.getItem("favoritos", JSON.stringify(array)) //guardamos en el array vacio
       
    }else{ //si no esta en el array
        array.push(id) //agregamos al array
        icono.innerText = "Quitar de favoritos"
        localStorage.getItem("favoritos", JSON.stringify(array)) //lo guardamos
    }

})

// Trailer

let url2=`https://api.themoviedb.org/${id}/movie/12/videos?api_key=${apiKey}&language=en-US`
let queryString = location.search; //cadena de texto
console.log(queryString);
let queryStringObj = new URLSearchParams(queryString); //convierte en objeto
let variableId = queryStringObj.get("id");
let listaTrailers = object.querySelector('.divBoton')

fetch(url2)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          listaTrailers.innerHtml = ` <iframe src="https://api.themoviedb.org/${data.id[0]}/movie/12/videos?api_key=${apiKey}&language=en-US" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`

     })
     .catch(function (errores) {
          console.log(errores);
        });



