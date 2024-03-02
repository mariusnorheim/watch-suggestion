import type { NextPage } from "next";
import { useState, useEffect } from "react";
import movieDb from "../lib/moviedb";
import MovieRow from "@components/MovieRow";
//import { MovieDb } from "moviedb-promise";
import { MovieResult, TvResult, PersonResult } from "moviedb-promise";

const Home: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const list = await movieDb.getMovieList();
      setMovies(list);
    };
    loadAll();
  }, []);

  return (
    <>
      <h1>Welcome to My Movie App</h1>
      <section className="lists">
        {/* {movies.map((movie) => (
        <MovieRow
          key={movie.items.id}
          title={movie.title}
          items={movie.items}
          uri={movie.items.poster_path}
        />
      ))} */}
      {movies && <MovieRow title="Trending This Week" items={{ results: movies }} />}
      </section>
      {/* {movies && <MovieRow items={{ results: movies }} />} */}
    </>
  );
};

// This gets passed to the Layout component in _app.tsx
Home.getInitialProps = async () => ({
  title: "Welcome to watch suggestion!",
});

export default Home;
