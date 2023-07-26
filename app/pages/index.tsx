import React, { useState } from "react";
//import useSWR from "swr";
//import Router from "next/router";
//import AccordionComponent from "@components/Accordion";
import { MovieDb } from "moviedb-promise";
import dotenv from "dotenv";

dotenv.config();
const token = process.env.APP_TOKEN;
// const fetcher = (url: string) =>
//   fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + process.env.APP_TOKEN,
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   }).then((res) => res.json());

const moviedb = new MovieDb(token);
const newError = (name) => {
  const e = new Error(name)
  e.name = name
  return Promise.reject(e)
}

export const searchMovie = async (req) => {
  const parameters = {
    query: req.query.name,
    page: req.query.page,
  }
  try {
    const res = await moviedb.searchMovie(parameters)
    return res.results
  } catch (error) {
    return newError(error)
  }
}

export const searchPerson = async (req) => {
  const parameters = {
    query: req.query.name,
    page: 1,
  }
  try {
    const res = await moviedb.searchPerson(parameters)
    return res.results
  } catch (error) {
    return newError(error)
  }
}

export const movieKeywords = async (req) => {
  try {
    const res = await moviedb.movieKeywords({ query: req.query.name })
    return res.results
  } catch (error) {
    return newError(error)
  }
}

export default function Index() {
  const [searchString, setSearchString] = useState("");
  const [response, setResponse] = useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // const { data, error } = useSWR(
      //   `https://api.themoviedb.org/3/search/multi?query=${searchString}`,
      //   fetcher
      // );
      // const response = await data;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchString}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+token,
          "Content-Type": "application/json;charset=utf-8"
        },
      })
      .then(res => res.json())
      // moviedb
      //   .movieInfo({ id: 666 })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch(console.error)

      //if (error) return <div>Failed to load</div>;
      if (!response) return <div>Loading...</div>;

      setResponse(JSON.stringify(response));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label" htmlFor="searchString">
            Search
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              autoFocus
              autoComplete="searchString"
              type="text"
              name="searchString"
              required={true}
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
            <input
              className="btn btn-secondary"
              disabled={!searchString}
              type="submit"
              value="Make suggestion!"
            />
          </div>
        </div>
      </form>
      <div className="mb-12 row">
        {/* <ul>
          {response?.results[].map((r: ResponseData) => (
            <AccordionComponent response={r} />
          ))}
        </ul> */}
        <div>{response}</div>
      </div>
      {/* <ul>
      {data.map((p: Person) => (
        <PersonComponent key={p.id} person={p} />
      ))}
      </ul> */}
    </>
  );
}
