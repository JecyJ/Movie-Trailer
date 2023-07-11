'use client'

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import UpcomingMovieCard from "./UpcomingMovieCard";


const PopularMovie = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [popularMovie, setPopularMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPopularMovie = async (page) => {
    try {
        let searchParams = `language=en-US&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&page=${page}`;
        if (searchQuery) {
          searchParams += `&query=${searchQuery}`;
        }
        const response = await fetch(`${API_URL}movie/popular?${searchParams}`);
        if (response.ok) {
          const data = await response.json();
          setPopularMovie(data.results);
          setTotalPages(data.total_pages);
        } else {
          console.error("Failed to fetch series:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  useEffect(() => {
    fetchPopularMovie(currentPage);
  }, [currentPage, searchQuery]);

  const handlePrev = (event) => {
    event.preventDefault();
    const prevPage = currentPage === 1 ? totalPages : currentPage - 1;
    setCurrentPage(prevPage);
  };

  const handleNext = (event) => {
    event.preventDefault();
    const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderPopularMovie = () => (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" key={currentPage}>
        {popularMovie
          .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((movie) => (
            <div key={movie.id}>
              <UpcomingMovieCard movie={movie} />
            </div>
          ))}
      </div>
    </AnimatePresence>
  );

  return (
    <section className="w-full h-auto my-3">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <h1 className="text-xl text-center text-white font-bold pb-5">Popular Movies</h1>
        <div className="flex flex-col items-center justify-center space-x-4 space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search series"
              value={searchQuery}
              onChange={handleSearch}
              className="px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
            />
            <button onClick={handleSearch} className="text-white py-1 px-3">Search</button>
          </div>
          <div className="flex overflow-x-auto">
            {renderPopularMovie()}
          </div>
          <div className="flex space-x-3 pt-3">
            <div className="flex justify-center items-center text-orange-500 cursor-pointer" style={{ zIndex: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`?page=${currentPage - 1}`}>
                <p onClick={handlePrev}><BiLeftArrow size={20} /></p>
              </Link>
            </div>
            <p className="text-white">{currentPage}</p>
            <div className="flex justify-center items-center text-orange-500 cursor-pointer" style={{ zIndex: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`?page=${currentPage + 1}`}>
                <p onClick={handleNext}><BiRightArrow size={20} /></p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularMovie;
