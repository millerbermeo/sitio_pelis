import axios from "axios";
import MovieDetails from "../../components/MovieDetails";

const API_KEY = "11aacae26bdfaf98f919d10e46110ac9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Ruta base para las imágenes
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"; // Ruta base para las imágenes de fondo

const MoviePage = async ({ params }) => {
  const { id } = params;

  const movieResponse = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  const movieData = movieResponse.data;

  const recommendationsResponse = await axios.get(
    `${BASE_URL}/movie/${id}/recommendations`,
    { params: { api_key: API_KEY } }
  );
  const recommendationsData = recommendationsResponse.data.results || [];

  const modifiedMovieData = {
    ...movieData,
    posterUrl: `${IMAGE_BASE_URL}${movieData.poster_path}`,
    backdropUrl: `${BACKDROP_BASE_URL}${movieData.backdrop_path}`,
    runtime: movieData.runtime,
  };
  const modifiedRecommendationsData = recommendationsData.map((rec) => ({
    ...rec,
    posterUrl: `${IMAGE_BASE_URL}${rec.poster_path}`,
  }));

  return (
    <MovieDetails
      movie={modifiedMovieData}
      recommendations={modifiedRecommendationsData}
    />
  );
};

export async function generateStaticParams() {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY },
  });
  const movies = response.data.results;

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default MoviePage;
