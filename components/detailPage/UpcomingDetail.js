'use client'

import { useEffect, useState } from "react";
import UpcomingDetailCard from "./UpcomingDetailCard";

const UpcomingDetail = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
          );
          if (response.ok) {
            const data = await response.json();
            setUpcomingMovies(data.results);
          } else {
            console.error("Failed to fetch movies:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    fetchUpcomingMovies();
  }, []);


  return (
    <section className="w-full h-auto my-3">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <h1 className="text-xl text-center text-white font-bold pb-5">
          Upcoming Movies
        </h1>
        <div className="flex flex-col items-center justify-center space-x-4">
          <div className="flex overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {upcomingMovies.map((movie) => (
                <div key={movie.id}>
                    <UpcomingDetailCard movie={movie} />
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDetail;