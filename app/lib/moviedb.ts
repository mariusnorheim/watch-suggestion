import { MovieDb } from "moviedb-promise";
import dotenv from "dotenv";

dotenv.config();
//const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
//const API_BASE = "https://api.themoviedb.org/3";
const moviedb = new MovieDb(process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "");

const newError = (name: string) => {
  const e = new Error(name)
  e.name = name
  return Promise.reject(e)
}

const getMoviesTrending = async () => {
  try {
    const res = await moviedb.trending({ media_type: "movie", time_window: "week" });
    if (!res) {
      console.log("No data");
      throw new Error("Failed to load");
    }
    // Return the top 9 results
    return res.results?.slice(0, 9);
  } catch (error) {
    console.error(error);
    throw newError;
  }
};

const getMoviesTopRated = async () => {
  try {
    const res = await moviedb.movieTopRated({ language: "en-US" });
    if (!res) {
      console.log("No data");
      throw new Error("Failed to load");
    }
    // Return the top 9 results
    return res.results?.slice(0, 9);
  } catch (error) {
    console.error(error);
    throw newError;
  }
};

const getMoviesPopular = async () => {
  try {
    const res = await moviedb.moviePopular({ language: "en-US" });
    if (!res) {
      console.log("No data");
      throw new Error("Failed to load");
    }
    // Return the top 9 results
    return res.results?.slice(0, 9);
  } catch (error) {
    console.error(error);
    throw newError;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMovieList: async () => {
    return [
      {
        slug: "trending",
        title: "Movies - Trending this week",
        items: getMoviesTrending
      },
      {
        slug: "toprated",
        title: "Movies - Top rated",
        items: getMoviesTopRated
      },
      {
        slug: "popular",
        title: "Movies - Popular",
        items: getMoviesPopular
      },
    ];
  }
};
//export {getMoviesTrending, getMoviesTopRated, getMoviesPopular};

// Trending this week
// Top rated
// Originals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
// Comedy
// Action
// Documentary
// Stand-up?