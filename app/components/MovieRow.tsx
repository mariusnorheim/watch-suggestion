import React from "react";
import Image from "next/image";

type Item = {
  id: string;
  poster_path: string;
  original_title: string;
}

type Items = {
  results: Item[];
}

type MovieRowProps = {
  slug?: string;
  title?: string;
  items: Items;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, items }) => (
  <>
  <div>
    <h2>{title}</h2>
    <div className="movieRow--listarea">
      {/* {items.results.length > 0 &&
        items.results.map((item, key) => (
          <Image
            key={key}
            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
            alt={item.original_title}
          />
        ))} */}
      {items.results?.map((item, key) => (
          <Image
            key={key}
            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
            alt={item.original_title}
            width={300}
            height={450}
          />
      ))}
    </div>
  </div>
  </>
);

export default MovieRow;