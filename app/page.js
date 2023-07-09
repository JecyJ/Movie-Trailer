import Hero from '@components/Hero'
import TopRated from '@components/topratedpage/TopRated';
import UpcomingMovies from '@components/detailPage/UpcomingMovies';
import PopularSeries from '@components/seriespage/PopularSeries';


const MoviedbTrailer = () => {
  return (
    <section>
      <Hero />
      <UpcomingMovies />
      <TopRated />
      <PopularSeries />
    </section>
  )
}

export default MoviedbTrailer;
