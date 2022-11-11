fetch("https://api.themoviedb.org/3/movie/76341?api_key=bfec0622d489778cd408f2f5942ce52d")
   .then(function(response){
        return response.json();
   })
   .then(function(data){
    return data;
    })
   .catch(function(error){
    return error;
    })
