import './App.css'
import responseMovies from './mocks/with-results.json'
import withOutResults from './mocks/no-results.json'

function App() {

  const movies = responseMovies.Search
  const hasMovies = movies?.length > 0

  return (
    <div>
      <header className="App-header">
        <h1>Buscador de peliculas</h1>
        <form>
          <input type="text" placeholder='Buscar pelicula....' />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        {
          hasMovies?(
            <ul>
              {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </li>
                ))
              }
            </ul>
          )
          :(
            <p>No se encontraron resultados</p>
          )
        }
      </main>
    </div>
  )
}

export default App
