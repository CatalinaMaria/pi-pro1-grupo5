let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let generosPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
let generosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`

let sectionGeneros = document.querySelector('.containerGenero')

fetch(generosPeliculas)
   .then(function(response){
          console.log(response)
          return response.json();
   })
   .then(function(data){
     console.log(data.results)
     generosp = data.results
     contenidoGeneros =''
     for (let i = 0; i<5; i++){
          contenidoGeneros +=` 
          
          `}
          
     seccionGeneros.innerHTML = contenidoGeneros
     return data;

     })
   .catch(function(error){
        return error;
    })







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

//series


//Peliculas
let urlPeliculas= `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
