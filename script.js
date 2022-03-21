const url = "https://yts.mx/api/v2/list_movies.json";

const moviesData = fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then((result) => {
    const movies = result.data.movies;

    return movies;
  });

const renderMovies = async (movies) => {
  const moviesToReder = await movies;

  moviesToReder.map((movie) => {
    const { medium_cover_image, title_english, year, rating } = movie;
    // console.log(medium_cover_image);

    const moviesContainer = document.querySelector(".movies");

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = medium_cover_image;
    card.appendChild(img);

    const movieTitle = document.createElement("h3");
    movieTitle.innerText = title_english;
    card.appendChild(movieTitle);

    const movieYear = document.createElement("p");
    movieYear.innerText = year;
    card.appendChild(movieYear);

    const movieIMBD = document.createElement("p");
    movieIMBD.classList.add("imbd");
    movieIMBD.innerText = "Rating: " + rating;
    card.appendChild(movieIMBD);

    moviesContainer.appendChild(card);
  });
};

renderMovies(moviesData);

// const filterMovies = async (movies) => {};

const filterMoviesByRating = async (movies, rating) => {
  const allMovies = await movies;
  // console.log(allMovies);

  const filteredMovies = allMovies.filter((movie) => {
    if (movie.rating > rating) {
      return movie;
    }
  });

  return filteredMovies;
};

renderMovies(filterMoviesByRating(moviesData));

// target selectors
const ratingBtn = document.querySelector("#movie-rating");
const yearBtn = document.querySelector("#movie-year");
const orderByBtn = document.querySelector("#movie-order");

// btn FILTER
ratingBtn.addEventListener("click", async (event) => {
  const filterRating = event.target.value;

  const allMovies = await moviesData;

  const filteredMoviesByRating = allMovies.filter(
    (movie) => movie.rating >= filterRating
  );

  const moviesContainer = document.querySelector(".movies");
  moviesContainer.innerHTML = "";

  renderMovies(filteredMoviesByRating);
});

const search = document.getElementById("search");

const searchButton = document.querySelector(".submitBtn");

let searchText = "";

search.addEventListener("change", (event) => {
  event.preventDefault();
  searchText = event.target.value;
});

// input search
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const moviesToReder = await moviesData;
  // console.log(moviesToReder);
  const filteredMovies = moviesToReder.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // console.log(filteredMovies);

  arrMovie(filteredMovies);
});

function arrMovie(movies) {
  const moviesContainer = document.querySelector(".movies");
  moviesContainer.innerHTML = "";

  renderMovies(movies);
}
