import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

// Custom Hook
import { useDiscoverMovies } from '../../custom-hooks';

// Components
import { Loader, MovieCard, ErrorMessage } from '../../components';

// Styles
import styles from './MovieList.module.css';

const MovieList = () => {
    const { state: { method, query }} = useLocation();
    const [ page, setPage ] = useState(1);
    const [ movies, pages, currentPage, isLoading, error ] = useDiscoverMovies(method, page, query || '');

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    if (isLoading) {
        return (
            <main className={ classNames(styles.Container, styles.ContainerWithLoader) }>
                <Loader withBackdrop />
            </main>
        );
    } else if (error) {
        return (
            <ErrorMessage>
                <div>{ error.response.data.status_message }</div>
            </ErrorMessage>
        );
    } else if (!movies || !movies.length) {
        return (
            <ErrorMessage>
                <div>No movies to be displayed.</div>
            </ErrorMessage>
        );
    }

    return (
        <main className={ styles.Container }>
            { movies.map(movie => <MovieCard key={ movie.id } movie={ movie } />) }
            <ReactPaginate
                previousLabel={ '<' }
                nextLabel={ '>' }
                breakLabel={ '...' }
                forcePage={ currentPage - 1 }
                pageCount={ pages }
                marginPagesDisplayed={ 2 }
                pageRangeDisplayed={ 5 }
                onPageChange={ data => setPage(data.selected + 1) }
                containerClassName={ styles.Pagination }
                pageClassName={ styles.Page }
                previousClassName={ styles.Page }
                nextClassName={ styles.Page }
                activeClassName={ styles.Active }
                disabledClassName={ styles.Disabled }
            />
        </main>
    );
};

export default MovieList;
