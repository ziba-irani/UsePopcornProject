import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const Key = "7903cc45";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState("");
  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setErr('')
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`
          );
          const data = await res.json();
            console.log(data);
          if (data.Response === "False") {
            throw new Error("not valid name");
          }
          setMovies(data.Search);
        } catch (err) {
          setErr(err.message);
        }
      }
      if(query.length<3){
        setMovies([]);
        setErr('');
        return;
      }
      fetchMovie();
    },[query]);
  return (
    <div className="container">
      <NavBar>
        <Search query={query} setQuery={setQuery} />
      </NavBar>
      <MovieList movies={movies} setMovies={setMovies} />
    </div>
  );
}
function NavBar({children}) {
  return (
    <div className="nav-bar">
      <NavTitle />
      {children}
    </div>
  );
}
function NavTitle() {
  return (
    <div className="nav-title">
      <p>usePopcorn</p>
      <span>🍿</span>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="MovieName..."
      className="search-box"
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
    />
  );
}

function MovieList({ movies, setMovies }) {
  return (
    <div className="movie-list">
      {movies.map((mov) => {
        return (
          <Movie
            title={mov.Title}
            year={mov.Year}
            poster={mov.Poster}
            key={mov.imdbID}
          />
        );
      })}
    </div>
  );
}
function Movie({ title, year, poster }) {
  return (
    <div className="movie">
      <img src={poster} alt="" />
      <div className="text">
        <p>{title}</p>
        <p>{year}</p>
      </div>
    </div>
  );
}
