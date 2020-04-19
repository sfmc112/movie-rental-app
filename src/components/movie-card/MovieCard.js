import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Components
import { MovieBackdrop } from '../index';

// Styles
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => (
    <div className={ styles.Container }>
        <MovieBackdrop moviePoster={ movie.poster_path } />
        <div className={ classNames(styles.OptionsContainer) }>
            { /* !isEmpty(currentUser) && <button className={ styles.Option }>Rent</button> TODO set onClick */}
            <Link to={ `/movie/${movie.id}` } className={ styles.Option }>Details</Link>
        </div>
    </div>
);

export default MovieCard;
