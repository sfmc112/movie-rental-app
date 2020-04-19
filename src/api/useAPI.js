import { useState, useEffect } from 'react';
import TheMovieDB from './TheMovieDB';

export const useAPI = (method, ...params) => {
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Clear previous errors
            setError(null);

            // Start loading indicator
            setIsLoading(true);
            // Fetch and set data
            TheMovieDB[method](...params)
                .then((response) => {
                    setData(response.data);
                }) // "try"
                .catch(error => setError(error)) // "catch"
                .then(() => setIsLoading(false)); // "finally"
        };

        fetchData();
    }, [ method, ...params ]); // eslint-disable-line

    return [ data, isLoading, error ];
};
