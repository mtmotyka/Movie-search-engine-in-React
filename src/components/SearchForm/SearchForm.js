import React, { useState } from "react";
import axios from "axios";

import "./search-form.scss";

const SearchWrapper = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    setInfoMessage("Loading movies...");

    const response = await axios.post(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=ec2e0091`
    );

    if (response.data.Response !== "False") {
      setInfoMessage("");
      setSearchResults(response);
      console.log(response);
    } else {
      setSearchResults(null);
      setInfoMessage("Movies not found :(");
      console.log(response.data.Error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={searchMovies} className="search-container__form">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Start typing..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
      <div className="search-results">
        <div className="search-results__info-message">{infoMessage}</div>
        {searchResults !== null
          ? searchResults.data.Search.map((movie, index) => {
              return (
                <div className="single-movie" key={index}>
                  <div className="single-movie__poster-wrapper">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="img-fluid single-movie__poster"
                    />
                    <a
                      href={`https://www.imdb.com/title/${movie.imdbID}/`}
                      className="btn--red single-movie__button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      More info
                    </a>
                  </div>
                  <h2 className="single-movie__title">{movie.Title}</h2>
                  <p className="single-movie__date">{movie.Year}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchWrapper;
