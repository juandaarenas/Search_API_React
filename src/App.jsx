import './App.css'
import { Movies } from './components/Movie'
import { useMovies } from './hooks/useMovies.js'
import { useState, useEffect, useRef } from 'react'

function useSearch() {
  const [ error, setError ] = useState(null)
  const [ search, updateSearch ] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3) {
      setError('la busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  },[search])
  return { search,updateSearch,error}
}
function App() {
  const [ sort, setSort] = useState(false)

  const { error, updateSearch, search } = useSearch()
  const { movies,loading , getMovies } = useMovies({search,sort})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }
  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
  const handleSort = () => {
    setSort(!sort)
  }
  return (
    <div className='page'>
      <header className="App-header">
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border:'1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            name='query'
            type="text" 
            value={search}
            placeholder='Buscar pelicula....' 
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando ... </p> : <Movies movies={ movies } />
        }
      </main>
    </div>
  )
}

export default App
