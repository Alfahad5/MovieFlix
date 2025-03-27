import React, { useState } from 'react';
import { useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import { ReactComponent as SearchIcon } from "./search.svg";


const API_URL = 'http://www.omdbapi.com?apikey=4fa12425';

// const movie1={
//     // "Title":"TASM",
//     // "Year":"2012",
//     // "Type":"movie",
//     // "Poster":"N/A"
//     Poster : "https://m.media-amazon.com/images/M/MV5BZmVkNDc3YjQtZDMzOS00MTNjLTljNzUtZDhjYWQxMmVlNjE5XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg",
//     Title : "Batman: The Animated Series",
//     Type : "series",
//     Year : "1992–1995",
//     imdbID : "tt0103359"
// }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        if (title === '')
            title = "Batman";

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
        <div className='app'>
            <h1>MovieFlix</h1>

            <div className='search'>
                <input
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchMovies(searchTerm);
                        }
                    }}
                />
                <SearchIcon
                    className="search-icon"
                    onClick={() => searchMovies(searchTerm)}
                />

            </div>
            {
                movies.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />))}

                            {/* <MovieCard movie={movies[0]} /> */}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;
// export to call it to somewhere else