'use client'


import { useEffect, useState } from "react";
import Link from "next/link";
import PopularSeriesCard from "./PopularSeriesCard";



const PopularSeries = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [popularSeries, setPopularSeries] = useState([]);



  const fetchPopularSeries = async () => {
    try {
      const response = await fetch(
        `${API_URL}tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setPopularSeries(data.results);
      } else {
        console.error("Failed to fetch movies:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPopularSeries();
  }, []);


  const renderPopularSeries = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {popularSeries.map((movie) => (
        <div key={movie.id} >
          <PopularSeriesCard movie={movie} />
        </div>
      ))}
    </div>
  );


  return (
    <section className="w-full h-auto my-8">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <Link href='/series'>
            <h1 className="text-xl text-center text-white font-bold pb-5">Popular Series</h1>
        </Link>        
        <div className="flex flex-col items-center justify-center space-x-4">
          <div className="flex overflow-x-auto">
            {renderPopularSeries()}
          </div>                    
        </div>
      </div>
    </section>
  )
}

export default PopularSeries;
