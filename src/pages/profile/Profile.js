import React, { useContext } from 'react';
import styles from './Profile.module.css';
import { ErrorMessage, MovieRented } from '../../components';
import { RentalsContext } from '../../contexts';

const Profile = () => {
    const { userRentals } = useContext(RentalsContext);

    return (
        <main className={ styles.Container }>
            <div className={ styles.TitleContainer }>
                <h1>Rented Movies</h1>
            </div>
            <div className={ styles.MoviesContainer }>
                {
                    userRentals.length ?
                        userRentals.map(rental => (
                            <MovieRented key={ rental.id } docId={ rental.id } movie={ rental.movie }/>
                        )) : (
                            <ErrorMessage>
                                <div>No movies to display.</div>
                            </ErrorMessage>
                        )
                }
            </div>
        </main>
    );
};

export default Profile;
