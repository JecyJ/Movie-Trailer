'use client'


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import MovieCard from "./MovieCard";

const Hero = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}trending/movie/week?language=en-US&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        console.error("Failed to fetch movies:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  const renderMovies = () => (
    <div className="flex">
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          className={`w-full h-auto my-4 ${index === currentIndex ? "flex" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MovieCard movie={movie} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="w-full h-auto py-5">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto relative">
        <h1 className="text-3xl text-center text-red-500 font-bold">Trending Movies</h1>
        <div className="flex items-center justify-center space-x-4">
          <motion.div
            className="flex justify-center items-center"
            style={{ zIndex: 1 }}
            onClick={handlePrev}
          >
            <BsFillArrowLeftCircleFill size={40} className="text-slate-500" />
          </motion.div>
          <div className="flex overflow-x-auto">
            {renderMovies()}
          </div>
          <motion.div
            className="flex justify-center items-center"
            style={{ zIndex: 1 }}
            onClick={handleNext}
          >
            <BsFillArrowRightCircleFill size={40} className="text-slate-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;







    // const fetchMovies = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://api.themoviedb.org/3/trending/movie/week?api_key=" +
    //       process.env.NEXTJS_APP_MOVIE_API_KEY + "language=en-US"
    //     );

    //     if (response.ok) {
    //       const data = await response.json();
    //       setPopular(data.results);
    //       console.log("data", data.results);
    //     } else {
    //       throw new Error("Request failed with status: " + response.status);
    //     }
    //   } catch (error) {
    //     console.log("Error fetching movie data:", error);
    //   }
    // };

    // console.log('data', data)
    // fetchMovies();







// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { data } from "autoprefixer";

// const Hero = () => {
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.themoviedb.org/3/trending/movie/day",
//           {
//             params: {
//               api_key: process.env.NEXTJS_APP_MOVIE_API_KEY,
//               language: "en-US",
//             },
//           }
//         );
//         setPopular(response.data);
//         console.log("data", response.data.results);
//       } catch (error) {
//         console.log("Error fetching movie data:", error);
//       }
//     };
    
//     console.log(data)
//     fetchMovies();
//   }, []);

//   return (
//     <section className="text-white">
//       <h1 className="text-4xl font-bold">Hero Section</h1>
//       {/* Render the movie data */}
//       <ul>
//         {popular.map((movie) => (
//           <li key={movie.id}>{movie.title}</li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default Hero;
