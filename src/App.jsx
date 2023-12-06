import './App.css'
import responseMovies from './mocks/with-results.json'
import { Movies } from './components/Movie'

function App() {

  const movies = responseMovies.Search

  return (
    <div className='page'>
      <header className="App-header">
        <h1>Buscador de peliculas</h1>
        <form className='form'>
          <input type="text" placeholder='Buscar pelicula....' />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
