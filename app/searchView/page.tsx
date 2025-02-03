'use client'

import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface moviesData {
    id: string;
    overview: string;
    poster_path: string;
    original_title: string;
    backdrop_path: string;
    popularity: number;
    genre: []
    genre_ids: number[]
}

interface ChildProps {
    searchText: string;
    searchResults: moviesData[];
}

export default function searchView({ searchText, searchResults }: ChildProps) {

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedGenresNames, setSelectedGenresNames] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>('popularity');
    const [genresList, setGenresList] = useState<{ id: number; name: string }[]>([]);
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);


    // fetch list of genres
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=ab166ff82684910ae3565621aea04d62&language=en-US`)
          .then(response => response.json())
          .then(data => setGenresList(data.genres));
      }, []);


    const handleGenreChange = (genreId: string, genreName: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
        );

        setSelectedGenresNames((prev) =>
            prev.includes(genreName) ? prev.filter((name) => name !== genreName) : [...prev, genreName]
        );
    };


    function MovieCard({ movie }: { movie: moviesData }) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const detailUrl = `/movies/${movie.id}`;
      
        return (
          <div className="bg-violet-200 shadow-lg rounded-3xl overflow-hidden border border-violet-500 p-4 flex flex-col h-full">
            {movie.poster_path ? (
              <img className="w-full h-48 object-cover" src={posterUrl} alt="Movie_poster" />
            ) : (
              <p className="w-full h-48 object-cover text-center text-pink-600 pt-16">Poster not available</p>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{movie.original_title}</h2>
            <p className="text-gray-600 mt-2 mb-4 flex-grow overflow-y-auto h-20 no-scrollbar overscroll-y-none">
              {movie.overview}
            </p>
            <a className="mt-auto w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" href={detailUrl}>
              Show details
            </a>
          </div>
        );
      }


    
    return (
        <div className="container mx-auto px-4 py-8 dark:text-white">
            {
                searchResults.length > 0 ? (

                    <div className="flex justify-end mb-4 gap-x-5">

                        {/* Genre */}
                        <div className="relative w-auto ">
                            <button className="border p-2 rounded bg-violet-200 text-gray-800 shadow flex" onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}>Select Genres 
                            </button>

                            {isGenreDropdownOpen && (

                                <div className="absolute bg-white border rounded shadow-lg mt-2 max-h-60 overflow-auto no-scrollbar overscroll-y-none w-40">
                                {genresList.map((genre) => (
                                    <label key={genre.id} className="block px-4 py-2 bg-violet-200 text-gray-800">
                                    <input
                                        type="checkbox"
                                        value={genre.id}
                                        checked={selectedGenres.includes(genre.id.toString())}
                                        onChange={() => handleGenreChange(genre.id.toString(), genre.name)}
                                        className="mr-2 h-3 w-3 appearance-none border-2 border-gray-500 rounded-md checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300"
                                    />
                                    {genre.name}
                                    </label>
                                ))}
                                </div>
                            )}
                        </div>


                        {/* Sort */}
                        <select
                            className="border p-2 rounded bg-violet-200 text-gray-800"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="title">Title A-Z</option>
                        </select>

                    </div>

                ) : ''
            }

            {/* // Show selected genres */}
            {
                selectedGenres ? (
                    <div className="container mx-auto px-4 py-1 dark:text-white">
                        <div className="flex justify-start mb-4 gap-x-5">
                            {
                                selectedGenresNames.map((genre) => (
                                    <p key={genre}>{genre}</p>
                                ))
                            }
                        </div>
                    </div>
                ) : ''
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {
                searchResults
                    .filter((movie) => selectedGenres.length === 0 || movie.genre_ids.some((id) => selectedGenres.includes(id.toString())))
                    .slice() // Copy to avoid mutating state directly
                    .sort((a, b) => (sortBy === "title" ? a.original_title.localeCompare(b.original_title) : b.popularity - a.popularity))
                    .map((obj, i) => (
                    <MovieCard key={i} movie={obj} />

                ))}

            </div>
        </div>

    );
          

}