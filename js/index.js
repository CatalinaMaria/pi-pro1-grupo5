
let apikey= "bfec0622d489778cd408f2f5942ce52d"
let api= `https://api.themoviedb.org/3/movie/76341?api_key=${apikey}`

// Fetch para pelis populares
fetch(api)
   .then(function(response){
        return response.json();
   })
   .then(function(data){
        return data;
    })
   .catch(function(error){
        return error;
    })
// formulario
  




