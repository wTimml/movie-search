'use client'

import HeroSection from '@/app/components/heroSection'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface movieData {
  id: string;
  overview: string;
  poster_path: string;
  original_title: string;
  title: string;
  backdrop_path: string;
}

export default function Movies() {

  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<movieData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=ab166ff82684910ae3565621aea04d62&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [params.id]);

  function renderMovieDetails() {

    if (isLoading) {
      return <HeroSection original_title='Loading...' backdrop=''/>
    }  

    if (movieDetails) {

      const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`

      const moviePoster = () => {
        if (movieDetails.poster_path) {
          return <img className="w-1/2 md:w-full object-cover" src={posterPath} alt="Movie_poster" />
        } else {
          return <p className="w-1/2 md:w-full text-center text-pink-600 pt-16">Poster not available</p>
        }
      }

      return (

        <>
          <HeroSection original_title={movieDetails?.original_title} backdrop={backdropUrl}/>

          <div className="container mx-auto px-4 py-8 dark:text-white">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 md:col-span-2 place-items-center">
                {moviePoster()}
              </div>
              <div className="col-span-12 md:col-span-10">
                <h1 className='text-2xl md:text-4xl font-bold drop-shadow'>{movieDetails.title}</h1>
                <p className='my-5'>
                  {movieDetails.overview}
                </p>
              </div>
            </div>
          </div>

        </>
      )
    }
  }

  return (
      renderMovieDetails()
  )
}