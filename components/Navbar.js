'use client'


import { Dancing_Script, Pacifico, Unna } from "next/font/google";
import {BiMenuAltLeft} from 'react-icons/bi'
import {IoMdArrowDropdown} from 'react-icons/io'
import {FcFilmReel, FcRating, FcClapperboard} from 'react-icons/fc'
import {RiFireFill} from 'react-icons/ri'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';


const dancingscript = Dancing_Script({
    weights: ["400", "500", "600", "700"],
    subsets: ['latin'],
  })

  const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
  })

  const unna = Unna({
    weight: ['400', '700',],
    subsets: ['latin'],
  })

const Navbar = () => {
    const [nav, setNav] = useState();
    const [showMovie, setShowMovie] = useState(false);
    const [showSeries, setShowSeries] = useState(false);

    const handleMovieClick = () => {
        setShowMovie(!showMovie);
    };

    const handleSeriesClick = () => {
        setShowSeries(!showSeries);
    };

    function handleNav() {
        return setNav(prevnav => !prevnav)
    }


  return (
    <section className={`w-full h-auto py-3 border-bottom border-b-2 border-b-slate-500 rounded-full`}>
        <div className='flex items-center justify-between max-w-[400px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] m-auto bg-transparent text-white'>
            <BiMenuAltLeft onClick={handleNav} className="md:hidden" size={28} />
            <h1 className={`flex items-center ${pacifico.className} text-4xl font-semibold`}>
                <FcFilmReel size={80} />
                Movie Trailer
            </h1>
            <div className="hidden md:flex space-x-10">
                <div className="space-y-3">
                    <h1 
                        className={`flex items-center ${pacifico.className} text-xl cursor-pointer`}
                        onClick={handleMovieClick}
                    >
                        Movies
                        <IoMdArrowDropdown size={20} />
                    </h1>
                    <AnimatePresence>
                        {showMovie && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }} 
                                className={`${unna.className} absolute z-[2] text-lg space-y-3 font-extralight`}>
                            <li className="flex items-center space-x-2">Popular <FcClapperboard size={20} /></li>
                            <li className="flex items-center space-x-2">Upcoming <RiFireFill className="text-red-500" size={20} /></li>
                            <li className="flex items-center space-x-2">Toprated <FcRating size={18} /></li>
                        </motion.ul>  
                        )}      
                    </AnimatePresence>
                </div>
                <div className="space-y-3">
                    <h1 
                        className={`flex items-center ${pacifico.className} text-xl cursor-pointer`}
                        onClick={handleSeriesClick}
                    >
                        Series
                        <IoMdArrowDropdown size={20} />
                    </h1>
                    <AnimatePresence>
                        {showSeries && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }} 
                                className={`${unna.className} absolute z-[2] text-lg space-y-3 font-extralight`}>
                            <li className="flex items-center space-x-2">Popular <FcClapperboard size={20} /></li>
                            <li className="flex items-center space-x-2">Upcoming <RiFireFill className="text-red-500" size={20} /></li>
                            <li className="flex items-center space-x-2">Toprated <FcRating size={18} /></li>
                        </motion.ul>  
                        )}      
                    </AnimatePresence>       
                </div>              
            </div>
            <div className={nav ? 'fixed pt-9 pl-12 md:hidden left-0 top-0 right-[50%] bottom-0 w-[60%] h-full bg-[#0d0346] ease-in-out duration-700 space-y-10 max-w-[450px] sm:max-w-[620px] m-auto' : 'fixed md:hidden left-[-100%] top-0 bottom-0 h-full bg-[#0d0346] ease-in-out duration-700'}>
                <div className="flex items-center">
                    <AiOutlineClose onClick={handleNav} size={28} />
                </div>
                <div className="space-y-10">
                <div className="space-y-6">
                    <h1 className={`flex items-center ${pacifico.className} text-3xl text-yellow-400 border-bottom border-b-2 border-b-slate-400`}>
                        Movies
                    </h1>
                    <ul className={`${unna.className} text-xl font-extralight space-y-3`}>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Popular <FcClapperboard size={20} /></li>
                        </Link>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Upcoming <RiFireFill className="text-red-500" size={20} /></li>
                        </Link>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Toprated <FcRating size={18} /></li>
                        </Link>                       
                    </ul>     
                </div>
                <div className="space-y-3">
                    <h1 className={`flex items-center ${pacifico.className} text-3xl text-yellow-400 border-bottom border-b-2 border-b-slate-400`}>
                        Series
                    </h1>
                    <ul className={`${unna.className} text-xl space-y-3 font-extralight`}>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Popular <FcClapperboard size={20} /></li>
                        </Link>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Upcoming <RiFireFill className="text-red-500" size={20} /></li>
                        </Link>
                        <Link href='/'>
                            <li onClick={handleNav} className="flex items-center space-x-2">Toprated <FcRating size={18} /></li>
                        </Link>
                        
                        
                        
                    </ul>     
                </div>              
                </div>
            </div>
        </div>
    </section>
  )
}

export default Navbar;