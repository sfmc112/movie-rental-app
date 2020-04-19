/* eslint-disable arrow-parens */

import axios from 'axios';

const apiKey = '759cafbb0a32eb1f3c9a6524844f4e11';
const baseURL = 'https://api.themoviedb.org/3';

const movieDB = axios.create({
    baseURL,
});

const config = {
    params: {
        'api_key': apiKey,
    },
};

export default {
    searchMovies: async (page, query) => movieDB.get(`/search/movie?include_adult=false&page=${page}&query=${query}`, config),
    popularMovies: async (page) => movieDB.get(`/discover/movie?sort_by=popularity.desc&page=${page}`, config),
    upcomingMovies: async (page) => movieDB.get(`/movie/upcoming?page=${page}`, config),
    getMovieDetails: async (id) => movieDB.get(`movie/${id}`, config),
};

