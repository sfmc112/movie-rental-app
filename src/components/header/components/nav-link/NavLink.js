import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavLink.module.css';

const NavLink = ({ pathname, method, children }) => (
    <Link
        className={ classNames(styles.NavLink, styles.Link) }
        to={{
            pathname,
            state: {
                method,
            },
        }}>
        { children }
    </Link>
);

export default NavLink;
