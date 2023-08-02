import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard'

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const movie1 = {
  title: "Avengers",
  year: "2012",
  poster: "N/A",
  imdbId: "tt0848228",
  type: "movie",
}

function App() {

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) =>
  {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search)
    {
      setMovies(data.Search);
    }
  }

  useEffect(() =>
  {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie</h1>

      <div className='search'>
        <input type='text' placeholder='Search...'
          onChange={(e) =>
          {
            searchMovies(e.target.value);
          }}
        />
        <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" className='App-logo' alt='logo'
          onClick={() =>
          {
            searchMovies("Avengers");
          }
          }
        />
      </div>
      {
        movies.length > 0 ?
          (
            <div className='container'>
              {movies.map((movie) =>
              (<MovieCard movie={movie} key={movie.imdbID} />
              )
              )}
            </div>
          ) : (
            <p className='App-logo'>No movies found</p>
          )
      }
    </div>
  );
}

export default App;
