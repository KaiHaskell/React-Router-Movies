import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const Movie = props => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const id = Number(props.match.params.id);
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.match.params.id]);

  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={saveMovie} className="save-button">
        Save
      </button>
    </div>
  );
};

export default Movie;
