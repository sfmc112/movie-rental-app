import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import styles from './Header.module.css';
import { UserContext } from '../../contexts';

import { LANDING } from '../../constants';
import { NavBar, UserLinks } from './components';

const Header = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <header className={ styles.AppHeader }>
            <Link to={ LANDING }>
                <img src={ logo } className={ styles.AppLogo } alt="logo" />
            </Link>
            <NavBar />
            <UserLinks currentUser={ currentUser } />
        </header>
    );
};

export default Header;
