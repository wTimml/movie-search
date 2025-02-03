'use client'

import { useState, useEffect } from "react";
import Searchbar from "./components/searchBar";
import SearchView from "./searchView/page";
import { useRouter, useSearchParams } from "next/navigation";

interface MoviesData {
  id: string;
  overview: string;
  poster_path: string;
  original_title: string;
  backdrop_path: string;
  popularity: number;
  genre: string[];
  genre_ids: number[];
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState<string>(searchParams.get("q") || '');
  const [searchResults, setSearchResults] = useState<MoviesData[]>([]);

  const fetchMovies = async (query: string, numPages = 1) => {
    let allResults: MoviesData[] = [];
  
    for (let page = 1; page <= numPages; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ab166ff82684910ae3565621aea04d62&language=en-US&query=${query}&page=${page}&include_adult=true`
      );
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        allResults = [...allResults, ...data.results];
      }
    }
  
    localStorage.setItem(`searchResults-${query}`, JSON.stringify(allResults));
    setSearchResults(allResults); // Update state after fetching
  };
  

  // Load previous search results from Local Storage on mount
  useEffect(() => {
    if (searchText) {
      const savedResults = localStorage.getItem(`searchResults-${searchText}`);
      if (savedResults) {
        setSearchResults(JSON.parse(savedResults));
      } else {
        // Fetch movies if no saved results
        fetchMovies(searchText, 2);
      }
    }
  }, [searchText]);

  // Update URL with search query
  const handleSearch = (term: string) => {
    setSearchText(term);
    router.push(`/?q=${term}`);
  };

  return (
    <div className=" mt-24 ">
      <div className="flex items-center justify-center mb-6">
        <h1 className="dark:text-white text-3xl font-bold">Search for a Movie</h1>
      </div>
      <Searchbar searchText={searchText} setSearchText={handleSearch} />
      <SearchView searchResults={searchResults} />
    </div>
  );
}
