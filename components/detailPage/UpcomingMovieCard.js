import Image from "next/image";
import { useEffect, useState } from "react";
import {AiTwotoneStar} from 'react-icons/ai'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const UpcomingMovieCard = ({movie}) => {
    const ratingColor = movie.vote_average >= 5 ? 'text-green-600' : 'text-red-600';


  return (
    <section className="w-full h-auto">
        <div className="space-y-2 border rounded-3xl">       
          <Image
            className="border rounded-3xl w-auto sm:w-auto"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt="/"
            width={1000}
            height={1000}
          />
          <div className="flex justify-between px-2">
            <h1 className="flex items-center text-white text-sm"><AiTwotoneStar className="text-orange-500" size={20} /><span className={ratingColor}>{movie.vote_average}</span>/10</h1>
            <h1 className="text-white text-sm">{movie.release_date}</h1>
          </div>
          <h1 className="text-white text-base px-2 pt-3 pb-2">{movie.original_title}</h1>
        </div>
    </section>
  )
}

export default UpcomingMovieCard;