'use client'

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import TopRatedCard from "./TopRatedCard";
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

const TopRated = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [topRated, setTopRated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchTopRated = async (page) => {
    try {
      const response = await fetch(
        `${API_URL}movie/top_rated?language=en-US&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&page=${page}`
      );
      if (response.ok) {
        const data = await response.json();
        setTopRated(data.results);
        setTotalPages(data.total_pages);
      } else {
        console.error("Failed to fetch movies:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTopRated(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    const prevPage = currentPage === 1 ? totalPages : currentPage - 1;
    setCurrentPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
  };


  const renderTopRated = () => (
    <AnimatePresence mode='wait'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" key={currentPage}>
        {topRated.map((movie) => (
          <div key={movie.id}>
            <TopRatedCard movie={movie} />
          </div>
        ))}
      </div>
    </AnimatePresence>
  );

  


  return (
    <section className="w-full h-auto my-3">
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
        <Link href="/toprated">
          <h1 className="text-xl text-center text-white font-bold pb-5">
            TopRated Movies
          </h1>
        </Link>
        <div className="flex flex-col items-center justify-center space-x-4">
          <div className="flex overflow-x-auto">
            {renderTopRated()}
          </div>
          <div className="flex space-x-3 pt-3">
            <motion.div
              className="flex justify-center items-center text-orange-500 cursor-pointer"
              style={{ zIndex: 1 }}
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/?page=${currentPage - 1}`}>
                <p><BiLeftArrow size={20} /></p>
              </Link>
            </motion.div>
            <p className="text-white">{currentPage}</p>
            <motion.div
              className="flex justify-center items-center text-orange-500 cursor-pointer"
              style={{ zIndex: 1 }}
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/?page=${currentPage + 1}`}>
                <p><BiRightArrow size={20} /></p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRated;









// 'use client'


// import { useEffect, useState } from "react";
// import TopRatedCard from "./TopRatedCard";
// import Link from "next/link";



// const TopRated = () => {
//   const API_URL = "https://api.themoviedb.org/3/";
//   const [topRated, setTopRated] = useState([]);



//   const fetchTopRated = async () => {
//     try {
//       const response = await fetch(
//         `${API_URL}movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setTopRated(data.results);
//       } else {
//         console.error("Failed to fetch movies:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTopRated();
//   }, []);


//   const renderTopRated = () => (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//       {topRated.map((movie) => (
//         <div key={movie.id} >
//           <TopRatedCard movie={movie} />
//         </div>
//       ))}
//     </div>
//   );


//   return (
//     <section className="w-full h-auto my-8">
//       <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] m-auto">
//         <Link href='/toprated'>
//             <h1 className="text-xl text-center text-white font-bold pb-5">TopRated Movies</h1>
//         </Link>        
//         <div className="flex flex-col items-center justify-center space-x-4">
//           <div className="flex overflow-x-auto">
//             {renderTopRated()}
//           </div>                    
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TopRated;
