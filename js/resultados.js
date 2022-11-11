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

//fetch resultado de busqueda

let apiResultados = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${palabra}&page=1&include_adult=false`;

fetch(apiResultados)
   .then(function(response){
        return response.json();
   })
   .then(function(data){
        console.log(data)
        return data;
    })
   .catch(function(error){
        console.log(error);
    })