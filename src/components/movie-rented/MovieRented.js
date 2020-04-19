import React, { useState } from 'react';
import classNames from 'classnames';
import firebase from '../../firebase';

// Components
import { MovieBackdrop } from '../index';

// Styles
import styles from './MovieRented.module.css';

const MovieRented = ({ docId, movie }) => { // eslint-disable-line
    const [documentId] = useState(docId);
    const { movie_poster: moviePoster } = movie;

    const removeRental = async() => firebase.firestore().collection('rentals')
        .doc(documentId)
        .delete();

    return (
        <div className={ styles.Container }>
            <MovieBackdrop moviePoster={ moviePoster } />
            <div className={ classNames(styles.OptionsContainer) }>
                <button className={ styles.Option } onClick={ removeRental }>End Rental</button>
            </div>
        </div>
    );
};

export default MovieRented;
