import React from 'react';
import { UpArrowMessage } from '../../components';
import styles from './Homepage.module.css';

const Homepage = () => (
    <main className={ styles.Container }>
        <UpArrowMessage>
            <div>Welcome to Movie Rental!</div>
            <div> Please choose one of the options above to search for movies.</div>
        </UpArrowMessage>
    </main>
);

export default Homepage;
