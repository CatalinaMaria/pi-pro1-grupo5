let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let generosPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
let generosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`



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

// series
let sectionGeneros = document.querySelector('.containerGenero')

fetch(generosSeries)
.then(function(response){
     return response.json();
})
.then(function(data){
     console.log(data);

     let seriesLista = document.querySelector(".seriesPrueba")
     let info = data.genres;

     for (let i=0 ; i < 5 ; i++ ) {
          let generosSeries = `<li class="listaGenero"> 
          <a href="./detalle-genero.html?id=${info[i].id}&seriesynombre=${info[i].name}" class="genero"> ${info[i].name} </a>
      </li>`
          seriesLista.innerHTML+=generosSeries
     }
})
.catch(function(error){
     console.log("error" + error)
})


//peliculas

fetch(generosPeliculas)
.then (function(response){
     return response.json();
})
.then(function(data){
     console.log(data);

     let pelisLista = document.querySelector(".generoPrueba")
     let info = data.genres;

     for (let i = 0; i < 5; i++) {
          let generosPeliculas = `<li class="listaGenero"> 
          <a href="./detalle-genero-pelis.html?id=${info[i].id}&seriesynombre=${info[i].name}" class="genero"> ${info[i].name} </a>
      </li>`
          pelisLista.innerHTML+=generosPeliculas
     }
})
.catch(function(error){
     console.log("error" + error)
})




