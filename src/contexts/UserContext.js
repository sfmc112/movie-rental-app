import React, { createContext, useEffect, useState } from 'react';
import firebase from '../firebase';

const UserContext = createContext({}); // eslint-disable-line

const UserStore = () => {
    const [ currentUser, setCurrentUser ] = useState({}); // eslint-disable-line

    useEffect(() => firebase.auth().onAuthStateChanged(setCurrentUser), []);

    return {
        currentUser,
    };
};

export const UserProvider = children => <UserContext.Provider value={ UserStore() } { ...children } />;

export default UserContext;
