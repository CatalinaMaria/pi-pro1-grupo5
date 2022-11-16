let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
let sectionDetSeries = document.querySelector('.sectionDetSeries')
console.log(id); 


fetch(url)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data);
          for (let i = 0; i<2; i++)
          sectionDetSeries.innerHTML += `
          <article class="articlePoster">
          <img src=" " alt="" class="poster">
      </article>
      <article class="article">
          <h1 class="tituloSerie">${data.name}</h1>
          <h2 class="fecha">Fecha de estreno: ${data.first_air_date} </h2>
          <p class="descripcionSerie">Sinopsis: ${data.overview} </p>
          <p class="generoSerie">Genero: ${data.genres.name}</p>
              <p class="duracion"> Duracion: ${data.episode_run_time} minutos</p>
              <p class="rating">Rating: ${data.vote_average} %</p>
      </article>
      <article class="articleIcono">
          <img src="./img/amor.png" alt="" class="iconoCorazon">
      </article>`
     })
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