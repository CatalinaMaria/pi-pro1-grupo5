let apiKey= "bfec0622d489778cd408f2f5942ce52d"
let qs = location.search;
let qsObj = new URLSearchParams(qs);
let id = qsObj.get('id');
let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
let urlReviewsSeries = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
console.log(id); 

/*DOM*/
let sectionDetPeliculas = document.querySelector('.sectionDetPeliculas')
let icono = document.querySelector('.articleIcono') // agarra el corazon 
let reviews = document.querySelector('.reviewsSeries')
let sectionDetSeries = document.querySelector('.sectionDetSeries')


fetch(url)
     .then (function(response){
          return response.json();
     })
     .then (function(data){
          console.log(data);
          let titulo = document.querySelector('.tituloSeries')
          let estreno = document.querySelector('.fecha')
          let sinopsisSerie = document.querySelector('.descripcionSerie')
          let duracion = document.querySelector('.duracion')
          let rating = document.querySelector('.rating')
          let generos = document.querySelector('.generoSerie')
          let poster = document.querySelector('.poster')
          let generosNombres = ''

          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          titulo.innerText = data.name
          estreno.innerText = data.first_air_date
          sinopsisSerie.innerText = data.overview
          duracion.innerText = data.episode_run_time
          rating.innerText = data.vote_average
          poster.src = ` https://image.tmdb.org/t/p/w500/${data.poster_path} `
          for (i=0; i<data.genres.length; i++){
               generosNombres += data.genres[i].name + " "  
          }
          generos.innerHTML += 
         `<a href="./detalle-genero.html?id=${id}"> Generos: ${generosNombres}</a>
`
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

let favoritos=[]

let recuperoStorage = localStorage.getItem("favoritos")

if (recuperoStorage != null) {
    favoritos =  JSON.parse(recuperoStorage)
}


iconoCorazon.addEventListener("click", function(e) {
    e.preventDefault();

    if (favoritos.includes(id)) {
       let indice = favoritos.indexOf(id)
       favoritos.splice(indice, 1);
       
    }else{
        favoritos.push(id)
        iconoCorazon.innerText = "Quitar de favoritos"
    }

    let favsToString = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", favsToString )
})

// favoritos//
if(recuperoStorage != null){
     arrayIdSeries = JSON.parse(recuperoStorage);
} 


if (arrayIdSeries.includes(id)) {
     icono.innerHTML = "<span>Agregar a favoritos</span>"
}


icono.addEventListener("click", function(e) {
    e.preventDefault();

    if (arrayIdSeries.includes(id)) { // si esta en el array
       let indice = arrayIdSeries.indexOf(id); //busca la posicion
       arrayIdSeries.splice(indice, 1) //lo borra
       icono.innerHTML = "<span>Agregar a favoritos</span>"

    }else{ //si no esta en el array
        arrayIdSeries.push(id) //agregamos al array
        icono.innerHTML = "<span>Quitar de favoritos</span>"

    }

    let favToString = JSON.stringify(arrayIdSeries);
    localStorage.setItem('favoritosSeries', favToString)


})

//reviews//
fetch(urlReviewsSeries)
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {
          console.log(data);

          reviewsUsuarios = ''
          for (i = 0; i < 3; i++) {
               reviewsUsuarios += `<h2> Autor: ${data.results[i].author}</h2>
                                        <h3> Comentario: ${data.results[i].content}</h3>`
          }

          reviews.innerHTML = reviewsUsuarios;

     })
     .catch(function (errores) {
          console.log(errores);
     });
