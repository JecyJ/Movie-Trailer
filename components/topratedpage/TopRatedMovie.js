'use client'


import { useEffect, useState } from "react";
import TopRatedCard from "./TopRatedCard";
import Link from "next/link";



const TopRatedMovie = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [topRatedMovie, setTopRatedMovie] = useState([]);



  const fetchTopRatedMovie = async () => {
    try {
      const response = await fetch(
        `${API_URL}movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setTopRatedMovie([...topRatedMovie, ...data.results]);
      } else {
        console.error("Failed to fetch movies:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTopRatedMovie();
  }, []);


  const renderTopRatedMovie = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {topRatedMovie.map((movie) => (
        <div key={movie.id} >
          <TopRatedCard movie={movie} />
        </div>
      ))}
    </div>
  );


  return (
    <section className="w-full h-auto my-8">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <h1 className="text-xl text-center text-white font-bold pb-5">TopRated Movies</h1>        
        <div className="flex flex-col items-center justify-center space-x-4">
          <div className="flex overflow-x-auto">
            {renderTopRatedMovie()}
          </div>                    
        </div>
      </div>
    </section>
  )
}

export default TopRatedMovie;
