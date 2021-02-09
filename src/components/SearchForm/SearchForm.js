import React, { useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "./search-form.scss";
import Input from "../Input/Input";

const SearchWrapper = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    setInfoMessage("");
    setSearchResults(null);
    setIsLoading(true);

    const response = await axios.post(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=ec2e0091`
    );

    if (response.data.Response !== "False") {
      setIsLoading(false);
      setInfoMessage("");
      setSearchResults(response);
    } else {
      setIsLoading(false);
      setSearchResults(null);
      setInfoMessage("Movies not found :(");
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={searchMovies} className="search-container__form form">
        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Start typing..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="btn form__button">
          search
        </button>
      </form>
      <div className="search-results">
        {isLoading === true ? (
          <Loader
            type="Circles"
            color="#fff"
            height={75}
            width={75}
            timeout={5000}
          />
        ) : (
          ""
        )}
        <div className="search-results__info-message">{infoMessage}</div>
        {searchResults !== null
          ? searchResults.data.Search.map((movie, index) => {
              return (
                <div className="single-movie" key={index}>
                  <div className="single-movie__poster-wrapper">
                    <img
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : require("../../assets/img/poster-placeholder.jpg")
                              .default
                      }
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
