import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { useHistory } from 'react-router-dom';
import { NavLink } from '../index';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import themeStyles from '../../../../theme/styles';
import { UPCOMING_MOVIES, POPULAR_MOVIES, SEARCH_MOVIES } from '../../../../constants';

const NavBar = ({ classes }) => {
    const history = useHistory();
    const [ queryInput, setQueryInput ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = / /gi;
        const query = queryInput.replace(regex, '%20');
        const location = {
            pathname: SEARCH_MOVIES,
            search:`?query=${query}`,
            state: {
                method: 'searchMovies',
                query,
            },
        };

        history.push(location);
    };

    return (
        <div className={ styles.OptionsContainer }>
            <nav className={ styles.NavOptions }>
                <NavLink pathname={ POPULAR_MOVIES } method={ 'popularMovies' }>
                    Popular Movies
                </NavLink>
                <NavLink pathname={ UPCOMING_MOVIES } method={ 'upcomingMovies' }>
                    Upcoming Movies
                </NavLink>
                <form onSubmit={ handleSubmit }>
                    <TextField
                        id="outlined-search"
                        label="Search movies"
                        type="search" margin="none"
                        className={ classes.searchInput }
                        onChange={ e => setQueryInput(e.target.value) } />
                </form>
            </nav>
        </div>
    );
}

export default withStyles(themeStyles)(NavBar);
