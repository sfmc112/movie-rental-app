import { useEffect, useState } from 'react';
import useAPI from '../api';

export const useDiscoverMovies = (method, page = 1, query) => {
    const [ movies, setMovies ] = useState([]);
    const [ pages, setPages ] = useState(null);
    const [ currentPage, setCurrentPage ] = useState(null);
    const [ data, isLoading, error ] = useAPI(method, page, query);

    useEffect(() => {
        setMovies(data && data.results);
        setPages(data && data.total_pages);
        setCurrentPage(data && data.page);
    }, [data]);

    return [ movies, pages, currentPage, isLoading, error ];
};

export const useGetMovieDetails = (id) => {
    const [ movieDetail, setMovieDetail ] = useState([]);
    const [ data, isLoading, error ] = useAPI('getMovieDetails', id);

    useEffect(() => {
        if(data) {
            setMovieDetail(data);
        }
    }, [ id, data ]);

    return [ movieDetail, isLoading, error ];
};
