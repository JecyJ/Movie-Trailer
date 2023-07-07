'use client'


import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import UpcomingMovieCard from "./UpcomingMovieCard";
import { motion } from "framer-motion";



const UpcomingMovies = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);



  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}movie/upcoming?language=en-US&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
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

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? upcomingMovies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === upcomingMovies.length - 1 ? 0 : prevIndex + 1));
  };




  const renderUpcomingMovies = () => (
    <div className="flex">
      {upcomingMovies.map((movie, index) => (
        <motion.div
          key={movie.id}
          className={`w-full h-auto my-4 ${index === currentIndex ? "flex" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <UpcomingMovieCard movie={movie} />
        </motion.div>
      ))}
    </div>
  );




  return (
    <section className="w-full h-auto my-3">
        <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
          <Link href='/'>
            <h1 className="text-xl text-center text-white font-bold">Upcoming Movies</h1>
          </Link>
          <div className="flex flex-col items-center justify-center space-x-4">
            <div className="flex overflow-x-auto">
              {renderUpcomingMovies()}
            </div>
            <div className="flex space-x-3">
              <motion.div
                className="flex justify-center items-center"
                style={{ zIndex: 1 }}
                onClick={handlePrev}
              >
                <BiLeftArrow size={30} className="text-orange-600" />
              </motion.div>
              <p className="text-white">1</p>
              <motion.div
                className="flex justify-center items-center"
                style={{ zIndex: 1 }}
                onClick={handleNext}
              >
                <BiRightArrow size={30} className="text-orange-600" />
              </motion.div>
            </div>
            
        </div>
        </div>
    </section>
  )
}

export default UpcomingMovies;