import Image from "next/image";
import Link from "next/link";
import { AiTwotoneStar } from 'react-icons/ai';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const UpcomingDetailCard = ({ movie }) => {
  const ratingColor = movie.vote_average >= 5 ? "text-green-600" : "text-red-600";

  return (
    <section className="w-full h-auto">
      <Link href='/upcomingdetails'>
        <div className="space-y-2 border border-slate-700 rounded-3xl shadow-2xl">
          <Image
            className="border rounded-3xl border-slate-700 w-auto sm:w-auto"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt="/"
            width={1000}
            height={1000}
          />
          <div className="flex justify-between px-2">
            <h1 className="flex items-center text-white text-xs">
              <AiTwotoneStar className="text-orange-500" size={20} />
              <span className={ratingColor}>{movie.vote_average}</span>/10
            </h1>
            <h1 className="text-white text-xs">{movie.release_date}</h1>
          </div>
          <h1 className="text-white text-xs px-2 pt-1 pb-2">{movie.title}</h1>
          <p className="text-gray-400 text-sm px-2">{movie.overview}</p>
          {/* <p className="text-gray-400 text-sm px-2">{movie.casts.join(', ')}</p> */}
        </div>
      </Link>
    </section>
  );
};

export default UpcomingDetailCard;
