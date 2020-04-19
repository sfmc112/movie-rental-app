import React from 'react';
import styles from './UserLinks.module.css';
import { Link } from 'react-router-dom';
import { SIGN_IN, SIGN_UP, PROFILE } from '../../../../constants';
import classNames from 'classnames';
import firebase from '../../../../firebase';
import isEmpty from 'lodash/isEmpty';

const UserLinks = ({ currentUser }) => !isEmpty(currentUser) ? (
    <div className={ styles.SignInSignUp }>
        <span className={ styles.Welcome }>
            Welcome, <Link to={ PROFILE }>
                <span className={ classNames(styles.Link, styles.Name) }>
                    { currentUser.email.slice(0, currentUser.email.indexOf('@')) }
                </span>
            </Link>
        </span>
        <span className={ classNames(styles.Link, styles.SignOut) } onClick={ () => firebase.auth().signOut() }>
            Logout
        </span>
    </div>
) : (
    <div className={ styles.SignInSignUp }>
        <Link to={ SIGN_IN }>
            <span className={ classNames(styles.Link, styles.SignIn) }>
                Login
            </span>
        </Link>
        <span className={ styles.Separator }>|</span>
        <Link to={ SIGN_UP }>
            <span className={ classNames(styles.Link, styles.SignUp) }>
                Register
            </span>
        </Link>
    </div>
);

export default UserLinks;
