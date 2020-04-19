import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography, Tooltip } from '@material-ui/core';
import { RentalsContext, UserContext } from '../../contexts';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import themeStyles from '../../theme/styles';
import isEmpty from 'lodash/isEmpty';

// API hook
import { useGetMovieDetails } from '../../custom-hooks';

// Components
import { ErrorMessage, Loader, MovieBackdrop } from '../../components';

// Styles
import styles from './MovieDetails.module.css';
import firebase from '../../firebase';

const MovieDetails = ({ classes }) => {
    const { id } = useParams();
    const { currentUser } = useContext(UserContext);
    const { userRentals } = useContext(RentalsContext);
    const [ movieDetail, isLoading, error ] = useGetMovieDetails(id);
    const [ movie, setMovie ] = useState({}); // eslint-disable-line
    const [ isRented, setIsRented ] = useState(null);
    const [ errorAddRental, setErrorAddRental ] = useState(null);
    const [ isLoadingAddRental, setIsLoadingAddRental ] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const isThisMovieRented = userRentals.filter(rental => rental.movie.movie_id === id);
            setIsRented(!!isThisMovieRented.length);
        }
    }, [ currentUser, userRentals, id ]);

    useEffect(() => {
        setMovie(movieDetail);
    }, [movieDetail]);

    const addRental = async () => {
        setIsLoadingAddRental(true);
        setErrorAddRental(null);

        firebase.firestore().collection('rentals').add({
            'user_id': currentUser.uid,
            'movie_id': id,
            'movie_poster': movieDetail.poster_path,
        }).then()
            .catch((error) => {
                setErrorAddRental(error);
            })
            .then(() => setIsLoadingAddRental(false));
    };

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
    } else if (!movieDetail || !movie) {
        return (
            <ErrorMessage>
                <div>Movie not found</div>;
            </ErrorMessage>
        );
    }

    const { title, overview, genres, release_date: releaseDate, poster_path: posterPath } = movie;
    let buttonLabel;
    const isAnyLoading = isLoadingAddRental || isLoading;
    const showRent = !isLoadingAddRental && !isRented;
    const showRented = !isLoadingAddRental && isRented;
    const releaseDateObject = new Date(releaseDate);
    const today = new Date();
    const isUnreleased = releaseDateObject > today;

    if(isAnyLoading) {
        buttonLabel = <Loader />;
    } else if (isUnreleased) {
        buttonLabel = 'Unreleased';
    } else if (showRent) {
        buttonLabel = 'Rent';
    } else if (showRented) {
        buttonLabel = 'Rented';
    }

    return (
        <main className={ styles.Container }>
            <div className={ styles.Block }>
                <div className={ styles.Left }>
                    <MovieBackdrop moviePoster={ posterPath } />
                </div>
                <div className={ styles.Right }>
                    <Typography component="h1" variant="h4">
                        { title }
                    </Typography>
                    <div className={ styles.GenresContainer }>
                        { genres && genres.map(genre => <span className={ styles.Genre } key={ genre.id }>{`${genre.name} `}</span>) }
                    </div>
                    <div>Released: <span className={ styles.Date }>{ releaseDate }</span></div>
                    {
                        isEmpty(currentUser) ? (
                            <Tooltip title="Log in to rent this movie" arrow placement="bottom" >
                                <span className={ classes.rent }>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled
                                        color="primary"
                                        onClick={ addRental }>
                                        { buttonLabel }
                                    </Button>
                                </span>
                            </Tooltip>
                        ) : (
                            <Button
                                variant="contained"
                                fullWidth
                                disabled={ isAnyLoading || isRented || isUnreleased }
                                color="primary"
                                className={ classes.rent }
                                onClick={ addRental }>
                                { buttonLabel }
                            </Button>
                        )
                    }
                    { errorAddRental && <div>Add rental error</div>}
                </div>
            </div>
            <div>{ overview }</div>
        </main>
    );
};

export default withStyles(themeStyles)(MovieDetails);
