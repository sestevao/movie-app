const api_key = "04c35731a5ee918f014970082a0088b1";
const api_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`;
const ImgPath = "https://image.tmdb.org/t/p/w1280";
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`;
const genres_URL = `
https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

const section = document.getElementById("section");
const nav = document.getElementById("nav");
const form = document.getElementById("form");
const search = document.getElementById("search");
const dropdown = document.getElementById("dropdow");

//initial get Favorite movies
getMovies(api_URL);
getGenres(genres_URL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

async function getGenres(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showGenres(respData.genres);
}

function showMovies(movies) {
  //clear main
  section.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${ImgPath + poster_path}" alt="${title}">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
          <h3>Overview: </h3>
          ${overview}
      </div>
    `;

    section.appendChild(movieEl);
  });
}

function showGenres(genres) {
  //clear aside
  nav.innerHTML = "";

  genres.forEach((genre) => {
    const { id, name } = genre;
    const genreEl = document.createElement("div");

    genreEl.classList.add("genre");
    genreEl.innerHTML = `
      <div>
        <p>${name}</p>
      </div>
    `;
    nav.appendChild(genreEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SearchApi + searchTerm);

    search.value = "";
  }
});
