// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const API_KEY = 'api_key=4a28b6e8f1364649e6da7d76865b5d3d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const h = document.getElementById('h');
const poster = document.getElementById('poster');
const form = document.getElementById('form');
const search = document.getElementById('search');

getPopularMovies(API_URL);

function checkIfOnPageX() {
    const pageX = 'Movies';
    const currentPath = window.location.pathname.split('/').pop();
    return currentPath === pageX;
}

function makeElementInactive(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        document.getElementById('form').style.display = "none";
    }
}

const isOnPageX = checkIfOnPageX();
const elementIdToDeactivate = 'form';

if (isOnPageX)
{
    makeElementInactive(elementIdToDeactivate);
}
document.addEventListener('DOMContentLoaded', main);


function getPopularMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}


const images = [
    "https://collider.com/wp-content/uploads/inception_movie_poster_banner_04.jpg",
    "https://1.bp.blogspot.com/-qNMImfxdoB0/XCWyfawq51I/AAAAAAABBOs/A1u3kOmgspQmKzgF2RaiAw1uWKRE-_QVACEwYBhgL/s1600/DC%2BComics%25E2%2580%2599%2BAquaman%2BFinal%2BTheatrical%2BOne%2BSheet%2BMovie%2BPosters%2B%2526%2BBanners%2B%25283%2529.jpg",
    "https://itsmoreofacomment.com/wp-content/uploads/2021/09/Dune-Movie-Official-Poster-banner-feature.jpg",
    "https://preview.redd.it/tg4l2g0pl1e81.jpg?auto=webp&s=c840adaf5949c12e173f6d753ae7369084900a9c",
    "https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2019/05/godzilla_king_of_the_monsters_ver17_xlg.jpg?ssl=1",
];

const imageEl = document.getElementById("image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentImageIndex = 0;

function loadImage() {
    imageEl.src = images[currentImageIndex];
}

loadImage();

setInterval(() => {
    if (!nextBtn.disabled) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        loadImage();
    }
}, 7000);

prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    loadImage();
    nextBtn.disabled = false;
});

nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImage();
    prevBtn.disabled = false;
});

if (images.length === 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
} else {
    prevBtn.disabled = true;
} 

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    <div class="movie-card">
        <img class="movie-poster" src="${IMG_URL + poster_path}" alt ="${title}"/>
        <div class="title-card">
            <h2 class="movie-title">${title}</h2>
        </div>
        <div class="movie-rating">
            <span class="${getColor(vote_average)}"> ${vote_average}</span>    
        </div>
    </div>
    `
        main.appendChild(movieEl);
    })

    function getColor(vote) {
        if (vote >= 8) {
            return 'green'
        } else if (vote >= 6) {
            return 'orange'
        } else {
            return 'red'
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchTerm = search.value;

        if (searchTerm) {
            document.getElementById('h').innerHTML = "";
            const titleEl = document.createElement('div');
            titleEl.classList.add('cs-hd');
            titleEl.innerHTML = '        <h1 class="cs-hd">Search Results</h1>'
            h.appendChild(titleEl);
            getPopularMovies(searchURL + '&query=' + searchTerm)
           
        } else {
            getPopularMovies(API_URL);
        }
    })
}