import React from 'react';

const MovieBackdrop = ({ moviePoster }) => (
    moviePoster ? <img src={ `https://image.tmdb.org/t/p/w154/${moviePoster}` } alt={ 'movie' } /> : null
);

export default MovieBackdrop;
