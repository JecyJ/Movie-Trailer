'use client'


import { useEffect, useState } from "react";
import TopRatedCard from "./TopRatedCard";
import Link from "next/link";



const TopRated = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [topRated, setTopRated] = useState([]);



  const fetchTopRated = async () => {
    try {
      const response = await fetch(
        `${API_URL}movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setTopRated(data.results);
      } else {
        console.error("Failed to fetch movies:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);


  const renderTopRated = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {topRated.map((movie) => (
        <div key={movie.id} >
          <TopRatedCard movie={movie} />
        </div>
      ))}
    </div>
  );


  return (
    <section className="w-full h-auto my-8">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <Link href='/toprated'>
            <h1 className="text-xl text-center text-white font-bold pb-5">TopRated Movies</h1>
        </Link>        
        <div className="flex flex-col items-center justify-center space-x-4">
          <div className="flex overflow-x-auto">
            {renderTopRated()}
          </div>                    
        </div>
      </div>
    </section>
  )
}

export default TopRated;
