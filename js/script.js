const global = {
    
   currentPage: window.location.pathname,
};

async function displayPopularMovies(){
    const {results} = await fetchData('movie/popular');

    // console.log(results);

    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                 movie.poster_path 
                 ?
                 `<img
                src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt=" ${movie.title} "
              /> `
              :
              `<img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=" ${movie.title} "
            /> 
            `
            }

          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });

    


}

async function displayPopularShows(){
    const {results} = await fetchData('tv/popular');
    console.log(results.backdrop_path)

    displayBacgroundImage('show', results.backdrop_path);

    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${movie.id}">
            ${
                 movie.poster_path 
                 ?
                 `<img
                src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt=" ${movie.name} "
              /> `
              :
              `<img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=" ${movie.name} "
            /> 
            `
            }

          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.first_air_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });

    


}

async function displayMovieDetails(){

   const movieID = window.location.search.split('=');

    const results = await fetchData(`movie/${movieID[1]}`);
    // console.log(movieID);

   displayBacgroundImage('movie', results.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
    <div>
    ${
        results.poster_path 
        ?
        `<img
       src= "https://image.tmdb.org/t/p/w500${results.poster_path}"
       class="card-img-top"
       alt=" ${results.name} "
     /> `
     :
     `<img
     src= "../images/no-image.jpg"
     class="card-img-top"
     alt=" ${results.name} "
   /> 
   `
   }
    </div>
    <div>
      <h2>${results.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
       ${results.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date:  ${ results.release_date}</p>
      <p>
        ${results.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${results.genres.map((genre)=>
            `<li>${genre.name}</li>`).join(' ')}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(results.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(results.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${results.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${results.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${results.production_companies.map((company)=>
        `<span>${company.name}</span>`
    ).join(', ')}</div>
  </div>`
  document.querySelector('#movie-details').appendChild(div);


}
async function displayShowDetails(){

    const showID = window.location.search.split('=');
 
     const results = await fetchData(`tv/${showID[1]}`);
     console.log(results);
 
    displayBacgroundImage('tv', results.backdrop_path);
 
     const div = document.createElement('div');
 
     div.innerHTML = `<div class="details-top">
     <div>

     ${results.poster_path ?
    
        `<img
       src= "https://image.tmdb.org/t/p/w500${results.poster_path}"
       class="card-img-top"
       alt=" ${results.name} "
     /> `
      :

      `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Show Name"
    />`
    }
       

     </div>
     <div>
       <h2>${results.name}</h2>
       <p>
         <i class="fas fa-star text-primary"></i>
         ${results.vote_average.toFixed(1)} / 10
       </p>
       <p class="text-muted">Release Date: ${results.first_air_date}</p>
       <p>
       ${results.overview}
       </p>
       <h5>Genres</h5>
       <ul class="list-group">
       ${results.genres.map((genre)=>
        `<li>${genre.name}</li>`).join(' ')}
       </ul>
       <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
     </div>
   </div>
   <div class="details-bottom">
     <h2>Show Info</h2>
     <ul>
       <li><span class="text-secondary">Number Of Episodes: </span> ${results.number_of_episodes}</li>
       <li>
         <span class="text-secondary">Last Episode To Air: </span> ${results.last_air_date}
       </li>
       <li><span class="text-secondary">Status:</span> ${results.status}</li>
     </ul>
     <h4>Production Companies</h4>
     <div class="list-group">${results.production_companies.map((company)=>
        `<span>${company.name}</span>`
    ).join(' ,           ')}</div>
   </div>`
   document.querySelector('#show-details').appendChild(div);
 
 
 }

async function displayBacgroundImage(type, backgrounPath) {

   const overlayDiv = document.createElement('div');

   overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgrounPath})`;
   overlayDiv.style.backgroundSize = 'cover';
   overlayDiv.style.backgroundPosition = 'center';
   overlayDiv.style.backgroundRepeat = 'no-repeat';
   overlayDiv.style.height = '120vh';
   overlayDiv.style.width = '100vw';
   overlayDiv.style.position = 'absolute';
   overlayDiv.style.top = '0';
   overlayDiv.style.left = '0';
   overlayDiv.style.zIndex = '-1';
   overlayDiv.style.opacity = '0.1';

   if(type === 'movie'){
   document.querySelector('#movie-details').appendChild(overlayDiv);
}

   else{
    document.querySelector('#show-details').appendChild(overlayDiv);
   }
}

async function displaySlider()

{

    const {results} = await fetchData('movie/now_playing');
    console.log(results);

    results.forEach((result)=>{

        

        const div = document.createElement('div');

        div.classList.add('swiper-slide');

        
        div.innerHTML = 
        `
        <a href="movie-details.html?id=${result.id}">
          <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="Movie Title" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
        </h4>
      `;
      
      document.querySelector('.swiper-wrapper').appendChild(div);
        
      initSwiper();
    })

}
function initSwiper(){
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView:3
            },
            1200: {
                slidesPerView: 4
            }

        }
        }
    );
}



async function fetchData(endpoint){

    const API_KEY = '4bc53d6f7962a1318e0ccbfbecf021f5';
    const API_URL = 'https://api.themoviedb.org/3';
    showSpiner();

    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en_US`);
    const data = await response.json();
    hideSpiner();
    return data;

}

function showSpiner(){

    document.querySelector('.spinner').classList.add('show');
}
function hideSpiner(){

    document.querySelector('.spinner').classList.remove('show');
}

function highlightActiveLink(){

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(global.currentPage === link.getAttribute('href')){
        link.classList.add('active');
        }
    });
  
}
function addCommasToNumber(x){
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
}


function init(){

    switch (global.currentPage){

        case '/':
         case '/index.html':
        console.log('Home');
        displayPopularMovies();
       displaySlider();
        break;

        case '/shows.html' :
        console.log('shows');
        displayPopularShows()
        break;

        case '/movie-details.html' :
        console.log('movie');
        displayMovieDetails();
        break;

        case '/tv-details.html' :
        console.log('Tv-show');
        displayShowDetails();
        break;

        case '/search.html' :
        console.log('Search');
        break;
        



    }
    highlightActiveLink();
    
}

document.addEventListener('DOMContentLoaded',init);

