import { useState, useRef, useMemo } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({search, sort}) {
    const [ movies, setMovies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const previousSearch = useRef(search)
    
    const getMovies = useMemo (() => {
        return async ({search}) => {
            if (search === previousSearch.current) return
            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const newMovies = await searchMovies({search})
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        
    }, [])

    // const getSortedMovies = () => {
    //     const sortedMovies = sort
    //         ? [...movies].sort((a, b) =>a.title.localeCompare(b.title))
    //         : movies
    //     return sortedMovies
    // }

    // el useMemo : es para memorizar computaciones que queremos evitar
    // que se haga, a no ser que cambie las dependencias que les indiquemos
    const sortedMovies = useMemo(() =>{ 
        return sort
            ? [...movies].sort((a, b) =>a.title.localeCompare(b.title))
            : movies
    }, [sort, movies]) // [a,b]<-- dependencias
    //esta fraccion de codigo se ejecutara cada vez que haya un 
    //cambio tanto en el orden de las peliculas como en las peliculas

    return {
      movies: sortedMovies, getMovies, loading
    }
  }